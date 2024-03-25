const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("image-container");
const loading = document.getElementById("loading");
const smallImage = document.querySelectorAll(".photos img");
const fullImage = document.getElementById("image");

let currentImage = 0;

function openOverlay(image) {   
    overlay.style.display = "block";
    imageContainer.style.display = "block";

    fullImage.src = image.src.replace("-sq.jpg", ".jpg");
    currentImage = Number(image.id);
}

function hideOverlay() {
    overlay.style.display = "none";
    imageContainer.classList.remove("show");
    fullImage.src = "";
}

function nextImage(event) {
    event.stopPropagation();
    currentImage = (currentImage + 1) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
}

function previousImage(event) {
    event.stopPropagation();
    currentImage = (currentImage - 1 + smallImage.length) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
}
