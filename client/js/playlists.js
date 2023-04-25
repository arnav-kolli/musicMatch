import * as crud from "./playlistCRUD.js";

const newPlaylist = document.getElementById("createPlaylist");
const playlistname = document.getElementById("playlistname")
newPlaylist.addEventListener("click",()=>{
    newPlaylist(playlistname)
    playlistname.innerText = "";
});

async function newPlaylist(name){
    await crud.crudCreatePlaylist({"name":name})
}

async function populatePlaylists(){
    let playlists = document.getElementById(playlists);
    let names = await crud.crudReadPlaylists();
    playlists.innerHTML = "";

    names.foreach(name=>{
        let button = document.createElement('button');
        button.innerText = name;
        button.addEventListener('click',()=>{
            populateSongs(name);
        })
        playlists.appendChild(button);
    })
}

async function populateSongs(name){
    
}

populatePlaylists();