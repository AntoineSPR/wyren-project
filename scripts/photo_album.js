const overlay = document.getElementById("overlay");
const conteneurImage = document.getElementById("conteneurImage");
const image = document.getElementById("image");
const chargement = document.getElementById("chargement");

function ouvrirOverlay(url) {   
    overlay.style.display = "block";
    conteneurImage.style.display = "block";
    chargement.style.display = "block";

    image.onload = () => {
        chargement.style.display = "none";
        console.log("chargement en cours")
    }
    image.src = url;
}

function fermerOverlay() {
    overlay.style.display = "none";
    conteneurImage.style.display = "none";
    image.src = "";
    chargement.style.display = "none";
}