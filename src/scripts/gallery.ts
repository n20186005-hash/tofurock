function bootGallery() {
  const dialog = document.querySelector<HTMLDialogElement>("#galleryDialog");
  const image = document.querySelector<HTMLImageElement>("#galleryDialogImage");
  const caption = document.querySelector<HTMLElement>("#galleryDialogCaption");
  const credit = document.querySelector<HTMLElement>("#galleryDialogCredit");
  const close = document.querySelector<HTMLButtonElement>("#galleryDialogClose");
  const previous = document.querySelector<HTMLButtonElement>("[data-lightbox-prev]");
  const next = document.querySelector<HTMLButtonElement>("[data-lightbox-next]");
  const counter = document.querySelector<HTMLElement>("[data-lightbox-counter]");
  const stage = document.querySelector<HTMLElement>("[data-lightbox-stage]");
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-lightbox]"));
  if (!dialog || !image || !caption || !credit || !close || buttons.length === 0) return;

  let currentIndex = 0;
  let openingButton: HTMLButtonElement | null = null;
  let pointerStart: { x: number; y: number } | null = null;

  const renderImage = (requestedIndex: number) => {
    currentIndex = (requestedIndex + buttons.length) % buttons.length;
    const button = buttons[currentIndex];
    if (!button) return;

    const src = button.dataset.image;
    if (!src) return;

    image.src = src;
    image.alt = button.dataset.alt ?? button.dataset.caption ?? "豆腐岩照片";
    caption.textContent = button.dataset.caption ?? "豆腐岩照片";
    credit.textContent = button.dataset.credit ?? "";
    if (counter) counter.textContent = `${currentIndex + 1} / ${buttons.length}`;

    const nextSrc = buttons[(currentIndex + 1) % buttons.length]?.dataset.image;
    if (nextSrc) {
      const preload = new Image();
      preload.src = nextSrc;
    }
  };

  const showPrevious = () => renderImage(currentIndex - 1);
  const showNext = () => renderImage(currentIndex + 1);
  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      openingButton = button;
      renderImage(index);
      document.documentElement.classList.add("lightbox-open");
      dialog.showModal();
      close.focus();
    });
  });

  close.addEventListener("click", closeDialog);
  previous?.addEventListener("click", showPrevious);
  next?.addEventListener("click", showNext);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    openingButton?.focus();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  });

  stage?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || (event.target as HTMLElement).closest("button")) return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  stage?.addEventListener("pointerup", (event) => {
    if (!pointerStart || event.pointerType === "mouse") return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  });

  stage?.addEventListener("pointercancel", () => {
    pointerStart = null;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootGallery, { once: true });
} else {
  bootGallery();
}
