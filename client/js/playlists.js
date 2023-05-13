import * as crud from "./playlistCRUD.js";
import { getAccessToken } from "../spotify-api-auth/getToken.js";


const create = document.getElementById("createPlaylist");
const playlistname = document.getElementById("playlistname");
const playlist = document.getElementById("playlist")
create.addEventListener("click",()=>{
    newPlaylist(playlistname)
    playlistname.innerText = "";
});

async function newPlaylist(name){
    await crud.crudCreatePlaylist({"name":name})
}

async function populatePlaylists(){
    let playlists = document.getElementById("playlists");
    let names = await crud.crudReadPlaylists();
    names = names.playlists
    playlists.innerHTML = "";
    console.log(names)
    names.forEach(name=>{
        let button = document.createElement('button');
        button.innerText = name;
        button.addEventListener('click',()=>{
            populateSongs(name);
        })
        playlists.appendChild(button);
    })
}

async function populateSongs(name){
    let res = await crud.crudReadSongs({"name":name});
    playlist.innerHTML = "";
    console.log(res)
    res.songs.forEach(song=>{
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.value=song;
        checkbox.id = song;
        label.innerText = song;
        label.appendChild(checkbox);
        playlist.appendChild(label);
    })
}

console.log(getAccessToken());





// newPlaylist("shut up my mom is calling");
// crud.crudUpdatePlaylist({name:"shut up my mom is calling",song:"kyle"})
// crud.crudDeletePlaylist({name:"shut up my mom is calling"});
// populatePlaylists();