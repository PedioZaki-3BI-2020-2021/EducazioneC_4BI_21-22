/*THE ID OF THE VARIABLES AND THE STRUCT OF THE HTML SHOULD BE THE SAME
  Author: Fazio Davide 4BI
*/

alert("For a better experience use firefox");

//Variable
const EXT = ".mp4";
const DELIM = "_";
const argsButtons = Array.from(document.querySelector(".args-container").children);
const topicsButtons = Array.from(document.querySelector(".topics-container").children);
const player = document.querySelector("#player");
const playButton = document.querySelector("#playButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const volumeButton = document.querySelector("#volumeButton");
const volumeRange = document.querySelector("#volumeRange");
const progressBar = document.querySelector("#progressBar");
const currentTime = document.querySelector("#currentTime");
const durationTime = document.querySelector("#durationTime");

//Adding eventListener to buttons
argsButtons.forEach(e => e.addEventListener("click", () => setTopicOfArgs(e.getAttribute('id'))));
topicsButtons.forEach(e => e.addEventListener("click", () => load(e.getAttribute('id'))));
player.addEventListener("timeupdate", () => updateTime());
playButton.addEventListener("click", () => playOrPause());
fullscreenButton.addEventListener("click", () => openFullscreen());
volumeButton.addEventListener("click", () => muteOrUnmute());
volumeRange.addEventListener("change", () => setVolume());
progressBar.addEventListener("click", () => changeVolume());

hideComponents(topicsButtons, player, playButton, fullscreenButton, volumeButton, volumeRange, progressBar, currentTime, durationTime);

//Adding a KeyListener to the window
window.onkeyup = function(e){
    if(e.code == "Escape"){
        closeFullscreen();
    }else if(e.code == "Space"){
        playOrPause();
    }
}

//Function
function hideComponents(){
    let args = [];

    for(let i = 0; i < arguments.length; i++){
        if(Array.isArray(arguments[i])){
            if(args.length == 0){
                args = Array.from(arguments[i]);
            }else{
                args.slice(0, 0, Array.from(arguments[i]));
            }
        }else{
            args.push(arguments[i]);
        }
    }

    args.forEach(e => e.style.display = "none");
}

function showComponents(){
    let args = [];

    for(let i = 0; i < arguments.length; i++){
        if(Array.isArray(arguments[i])){
            if(args.length == 0){
                args = Array.from(arguments[i]);
            }else{
                args.slice(0, 0, Array.from(arguments[i]));
            }
        }else{
            args.push(arguments[i]);
        }
    }

    args.forEach(e => e.style.display = "inline-block");
}

function setTopicOfArgs(arg){
    function setId(e){
        if(e.getAttribute('id').includes(".")){
            let temp = e.getAttribute('id').split(DELIM);

            e.setAttribute('id', arg + DELIM + temp[temp.length - 1]);
        }else{
            e.setAttribute('id', arg + DELIM + e.getAttribute('id') + EXT);
        }
    }

    topicsButtons.forEach(e => setId(e));

    showComponents(topicsButtons);
}

function load(id){
    player.setAttribute('src', id);
    player.load();

    progressBar.max = player.duration;
    currentTime.innerHTML = "0.00";

    showComponents(player, playButton, fullscreenButton, volumeButton, volumeRange, progressBar, currentTime, durationTime);
}

function updateTime(){
    let time = player.currentTime;
    currentTime.innerHTML = (time/60).toFixed(2);

    progressBar.value = player.currentTime;
}

function playOrPause(){
    if(player.paused || player.currentTime == 0){
        player.play();

        let time = player.duration;
        durationTime.innerHTML = (time/60).toFixed(2);

        progressBar.setAttribute('max', player.duration);

        const img = document.querySelector("#playImage").setAttribute('src', "pause.svg");
        playButton.setAttribute('title', "pause");
    }else{
        player.pause();

        const img = document.querySelector("#playImage").setAttribute('src', "play.svg");     
        playButton.setAttribute('title', "play");   
    }
}

function openFullscreen(){
    if (player.requestFullscreen){
        player.requestFullscreen();
        alert("Escape for exit from fullscreen");
    }else if (player.webkitRequestFullscreen){
        player.webkitRequestFullscreen();
        alert("Escape for exit from fullscreen");
    }else if (player.msRequestFullscreen){
        player.msRequestFullscreen();
        alert("Escape for exit from fullscreen");
    }
}

function closeFullscreen(){
    if (document.exitFullscreen){
        document.exitFullscreen();
    }else if (document.webkitExitFullscreen){ 
        document.webkitExitFullscreen();
    }else if (document.msExitFullscreen){
        document.msExitFullscreen();
    }
}

function muteOrUnmute(){
    if(player.muted){
        player.muted = false;

        const volumeImage = document.querySelector("#volumeImage").setAttribute('src', "unmute.ico");
        volumeButton.setAttribute('title', "mute");
    }else{
        player.muted = true;

        const volumeImage = document.querySelector("#volumeImage").setAttribute('src', "mute.ico");
        volumeButton.setAttribute('title', "unmute");
    }
}

function setVolume(){
    player.volume = volumeRange.value;

    if(player.volume == 0){
        const volumeImage = document.querySelector("#volumeImage").setAttribute('src', "mute.ico");
        volumeButton.setAttribute('title', "unmute");
    }else{
        const volumeImage = document.querySelector("#volumeImage").setAttribute('src', "unmute.ico");
        volumeButton.setAttribute('title', "mute");
    }
}

function changeVolume(){
    player.pause();
    player.currentTime = progressBar.value;
    player.play();
}