const smallImage = document.querySelectorAll(".photos img");
const fullImage = document.getElementById("image");
const slides = document.querySelector(".slides");

let currentImage = 0;

function openOverlay(image) {   
    slides.style.display = "block";

    fullImage.src = image.src.replace("-sq.jpg", ".jpg");
    currentImage = Number(image.id);
}

function hideOverlay() {
    slides.style.display = "none";
    fullImage.src = "";
}

function nextImage() {
    currentImage = (currentImage + 1) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
}

function previousImage() {
    currentImage = (currentImage - 1 + smallImage.length) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
}
