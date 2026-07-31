type CardSize = "square" | "postcard" | "story";
type CardStyle = "river" | "sunset" | "night";

const sizes: Record<CardSize, { width: number; height: number; label: string }> = {
  square: { width: 1200, height: 1200, label: "1:1" },
  postcard: { width: 1200, height: 1600, label: "明信片" },
  story: { width: 1080, height: 1920, label: "9:16" },
};

let uploadedImage: HTMLImageElement | undefined;
let fallbackImage: HTMLImageElement | undefined;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  const drawHeight = imageRatio > canvasRatio ? height : width / imageRatio;
  const drawWidth = imageRatio > canvasRatio ? height * imageRatio : width;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function gradientForStyle(ctx: CanvasRenderingContext2D, width: number, height: number, style: CardStyle) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (style === "sunset") {
    gradient.addColorStop(0, "rgba(248, 212, 153, 0.12)");
    gradient.addColorStop(0.58, "rgba(105, 67, 45, 0.08)");
    gradient.addColorStop(1, "rgba(35, 29, 24, 0.68)");
  } else if (style === "night") {
    gradient.addColorStop(0, "rgba(21, 45, 67, 0.24)");
    gradient.addColorStop(0.6, "rgba(20, 37, 54, 0.18)");
    gradient.addColorStop(1, "rgba(5, 13, 24, 0.78)");
  } else {
    gradient.addColorStop(0, "rgba(43, 110, 115, 0.18)");
    gradient.addColorStop(0.62, "rgba(255, 250, 240, 0.06)");
    gradient.addColorStop(1, "rgba(18, 61, 67, 0.72)");
  }
  return gradient;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const chars = [...text];
  const lines: string[] = [];
  let current = "";
  for (const char of chars) {
    const candidate = current + char;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

async function renderCard() {
  const canvas = document.querySelector<HTMLCanvasElement>("#memorialCanvas");
  const sizeSelect = document.querySelector<HTMLSelectElement>("#cardSize");
  const styleSelect = document.querySelector<HTMLSelectElement>("#cardStyle");
  const titleInput = document.querySelector<HTMLInputElement>("#cardTitle");
  const dateInput = document.querySelector<HTMLInputElement>("#cardDate");
  if (!canvas || !sizeSelect || !styleSelect || !titleInput || !dateInput) return;

  const size = sizes[(sizeSelect.value as CardSize) || "square"] ?? sizes.square;
  const style = (styleSelect.value as CardStyle) || "river";
  canvas.width = size.width;
  canvas.height = size.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const background = uploadedImage ?? fallbackImage ?? (await loadImage("/images/card-preview.webp"));
  fallbackImage = fallbackImage ?? background;
  drawCover(ctx, background, size.width, size.height);

  ctx.fillStyle = gradientForStyle(ctx, size.width, size.height, style);
  ctx.fillRect(0, 0, size.width, size.height);

  const pad = Math.round(size.width * 0.075);
  const title = titleInput.value.trim() || "頭前溪豆腐岩";
  const dateText = dateInput.value.trim() || new Date().toLocaleDateString("zh-TW");

  ctx.fillStyle = "rgba(255, 250, 240, 0.93)";
  ctx.textBaseline = "alphabetic";
  ctx.font = `900 ${Math.round(size.width * 0.03)}px sans-serif`;
  ctx.fillText("新竹・竹北", pad, pad + Math.round(size.width * 0.035));

  ctx.font = `900 ${Math.round(size.width * 0.092)}px sans-serif`;
  const lines = wrapText(ctx, title, size.width - pad * 2);
  const lineHeight = Math.round(size.width * 0.105);
  let y = size.height - pad - Math.round(size.width * 0.18) - (lines.length - 1) * lineHeight;
  for (const line of lines) {
    ctx.fillText(line, pad, y);
    y += lineHeight;
  }

  ctx.font = `700 ${Math.round(size.width * 0.033)}px sans-serif`;
  ctx.fillStyle = "rgba(255, 250, 240, 0.82)";
  ctx.fillText(dateText, pad, size.height - pad - Math.round(size.width * 0.06));

  ctx.textAlign = "right";
  ctx.font = `800 ${Math.round(size.width * 0.028)}px sans-serif`;
  ctx.fillText(size.label, size.width - pad, size.height - pad - Math.round(size.width * 0.06));
  ctx.textAlign = "left";

  ctx.strokeStyle = "rgba(255, 250, 240, 0.48)";
  ctx.lineWidth = Math.max(5, Math.round(size.width * 0.006));
  ctx.strokeRect(pad * 0.55, pad * 0.55, size.width - pad * 1.1, size.height - pad * 1.1);
}

function bootCard() {
  const fileInput = document.querySelector<HTMLInputElement>("#cardPhoto");
  const renderButton = document.querySelector<HTMLButtonElement>("#renderCard");
  const downloadButton = document.querySelector<HTMLButtonElement>("#downloadCard");
  const sizeSelect = document.querySelector<HTMLSelectElement>("#cardSize");
  const styleSelect = document.querySelector<HTMLSelectElement>("#cardStyle");
  const titleInput = document.querySelector<HTMLInputElement>("#cardTitle");
  const dateInput = document.querySelector<HTMLInputElement>("#cardDate");
  const canvas = document.querySelector<HTMLCanvasElement>("#memorialCanvas");
  if (!fileInput || !renderButton || !downloadButton || !sizeSelect || !styleSelect || !titleInput || !dateInput || !canvas) return;

  dateInput.value = new Date().toLocaleDateString("zh-TW");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    try {
      uploadedImage = await loadImage(objectUrl);
      await renderCard();
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  });

  [sizeSelect, styleSelect, titleInput, dateInput].forEach((control) => control.addEventListener("input", () => void renderCard()));
  renderButton.addEventListener("click", () => void renderCard());
  downloadButton.addEventListener("click", () => {
    void renderCard().then(() => {
      const link = document.createElement("a");
      link.download = "tofu-rock-memorial-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  void renderCard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootCard, { once: true });
} else {
  bootCard();
}
