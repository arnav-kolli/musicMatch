import Pouchdb from 'pouchdb';

const db = new Pouchdb("playlist");


//data:{name}
async function createPlaylist(data){
    try{
        const response = await db.get(data.name);
        return response;
        //display that the name exists
    }
    catch{
        await db.put({name:data.name});
    }
}

//async function readPlaylist(name){}


//async function updatePlaylist{}

//async function deleteSong(playlist,songname){}

//async function deletePlaylist
