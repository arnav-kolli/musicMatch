


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
      const response = await fetch(`/readSongs?name=${data.name}`, {
        method: 'GET',
        // body: JSON.stringify(data) 
//fixes json body error
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
      const response = await fetch(`/addSong?name=${data.name}&songID=${data.song}`, {
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
      const response = await fetch(`/deletePlaylist?name=${data.name}`, {
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