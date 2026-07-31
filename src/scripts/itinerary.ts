import { itineraryPlaces, type SaveablePlace } from "@/data/site";

const STORAGE_KEY = "tofu-rock-itinerary-v1";
const places = new Map(itineraryPlaces.map((place) => [place.id, place]));

function readSaved(): SaveablePlace[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SaveablePlace[];
    return Array.isArray(parsed) ? parsed.filter((item) => item?.id && item?.name) : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SaveablePlace[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be disabled; silently keep UI usable.
  }
}

function savePlace(id: string) {
  const place = places.get(id);
  if (!place) return;
  const saved = readSaved();
  if (!saved.some((item) => item.id === id)) {
    writeSaved([...saved, place]);
  }
  renderSavedList();
  updateButtons();
}

function removePlace(id: string) {
  writeSaved(readSaved().filter((item) => item.id !== id));
  renderSavedList();
  updateButtons();
}

function clearSaved() {
  writeSaved([]);
  renderSavedList();
  updateButtons();
}

function updateButtons() {
  const savedIds = new Set(readSaved().map((item) => item.id));
  document.querySelectorAll<HTMLButtonElement>("[data-save-place]").forEach((button) => {
    const id = button.dataset.savePlace ?? "";
    const saved = savedIds.has(id);
    button.textContent = saved ? "已加入清單" : "加入行程清單";
    button.setAttribute("aria-pressed", saved ? "true" : "false");
  });
}

function renderSavedList() {
  const list = document.querySelector<HTMLDivElement>("#itineraryList");
  const clearButton = document.querySelector<HTMLButtonElement>("#clearItinerary");
  if (!list) return;

  const saved = readSaved();
  list.innerHTML = "";
  if (saved.length === 0) {
    list.innerHTML = `<p class="rounded-2xl bg-white/70 p-5 text-sm leading-7 text-ink-900/65">目前還沒有收藏。從左側項目或各頁面的「加入行程清單」開始。</p>`;
    clearButton?.classList.add("hidden");
    return;
  }

  for (const item of saved) {
    const card = document.createElement("article");
    card.className = "rounded-2xl bg-white/80 p-4 ring-1 ring-river-900/10";
    card.innerHTML = `
      <p class="text-xs font-black tracking-[0.14em] text-clay-500"></p>
      <h3 class="mt-2 text-lg font-black text-river-900"></h3>
      <p class="mt-2 text-sm leading-6 text-ink-900/67"></p>
      <button type="button" class="mt-4 rounded-full bg-river-100 px-4 py-2 text-sm font-black text-river-900">移除</button>
    `;
    card.querySelector("p")!.textContent = item.category;
    card.querySelector("h3")!.textContent = item.name;
    card.querySelectorAll("p")[1]!.textContent = item.description;
    card.querySelector("button")!.addEventListener("click", () => removePlace(item.id));
    list.append(card);
  }
  clearButton?.classList.remove("hidden");
}

function boot() {
  document.querySelectorAll<HTMLButtonElement>("[data-save-place]").forEach((button) => {
    button.addEventListener("click", () => savePlace(button.dataset.savePlace ?? ""));
  });
  document.querySelector<HTMLButtonElement>("#clearItinerary")?.addEventListener("click", clearSaved);
  renderSavedList();
  updateButtons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
