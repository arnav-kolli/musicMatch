import Pouchdb from 'pouchdb';

const db = new Pouchdb("playlist");


//data:{name}
async function createPlaylist(data){
    try{
        await db.get(data.name);
        console.log("name exists")
        //added functionality letting user know that the name already exists
    }
    catch{
        await db.put({_id:data.name,songs:[]});
    }
}

async function readPlaylist(name){
    try{
        let data = await db.get(name);
        return songs.songs;
    }
    catch(err){
        console.log(err);
    }
}

//songID will be used in the API call and name,artist album etc will be available at the call
//add songs to playlist
async function updatePlaylist(name,songID){
    try{
        const curData = await db.get(name);
        curData.songs.push(song);
        db.put(curData);
    }
    catch(err){
        console.log(err);
    }
}

//deletes a song from the playlist
//(may have to change functionality to have index of song instead of ID)
async function deleteSong(playlist,songID){
    try{
        const data = await db.get(playlist);
        let ind = data.songs.indexOf(songID);
        data.songs.splice(ind,1);
    }
    catch(err){
        console.log(err);
    }
}

async function deletePlaylist(playlist){
    try{
        db.remove(playlist)
    }
    catch(err){
        console.log(err)
    }
}

export async function crudCreatePlaylist(data) {
    try{
    await fetch(`/createPlaylist`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    }
    catch(err){
        console.log(err);
    }
  }
  
  export async function crudReadPlaylists() {
    try {
      const response = await fetch(`/readPlaylists`, {
        method: 'GET',
      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function crudReadSongs(data) {
    try {
      const response = await fetch(`/readSongs`, {
        method: 'GET',
        body: JSON.stringify(data)

      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }

  //Adding songs to playlist
  //data:{playlistname,songname}
  export async function crudUpdatePlaylist(data) {
    try{
      const response = await fetch(`/addSong`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.log(err);
    }
  }

  //Delete Playlist
  export async function crudDeletePlaylist(data) {
    try{
      const response = await fetch(`/deletePlaylist`, {
        method: 'DELETE',
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  //remove songs from playlist
  export async function crudDeleteSong(data) {
    try{
      const response = await fetch(`/deleteSong`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.log(err);
    }
  }