import * as crud from "./playlistCRUD.js";

const create = document.getElementById("createPlaylist");
const playlistname = document.getElementById("playlistname");
const playlist = document.getElementById("playlist")
const accessToken = localStorage.getItem("accessToken");
const exportAll = document.getElementById("exportAll");
const exportTo = document.getElementById("exportTo");

let user = "";
let userPlaylists = [];
let userPlaylistcnt = 0;
await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            user = data.id; 
        });

// create.addEventListener("click",()=>{
//     newPlaylist(playlistname)
//     playlistname.innerText = "";
// });

async function newPlaylist(name){
    await crud.crudCreatePlaylist({"user":user,playlist:name})
}

async function getPlaylists(){
    await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            userPlaylists = data.items; 
        });
    
    // let label = document.createElement("label");
    // label.setAttribute("for","dropdown");
    // label.textContent = "Export to:"

    // let select = document.createElement("select");
    // select.setAttribute("id","dropdown");
    // for (let i =0; i<userPlaylists.length;i++){
    //     let option = document.createElement("option");
    //     option.setAttribute("value",userPlaylists[i].id)
    //     option.text = userPlaylists[i].name;
    //     select.appendChild(option);
    // }

    // let button = document.createElement("button");
    // button.textContent = "go";

    // exportTo.appendChild(label);
    // exportTo.appendChild(select);
    // exportTo.appendChild(button);
}

async function populateSongs(playlist_name){
    let res = await crud.crudReadSongs({user,playlist:playlist_name});
    console.log(res)
    playlist.innerHTML = "";
    // let html = `<h1>${playlist_name}</h1>`;
    // res.songs.forEach(song=>{
    //     // let label = document.createElement("label");
    //     // let checkbox = document.createElement("input");
    //     // checkbox.type="checkbox";
    //     // checkbox.value=song;
    //     // checkbox.id = song;
    //     // label.innerText = song;
    //     // label.appendChild(checkbox);
    //     // label.appendChild(document.createElement("br"));
    //     // playlist.appendChild(label);


    // })
    let songs = res.songs.map(song=>songidToSong(song.song_id))
    console.log(songs);
    playlist.innerHTML = ""
    let html = `
    <h1> Liked Songs </h1>
  <table class = playlist-table>
    <thead>
      <tr>
        <th></th>
        <th>Song</th>
        <th>Artist</th>
        <th>Album</th>
        <th></th>
      </tr>
    </thead>
    <tbody>`
    
    for(let song of res.songs){
        let songData = await songidToSong(song.song_id);
        console.log("check",songData)
        html += `
        <tr>
        <td><img src="${songData.art.url}"/></td>
        <td>${songData.name}</td>
        <td>${songData.artist.toString()}</td>
        <td>${songData.album}</td>
        <td><input type="checkbox" value="${song.song_id}" id="${song.song_id}"></td>
      </tr>
      `
    };
    html += "</tbody></table>";
    playlist.innerHTML = html;
}

async function main(){
    let playlists = await crud.crudReadPlaylists({user});
    playlists = playlists.playlists
    if(playlists.length == 0){
        await crud.crudCreatePlaylist({user,playlist:"Discover"});
    }
    await populateSongs("Discover");
    await getPlaylists();
    console.log(userPlaylists);
}

async function songidToSong(song_id){
    let songDetails = {name:"",artist:"",album:"",art:""}
    await fetch(`https://api.spotify.com/v1/tracks/${song_id}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        songDetails.name = data.name
        let artists = []
        for(let i = 0; i <data.artists.length;i++){
            artists.push(data.artists[i].name)
        }
        songDetails.artist=artists
        songDetails.album =  data.album.name
        songDetails.art = data.album.images[2]
        console.log(songDetails.art.url)
    });
    // console.log(songDetails)
    return songDetails
}

// exportAll.addEventListener("click",()=>{

// }
// newPlaylist("shut up my mom is calling");
// // crud.crudUpdatePlaylist({name:"shut up my mom is calling",song:"kyle"})
// // crud.crudDeletePlaylist({name:"shut up my mom is calling"});
// populatePlaylists();
// await crud.crudUpdatePlaylist({user,song:"0vjeOZ3Ft5jvAi9SBFJm1j",playlist:"Discover"})
main()
