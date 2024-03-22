const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("image-container");
const image = document.getElementById("image");
const loading = document.getElementById("loading");

function openOverlay(url) {   
    overlay.style.display = "block";
    imageContainer.style.display = "block";
    loading.style.display = "block";

    image.src = url;

    image.onload = () => {
        loading.style.display = "none";
    }
}

function hideOverlay() {
    overlay.style.display = "none";
    imageContainer.style.display = "none";
    image.src = "";
    loading.style.display = "none";
}