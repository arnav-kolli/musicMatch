import Pouchdb from 'pouchdb';

const db = new Pouchdb("playlist");


//data:{name}
async function createPlaylist(data){
    try{
        await db.get(data.name)
        //display that the name exists
    }
    catch{
        await db.put({})
    }
}

//async function readPlaylist(name){}

//async function updatePlaylist{}

//async function deleteSong(playlist,songname){}

//async function deletePlaylist
