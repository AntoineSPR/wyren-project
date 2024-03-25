const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("image-container");
const loading = document.getElementById("loading");
const smallImage = document.querySelectorAll(".photos img");
const fullImage = document.getElementById("image");

let currentImage = 0;

//Fonction d'affichage de l'overlay et de la photo en grande taille//
function openOverlay(image) {   
    overlay.style.display = "block";
    imageContainer.style.display = "block";
    loading.style.display = "block";

    fullImage.src = image.src.replace("-sq.jpg", ".jpg");
    currentImage = Number(image.id);

    //Disparition du message de chargement dès que l'image est chargée//
    fullImage.onload = () => {
        loading.style.display = "none";
    }
    //Pour les appareils plus lents, vérification toutes les 0.1 secondes si l'image s'est chargée à plus de 45%//
    let checkInterval = setInterval(
        () => {
            if (fullImage.height >= fullImage.height * 0.45){
                loading.style.display = "none";
                clearInterval(checkInterval);
            } 
        }
    , 100);
}

function hideOverlay() {
    overlay.style.display = "none";
    imageContainer.style.display = "none";
    fullImage.src = "";
    loading.style.display = "none";
}

function nextImage() {
    currentImage = (currentImage + 1) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
    loading.style.display = "none";
}

function previousImage() {
    currentImage = (currentImage - 1 + smallImage.length) % smallImage.length;
    image = smallImage[currentImage];
    openOverlay(image);
    loading.style.display = "none";
}
