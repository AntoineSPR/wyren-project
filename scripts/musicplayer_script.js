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
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement('audio');

let track_list = [
    {
        name: "Night Walker",
        artist: "Wyren Project",
        image: "https://i1.sndcdn.com/artworks-EYx7FonkHe8O6Htm-RxSFfQ-t500x500.jpg",
        path: "https://cf-media.sndcdn.com/NawsIsRi1W4e.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTmF3c0lzUmkxVzRlLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzExMDQ2MzMxfX19XX0_&Signature=b0ApTN~oO1aSLGnFWaCJC8C3uvy9RbFSbHgGQ~2KxbQxTz2aJYvM1CdRIBrg3ZId7ZW98x-mgm9JYa-b9yVezhsF4amcjFjUp1zAMEps1uwT2Eh67Mx9Y~bUoRF9-PcPEi0GwgCczwDvR2kRxXyndwjnzUJ1DRxWjmOsV9RtPFl9NG5kYt7J9JCj2yOHX3RC7U8-U6qJdWl8M3fKEcD2M5Q~ljEj-V5mVZ7SxEwegsYi83E2j5BbOAFAkbSR-zNkYHCNGtpLFS99atXvEonJwnWvf9XTZIvJUg4hi1CR4GpxIwTdbBlu94kovBkcJiDykCjJC~eFdUgGA4r8ejAvZA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
        url: "https://on.soundcloud.com/fZacJPyywsRGuJxdA"
    },
    {
        name: "Letting Go",
        artist: "Wyren Project",
        image: "https://i1.sndcdn.com/artworks-KjpKfRmKe7GOSHyy-JKA32Q-t500x500.jpg",
        path: "https://cf-media.sndcdn.com/qH9nPWnqbm27.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vcUg5blBXbnFibTI3LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzExMDQ1MTk4fX19XX0_&Signature=FX63ZlhpwjnfWvga9UbwvKOSmwPYwNQI9TOczmQU8OZC~GEGpUmG6pUKzVBHvuEnhVHJgA8AHlLGJzC0FdjO1ioOs75oaerqXrcjmjnFPte4Dk4GR08fqEg4trUip1KfYhbTuxVXSdvHXn0P6fB11b1EgFFa0x4UzfC69ohmSYvBCTmsLH~ZgP-kyvTpK0no91zYdkMPctOUt94gl2503APHqfoNIFVyck0ZaW67Bn7yBTheAeEzJJd45Xq6Pn657Vec-300UupdEQX9w4bBfjthKQhZV33omgolx6empN3l2oRVnhY~p7oTImsKqMh-9waBLFQXfhHga1DV8P6adQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
        url : "https://on.soundcloud.com/iGip7EBcw44Q8QfGA"
    },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = track_list[track_index].path;
    currentTrack.load();
    console.log(currentTrack.src);
    console.log(currentTrack);

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
    currentTrack.volume = volumeSlider.value / 100;
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


