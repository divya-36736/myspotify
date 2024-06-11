console.log("Welcome to spotify");

//initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName:'warrio-salam-e-ishq', filePath:"songs/1.mp3", coverpath:"cover/1.jpg"},
    {songName:'rabta-salam-e-ishq', filePath:"songs/2.mp3", coverpath:"cover/2.jpg"},
    {songName:'na-jana-salam-e-ishq', filePath:"songs/3.mp3", coverpath:"cover/3.jpg"},
    {songName:'kabhi-khusi-salam-e-ishq', filePath:"songs/4.mp3", coverpath:"cover/4.jpg"},
    {songName:'salam-e-ishq', filePath:"songs/5.mp3", coverpath:"cover/5.jpg"},
    {songName:'nahsamaj vo-salam-e-ishq', filePath:"songs/6.mp3", coverpath:"cover/6.jpg"},
    {songName:'fornight-salam-e-ishq', filePath:"songs/7.mp3", coverpath:"cover/7.jpg"},
    {songName:'let me love-salam-e-ishq', filePath:"songs/8.mp3", coverpath:"cover/8.jpg"},
]

songitems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverpath
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName
})
//audioElement.play()

//Handle play/pause
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=0;
    }
})


//listen to event
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})