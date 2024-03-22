const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("image-container");
const image = document.getElementById("image");
const loading = document.getElementById("loading");

//Fonction d'affichage de l'overlay et de la photo en grande taille//
function openOverlay(url) {   
    overlay.style.display = "block";
    imageContainer.style.display = "block";
    loading.style.display = "block";

    image.src = url;

    //Disparition du message de chargement dès que l'image est chargée//
    image.onload = () => {
        loading.style.display = "none";
    }
    //Pour les appareils plus lents, vérification toutes les 0.1 secondes si l'image s'est chargée à plus de 45%//
    let checkInterval = setInterval(
        () => {
            if (image.height >= image.height * 0.45){
                loading.style.display = "none";
                clearInterval(checkInterval);
            } 
        }
    , 100);
}

function hideOverlay() {
    overlay.style.display = "none";
    imageContainer.style.display = "none";
    image.src = "";
    loading.style.display = "none";
}