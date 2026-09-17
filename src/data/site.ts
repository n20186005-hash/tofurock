export type NavItem = {
  href: string;
  label: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
};

export type SaveablePlace = {
  id: string;
  name: string;
  category: string;
  description: string;
  href?: string;
};

export const gaMeasurementId = "G-HXM22WWPKP";

export const siteDomain = "tofurock.com";

export const attraction = {
  name: "頭前溪豆腐岩",
  alternateName: "Tofu Rock",
  shortName: "豆腐岩",
  regionLabel: "新竹・竹北",
  tagline: "河床上的方格紋理，像一鍋正在流動的豆腐湯。",
  description:
    "頭前溪豆腐岩位於新竹縣竹北市頭前溪河道旁，方整的消波與護床構造在水流中排成規律格線，形成新竹很有辨識度的河岸景觀與攝影點。",
  address: "302 新竹縣竹北市頭前溪",
  localArea: "新竹縣竹北市，興隆大橋與經國大橋一帶",
  latitude: 24.7998907,
  longitude: 121.0296557,
  ratingValue: "4.0",
  reviewCount: 4203,
  ratingSyncDate: "2026 年 9 月",
  googleMapsUrl: "https://maps.app.goo.gl/NM2FutiUt5QBLphA7",
  openingHoursText: "每日 24 小時戶外開放；雨後、漲水與夜間請勿靠近河道。",
  feeText: "戶外河岸景觀，通常無售票口；如遇河川工程、封閉或活動管制，以現場公告為準。",
  suggestedStay: "約 20–40 分鐘；若拍攝夕陽、水流與夜景，可預留 1 小時左右。",
  heroImage: "/images/hero-tofu-rock.webp",
  ogImage: "/images/og-image.webp",
  cardImage: "/images/card-preview.webp",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.8704071543457!2d121.02965569999999!3d24.7998907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468365275ff8d69%3A0xb9fc9a3f139d61c3!2sTofu%20Rock!5e0!3m2!1szh-TW!2stw!4v1785476527360!5m2!1szh-TW!2stw",
};

export const navItems: NavItem[] = [
  { href: "/", label: "首頁" },
  { href: "/about/", label: "景點故事" },
  { href: "/transportation/", label: "交通停車" },
  { href: "/guide/", label: "訪客指南" },
  { href: "/food/", label: "周邊美食" },
  { href: "/nearby/", label: "周邊景點" },
  { href: "/gallery/", label: "照片牆" },
  { href: "/itinerary/", label: "行程清單" },
  { href: "/memorial-card/", label: "紀念卡" },
  { href: "/faq/", label: "常見問答" },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-river-sunset.webp",
    alt: "頭前溪豆腐岩在河水與夕光中的方格景觀",
    caption: "黃昏前後，水流把方格護床切成明暗交錯的線條。",
    credit: "Wikimedia Commons / Rick888chen / CC BY-SA 4.0",
  },
  {
    src: "/images/gallery-blocks-wide.webp",
    alt: "豆腐岩方塊狀護床構造與河道水面",
    caption: "俯看時最像一塊塊豆腐排在頭前溪裡。",
    credit: "Wikimedia Commons / Rick888chen / CC BY-SA 4.0",
  },
  {
    src: "/images/gallery-zhubei-skyline.webp",
    alt: "從豆腐岩望向竹北天際線與橋樑",
    caption: "河岸開闊，遠方可見竹北城市天際線。",
    credit: "Wikimedia Commons / Mark JH / CC0",
  },
  {
    src: "/images/gallery-night-bridge.webp",
    alt: "夜色中的頭前溪橋樑與水面倒影",
    caption: "入夜後橋燈很上鏡，但請停留在安全步道與堤岸。",
    credit: "Wikimedia Commons / Mark JH / CC0",
  },
  {
    src: "/images/tofu-blocks-close.webp",
    alt: "近看豆腐岩規律的水泥方格紋理",
    caption: "近距離可看見護床結構的幾何感。",
    credit: "Wikimedia Commons / Rick888chen / CC BY-SA 4.0",
  },
  {
    src: "/images/card-preview.webp",
    alt: "豆腐岩與新竹河岸城市景觀的直式照片",
    caption: "適合做成明信片或社群限動尺寸的紀念卡。",
    credit: "Wikimedia Commons / Rick888chen, Mark JH",
  },
];

export const quickFacts = [
  { label: "地點", value: "新竹縣竹北市頭前溪河岸" },
  { label: "費用", value: "通常免費，無售票口" },
  { label: "建議停留", value: attraction.suggestedStay },
  { label: "適合", value: "攝影、散步、河岸小旅行、順遊竹北" },
];

export const transportOptions = [
  {
    title: "高鐵 / 台鐵",
    body:
      "可先抵達高鐵新竹站或台鐵六家站，再轉乘計程車、共享機車或自行車前往河岸入口。若從市區出發，也可視當日交通搭配公車與步行。",
  },
  {
    title: "自行開車",
    body:
      "可由新竹市區、竹北交流道或 68 快速道路周邊道路銜接至頭前溪堤岸。接近河岸時路幅較小，請放慢速度並避開阻擋通行的位置。",
  },
  {
    title: "自行車 / 步行",
    body:
      "頭前溪河濱空間適合安排輕量散步與自行車順遊。請留意橋下、堤岸與水邊落差，不建議為了取景跨越護欄或進入水流區。",
  },
];

export const parkingInfo = [
  "河岸周邊有零散停車空間與小型停車點，假日黃昏熱門時段可能較滿。",
  "請優先停在合法停車格或不影響通行的位置，不要停在堤防轉角、橋下出入口與工程車動線。",
  "若帶長輩或孩子同行，建議先讓乘客在安全處下車，再由駕駛尋找車位。",
];

// 頭前溪停車場為 GSC 中曝光最高（127 次）卻零點擊的查詢，必須給出具體答案。
export const parkingSpots = [
  {
    name: "頭前溪河濱公園停車場",
    fee: "免費",
    gps: "24.7999, 121.0297",
    access: "落車後步行約 3–5 分鐘即抵豆腐岩觀景位置，是最靠近的停車選擇。",
    note: "假日黃昏熱門時段較易客滿，可改停周邊替代車位或錯峰前往。",
  },
  {
    name: "興隆大橋 / 經國大橋周邊路邊停車",
    fee: "部分免費、部分收費路段",
    gps: "",
    access: "沿堤岸動線停靠，步行距離依落點而異，約 5–10 分鐘到觀景處。",
    note: "請停在合法格位，避開橋下出入口、工程車動線與轉角，以免影響通行或被拖吊。",
  },
];

export const foodAreas = [
  {
    id: "liujia-food",
    name: "六家 / 高鐵新竹站周邊",
    category: "近距離用餐",
    description:
      "適合把豆腐岩安排在飯前或飯後，喜來登周邊商圈有咖啡、簡餐、火鍋與親子友善餐廳，移動路線最順。",
  },
  {
    id: "zhubei-guangming",
    name: "竹北光明一路餐飲帶",
    category: "晚餐選擇多",
    description:
      "如果傍晚來拍夕陽，拍完可轉往竹北市區吃正餐；餐廳密度高，適合朋友聚餐。",
  },
  {
    id: "hsinchu-snacks",
    name: "新竹市區小吃",
    category: "經典新竹味",
    description:
      "想把河岸景觀與在地小吃排成半日行程，可再進新竹市區安排米粉、貢丸湯與城隍廟周邊散步。",
  },
  {
    id: "river-picnic",
    name: "河岸輕食野餐",
    category: "輕量停留",
    description:
      "適合買飲料、麵包或甜點在安全平台短暫休息。請把垃圾帶走，避免食物與包裝落入河道。",
  },
];

export const nearbyPlaces: SaveablePlace[] = [
  {
    id: "xinwawu",
    name: "新瓦屋客家文化保存區",
    category: "文化散步",
    description: "保留客家聚落空間與藝文活動氛圍，適合與豆腐岩排成竹北半日散步。",
    href: "/nearby/#xinwawu",
  },
  {
    id: "touqian-riverside",
    name: "頭前溪河濱自行車道",
    category: "河岸活動",
    description: "順著河岸延伸，可把看景、慢跑與單車安排在同一段動線。",
    href: "/nearby/#touqian-riverside",
  },
  {
    id: "liujia-station",
    name: "六家車站 / 高鐵新竹站周邊",
    category: "交通節點",
    description: "交通、餐飲與住宿選擇集中，適合作為外地旅客抵達後的集合點。",
    href: "/nearby/#liujia-station",
  },
  {
    id: "hsinchu-city",
    name: "新竹市區老味道",
    category: "城市順遊",
    description: "可把竹北河岸與新竹市區小吃、老街巷弄排成輕鬆的一日行程。",
    href: "/nearby/#hsinchu-city",
  },
  {
    id: "shuizhen-park",
    name: "水圳森林公園",
    category: "河岸綠地",
    description: "竹北的開放綠帶與水岸步道，適合散步、遛小孩與騎單車，可和豆腐岩排成同一段河岸動線。",
    href: "/nearby/#shuizhen-park",
  },
  {
    id: "sheraton-area",
    name: "新竹喜來登周邊商圈",
    category: "商圈美食",
    description: "高鐵新竹站旁的喜來登周邊有飯店、商場與餐飲選擇，適合把豆腐岩與竹北一日遊的晚餐排在這裡。",
    href: "/nearby/#sheraton-area",
  },
];

export const itineraryPlaces: SaveablePlace[] = [
  {
    id: "tofu-rock-main",
    name: attraction.name,
    category: "主景點",
    description: "看水流、方格護床與竹北天際線，是這趟小旅行的視覺核心。",
    href: "/",
  },
  ...nearbyPlaces,
  ...foodAreas,
];

export const faqItems = [
  {
    question: "豆腐岩是真的天然岩石嗎？",
    answer:
      "不是典型天然奇岩。它主要是頭前溪河床裡規律排列的護床與消波構造，因外觀像一塊塊豆腐而得名。",
  },
  {
    question: "豆腐岩要門票嗎？",
    answer:
      "通常不需要門票，也沒有固定售票口。它是戶外河岸景觀，實際是否可進入仍要以現場公告、河川施工與安全管制為準。",
  },
  {
    question: "什麼時間最適合拍照？",
    answer:
      "晴天午後到夕陽前最容易拍到水面反光與橋樑線條；陰天則適合拍柔和的灰藍色河景。雨後水位變化大，不建議靠近水邊。",
  },
  {
    question: "可以走到豆腐岩上面嗎？",
    answer:
      "不建議。水泥塊與河床可能濕滑，水流與落差也有風險。請停留在安全步道、堤岸與合法觀景位置。",
  },
  {
    question: "適合帶小朋友或寵物嗎？",
    answer:
      "可以作為短暫河岸散步，但需要全程看顧。靠近水域、橋下與堤防邊緣時請牽好孩子與寵物，避免追逐或越線取景。",
  },
  {
    question: "行程清單和紀念卡會把照片上傳嗎？",
    answer:
      "不會。行程清單只存在您目前瀏覽器的 localStorage，紀念卡也在瀏覽器 Canvas 本地合成；照片與成品不經伺服器。",
  },
  {
    question: "頭前溪豆腐岩有停車場嗎？收費如何？",
    answer:
      "豆腐岩旁設有頭前溪河濱公園免費停車場，落車後步行約 3–5 分鐘即可抵達觀景位置。假日黃昏熱門時段較易客滿，可改停周邊合法車位或錯峰前往。",
  },
  {
    question: "豆腐岩怎麼去？",
    answer:
      "最方便是先到高鐵新竹站或台鐵六家站，再轉計程車、共享機車或自行車銜接頭前溪堤岸；自行開車可導航「Tofu Rock」或「頭前溪豆腐岩」，停在河濱公園停車場後步行抵達。",
  },
];

export function pageTitle(title?: string) {
  return title ? `${title}｜${attraction.name}` : `${attraction.name}｜${attraction.regionLabel}河岸景觀指南`;
}

export function absoluteUrl(site: URL | undefined, path: string) {
  return site ? new URL(path, site).toString() : undefined;
}

export function createAttractionStructuredData(site: URL | undefined) {
  const siteUrl = absoluteUrl(site, "/");
  const imageUrl = absoluteUrl(site, attraction.ogImage);
  const attractionUrl = siteUrl ?? `https://${siteDomain}/`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${attractionUrl}#attraction`,
    name: attraction.name,
    alternateName: [
      attraction.alternateName,
      attraction.shortName,
      "竹北市 頭前溪豆腐岩",
    ],
    description: attraction.description,
    url: attractionUrl,
    isAccessibleForFree: true,
    image: imageUrl ? [imageUrl] : [],
    address: {
      "@type": "PostalAddress",
      streetAddress: "頭前溪",
      addressLocality: "竹北市",
      addressRegion: "新竹縣",
      postalCode: "302",
      addressCountry: "TW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: attraction.latitude,
      longitude: attraction.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasMap: attraction.googleMapsUrl,
    sameAs: [attraction.googleMapsUrl],
  };
}

export function createFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbStructuredData(
  site: URL | undefined,
  pathname: string,
  label: string
) {
  const siteUrl = site ? site.toString().replace(/\/$/, "") : `https://${siteDomain}`;
  const home = `${siteUrl}/`;
  const current = `${siteUrl}${pathname}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: home },
      { "@type": "ListItem", position: 2, name: label, item: current },
    ],
  };
}
