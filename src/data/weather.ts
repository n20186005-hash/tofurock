// 天氣資料模組：於建置時由伺服器端取得，並內嵌快取於靜態頁面。
// 一般訪客只需要「現在幾度、要不要帶傘、今天該怎麼安排」，不需要了解資料來源細節。

export type DailyForecast = {
  date: string;
  weekday: string;
  code: number;
  text: string;
  emoji: string;
  tempMax: number;
  tempMin: number;
  precipProbability: number;
  uvIndex: number;
};

export type WeatherSummary = {
  current: {
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    windSpeed: number;
    windLevel: number;
    uvIndex: number;
    code: number;
    text: string;
    emoji: string;
  };
  daily: DailyForecast[];
  alerts: string[];
};

export type Advice = {
  outfit: string[];
  activities: string[];
  items: string[];
  risks: string[];
  alerts: string[];
};

const WEEKDAYS = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

// WMO 天氣代碼 → 中文描述與圖示
const WMO: Record<number, { text: string; emoji: string }> = {
  0: { text: "晴朗", emoji: "☀️" },
  1: { text: "大致晴朗", emoji: "🌤️" },
  2: { text: "局部多雲", emoji: "⛅" },
  3: { text: "陰天", emoji: "☁️" },
  45: { text: "有霧", emoji: "🌫️" },
  48: { text: "霧淞", emoji: "🌫️" },
  51: { text: "輕微毛毛雨", emoji: "🌦️" },
  53: { text: "毛毛雨", emoji: "🌦️" },
  55: { text: "明顯毛毛雨", emoji: "🌦️" },
  56: { text: "凍毛毛雨", emoji: "🌧️" },
  57: { text: "凍毛毛雨", emoji: "🌧️" },
  61: { text: "小雨", emoji: "🌧️" },
  63: { text: "雨", emoji: "🌧️" },
  65: { text: "大雨", emoji: "🌧️" },
  66: { text: "凍雨", emoji: "🌧️" },
  67: { text: "凍雨", emoji: "🌧️" },
  71: { text: "小雪", emoji: "🌨️" },
  73: { text: "雪", emoji: "🌨️" },
  75: { text: "大雪", emoji: "❄️" },
  77: { text: "雪粒", emoji: "🌨️" },
  80: { text: "陣雨", emoji: "🌦️" },
  81: { text: "陣雨", emoji: "🌦️" },
  82: { text: "強陣雨", emoji: "⛈️" },
  85: { text: "陣雪", emoji: "🌨️" },
  86: { text: "強陣雪", emoji: "❄️" },
  95: { text: "雷陣雨", emoji: "⛈️" },
  96: { text: "雷陣雨伴冰雹", emoji: "⛈️" },
  99: { text: "強雷陣雨伴冰雹", emoji: "⛈️" },
};

export function describeWeather(code: number): { text: string; emoji: string } {
  return WMO[code] ?? { text: "天氣變化", emoji: "🌡️" };
}

export function weekdayOf(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return WEEKDAYS[dt.getDay()];
}

// 風速（m/s）→ 蒲福風級
export function beaufort(ms: number): number {
  const thresholds = [0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7];
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (ms >= thresholds[i]) level = i + 1;
  }
  return level;
}

async function fetchAlerts(latitude: number, longitude: number): Promise<string[]> {
  const url = `https://api.open-meteo.com/v1/alerts?latitude=${latitude}&longitude=${longitude}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const json = (await res.json()) as { features?: Array<{ properties?: { event?: string; headline?: string } }> };
    return (json.features ?? [])
      .map((f) => f.properties?.event || f.properties?.headline || "")
      .filter(Boolean)
      .slice(0, 5);
  } catch {
    return [];
  }
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherSummary | null> {
  const base = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max",
    timezone: "Asia/Taipei",
    forecast_days: "7",
    wind_speed_unit: "ms",
  });
  const url = `${base}?${params.toString()}`;

  try {
    const [res, alerts] = await Promise.all([
      fetch(url, { signal: AbortSignal.timeout(8000) }),
      fetchAlerts(latitude, longitude),
    ]);
    if (!res.ok) return null;
    const json = (await res.json()) as {
      current?: Record<string, number>;
      daily?: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_probability_max: (number | null)[];
        uv_index_max: (number | null)[];
      };
    };

    if (!json.current || !json.daily) return null;

    const cur = json.current;
    const curDesc = describeWeather(cur.weather_code);
    const windSpeed = cur.wind_speed_10m ?? 0;
    const daily = json.daily.time.map((date, i) => {
      const desc = describeWeather(json.daily!.weather_code[i]);
      return {
        date,
        weekday: weekdayOf(date),
        code: json.daily!.weather_code[i],
        text: desc.text,
        emoji: desc.emoji,
        tempMax: Math.round(json.daily!.temperature_2m_max[i]),
        tempMin: Math.round(json.daily!.temperature_2m_min[i]),
        precipProbability: json.daily!.precipitation_probability_max[i] ?? 0,
        uvIndex: Math.round(json.daily!.uv_index_max[i] ?? 0),
      };
    });

    return {
      current: {
        temperature: Math.round(cur.temperature_2m),
        apparentTemperature: Math.round(cur.apparent_temperature),
        humidity: Math.round(cur.relative_humidity_2m),
        windSpeed: Math.round(windSpeed * 10) / 10,
        windLevel: beaufort(windSpeed),
        uvIndex: Math.round(cur.uv_index ?? 0),
        code: cur.weather_code,
        text: curDesc.text,
        emoji: curDesc.emoji,
      },
      daily,
      alerts,
    };
  } catch {
    return null;
  }
}

// 依據天氣資料直接產出「訪客可執行建議」，條件不觸發就不會出現。
export function buildAdvice(w: WeatherSummary): Advice {
  const outfit: string[] = [];
  const activities: string[] = [];
  const items: string[] = [];
  const risks: string[] = [];

  const cur = w.current;
  const today = w.daily[0];
  const precip = today?.precipProbability ?? 0;
  const maxT = today?.tempMax ?? cur.temperature;
  const minT = today?.tempMin ?? cur.temperature;
  const uv = cur.uvIndex;
  const windLevel = cur.windLevel;
  const code = cur.code;

  // 🌂 降水相關
  if (precip >= 60) {
    outfit.push("降雨機率偏高，建議攜帶雨具並穿防滑鞋。");
    activities.push("優先安排室內場景，河岸與戶外活動可延後。");
    items.push("雨傘 / 雨衣");
  }
  if ([51, 53, 55, 56, 57, 61].includes(code)) {
    outfit.push("有小雨，路面濕滑，走路留意防滑。");
    activities.push("露天項目體驗較差，拍照請注意鏡頭防水。");
    items.push("摺疊傘");
  }
  if ([63, 65, 66, 67, 80, 81, 82].includes(code)) {
    risks.push("降雨較強，避開低窪與河道邊緣；親水、遊船類項目可能停運。");
    items.push("雨衣（風大時不建議長柄傘）");
  }
  if ([95, 96, 99].includes(code)) {
    risks.push("留意雷電，不要下到河道戲水、不要在大樹或空曠高處避雨；水上項目大概率關閉。");
  }

  // 🌞 高溫與紫外線
  if (maxT >= 32) {
    outfit.push("氣溫較高，建議輕薄透氣衣物。");
    activities.push("避開正午高溫時段，縮短連續戶外停留。");
    items.push("防曬用品、充足飲用水、防暑用品");
  }
  if (uv >= 5) {
    outfit.push("紫外線偏強，注意防曬與遮陽。");
    items.push("防曬霜、墨鏡、遮陽帽");
  }

  // ❄️ 低溫與溫差
  if (maxT - minT > 8) {
    outfit.push("晝夜溫差大，備一件外套方便增減。");
  }
  if (maxT <= 10) {
    outfit.push("氣溫偏低，注意防寒保暖。");
    items.push("厚外套、圍巾");
  }

  // 💨 風力
  if (windLevel >= 7) {
    risks.push("風力強勁，遠離廣告看板、堤岸邊緣與河道；露天水上項目大概率關閉。");
  } else if (windLevel >= 5) {
    outfit.push("風力偏大，帽子易被吹落，不建議穿寬鬆長裙。");
    activities.push("河岸遊船或親水項目可能受風影響停航。");
  }

  // ☁️ 晴天 / 陰天
  if ([0, 1].includes(code)) {
    outfit.push("天氣晴好，適合戶外遊覽。");
    activities.push("適合看日出、夕陽與河岸風景；別忘了防曬。");
  }
  if (code === 3) {
    outfit.push("光線柔和，很適合拍照。");
    activities.push("無曝曬，適合長時間戶外漫步。");
  }

  // 🌫️ 霧 / 霾
  if ([45, 48].includes(code)) {
    risks.push("能見度較差，不利遠觀山景與河景；如需開車請放慢車速。");
    items.push("口罩");
  }

  // 去重
  const dedupe = (arr: string[]) => Array.from(new Set(arr));
  return {
    outfit: dedupe(outfit),
    activities: dedupe(activities),
    items: dedupe(items),
    risks: dedupe(risks),
    alerts: w.alerts,
  };
}
