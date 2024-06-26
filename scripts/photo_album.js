const smallImage = document.querySelectorAll(".photos img");
const fullImage = document.getElementById("image");
const slides = document.querySelector(".slides");
const imageContainer = document.getElementById("image-container");
const overlay = document.getElementById("overlay");

let currentImage = 0;

function openOverlay(image) {
    fullImage.src = image.src.replace("-sq.jpg", ".jpg");

    slides.style.display = "block";
    setTimeout(() => {
        imageContainer.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 50);

    currentImage = Number(image.id);
}

function hideOverlay() {
    fullImage.src = "";

    slides.style.display = "none";
    setTimeout(() => {
        imageContainer.style.opacity = 0;
        overlay.style.opacity = 0;
    }, 50);
}

function nextImage() {
    currentImage = (currentImage + 1) % smallImage.length;
    image = smallImage[currentImage];
    imageContainer.style.opacity = 0;
        setTimeout(() => {
            openOverlay(image);
        }, 300);
}

function previousImage() {
    currentImage = (currentImage - 1 + smallImage.length) % smallImage.length;
    image = smallImage[currentImage];
    imageContainer.style.opacity = 0;
        setTimeout(() => {
            openOverlay(image);
        }, 300);
}

function preloadImages() {
    smallImage.forEach(img => {
        const image = new Image();
        image.src = img.src.replace("-sq.jpg", ".jpg");
    });
}

window.addEventListener('load', preloadImages);
