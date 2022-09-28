import { galleryItems } from "./gallery-items.js";

// Change code below this line
const gallery = document.querySelector(".gallery");
const imgMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", imgMarkup);
gallery.addEventListener("click", onImgZoomClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>
        `;
    })
    .join(" ");
}

function onImgZoomClick(event) {
  event.preventDefault();
  event.stopPropagation();

  const isImg = event.target.classList.contains("gallery__image");

  if (!isImg) {
    return;
  }

  zoomImg(event);
}

function zoomImg(event) {
  const imgZoomLink = event.target.dataset.source;
  const instance = basicLightbox.create(`
        <img src="${imgZoomLink}" width="800" height="600">
    `);

  instance.show();
  window.addEventListener("keypress", closeImgZoomClock);

  function closeImgZoomClock(event) {
    if (event.code == "Escape") {
      instance.close();
      window.removeEventListener("keypress", closeImgZoomClock);
    }
  }
}
