let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let externalLink = document.querySelector(".external-link");

let playpauseButton = document.querySelector(".playpause-track");
let nextButton = document.querySelector(".next-track");
let prevButton = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let mute = document.querySelector(".mute");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let isMute = false;
let updateTimer;

let currentTrack = document.createElement('audio');

let track_list = [
    {
        name: "Night Walker",
        artist: "Wyren Project",
        image: "https://i1.sndcdn.com/artworks-EYx7FonkHe8O6Htm-RxSFfQ-t500x500.jpg",
        path: "media/Night-Walker-v5.mp3",
        url: "https://soundcloud.com/wyrenmusic/nightwalker?in=wyrenmusic/sets/wyren-project-demos&si=22dad5cbf0cb4dc7855a1ec3b29e3d8e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
    },
    {
        name: "Letting Go",
        artist: "Wyren Project",
        image: "https://i1.sndcdn.com/artworks-KjpKfRmKe7GOSHyy-JKA32Q-t500x500.jpg",
        path: "media/Letting-Go-v7.mp3",
        url : "https://soundcloud.com/wyrenmusic/letting-go?in=wyrenmusic/sets/wyren-project-demos&si=191d2c70df9b445491938047dd70497f&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
    },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = track_list[track_index].path;
    currentTrack.load();

    trackArt.src = track_list[track_index].image;
    trackName.textContent = track_list[track_index].name;
    trackArtist.textContent = track_list[track_index].artist;
    nowPlaying.textContent = (track_index + 1) + " / " + track_list.length;
    externalLink.href = track_list[track_index].url;

    updateTimer = setInterval(seekUpdate, 1000);

    currentTrack.addEventListener("ended", nextTrack);
}

function resetValues() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) {
        playTrack();
    }
    else {
        pauseTrack();
    }
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;

    playpauseButton.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;

    playpauseButton.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    }
    else {
        track_index = 0;
    }

    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    }
    else {
        track_index = track_list.length - 1;
    }

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = currentTrack.duration * (seekSlider.value / 100);

    currentTrack.currentTime = seekto;
}

function setVolume() {
    if (currentTrack.muted == true) {
    currentTrack.muted = false;
    mute.classList.toggle('fa-volume-down');
    mute.classList.toggle('fa-volume-off'); 
    }
    currentTrack.volume = volumeSlider.value / 100;
}

function muteVolume() {
    if (currentTrack.muted == true) {
        currentTrack.muted = false;
    } else if (currentTrack.muted == false) {
    currentTrack.muted = true;
    }
    mute.classList.toggle('fa-volume-down');
    mute.classList.toggle('fa-volume-off'); 
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);