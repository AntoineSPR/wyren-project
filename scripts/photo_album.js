const overlay = document.getElementById("overlay");
const conteneurImage = document.getElementById("conteneurImage");
const image = document.getElementById("image");

function ouvrirOverlay(url) {
    image.src = url;
    overlay.style.display = "block";
    conteneurImage.style.display = "block";
}

function fermerOverlay() {
    overlay.style.display = "none";
    conteneurImage.style.display = "none";
    image.src = "";
}
