import { galleryItems } from "./gallery-items.js";

// Change code below this line
const galleryRef = document.querySelector(".gallery");
const imgMarkup = createGalleryMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", imgMarkup);
galleryRef.addEventListener("click", onImgZoomClick);

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
  const isImg = event.target.classList.contains("gallery__image");

  if (!isImg) {
    return;
  }

  zoomImg(event);
}

function zoomImg(event) {
  event.preventDefault();
  const imgZoomLink = event.target.dataset.source;
  const instance = basicLightbox.create(`
        <img src="${imgZoomLink}" width="1280">
    `);

  instance.show();
  window.addEventListener("keydown", closeImgZoomClick);

  function closeImgZoomClick(event) {
    if (event.code == "Escape") {
      instance.close();
      window.removeEventListener("keydown", closeImgZoomClick);
    }
  }
}
