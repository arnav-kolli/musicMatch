import PouchDB from 'pouchdb';
import pg from 'pg';
import express, { request, response } from 'express';
import logger from 'morgan';
import 'dotenv/config'

const db = new PouchDB('forum');
const plist = new PouchDB('Playlist');
const { Pool } = pg

console.log(process.env.DATABASE_URL)
const connectionString = process.env.DATABASE_URL;
const poolConfig = {
  connectionString: connectionString,
}
const pool = new Pool(poolConfig)


// Function to create a new forum post
export async function createPost(data) {
    try {
        await db.post(data);
        const queryText = 'INSERT INTO forums(artist_name, event_date, event_name, description, date_posted) VALUES($1, $2, $3, $4, $5);';
        await pool.query(queryText,[data.artistName, data.eventDate, data.eventName, data.Description, data.DatePosted])
      } catch (error) {
        console.error(error);
      }
}
  
// Function to retrieve all forum posts
export async function getAllPosts() {
  const queryText = 'SELECT * FROM forums'
  let data = (await pool.query(queryText))
  console.log("rows", data.rows)
  //db.allDocs({ include_docs: true }).then(response => response.rows.map(row => row.doc));
  return data.rows
}
  
// Function to retrieve a specific forum post by ID
export async function getPostById(id) {
  const queryText = 'SELECT * FROM forums WHERE forum_id = $1'
  let data = (await pool.query(queryText, [id]))
  return data.rows;
  //return db.get(id);
}
  
// Function to update an existing forum post
export async function updatePost(id, data) {
    return db.get(id)
      .then(doc => {
        return db.put(Object.assign(doc, data));
      });
}
  
// Function to delete a forum post
export async function deletePost(id) {
    return db.get(id)
      .then(doc => {
        return db.remove(doc);
      });
}

export async function createPlaylist(data){
  try{
      await plist.get(data.name);
      // console.log("name exists");
      //added functionality letting user know that the name already exists
  }
  catch{
      await plist.put({_id:data.name,songs:[]});
  }
}

export async function readAllPlaylists(){
  try{
    const docs = await plist.allDocs();
    return docs.rows.map(row => row.id);
  }
  catch(err){
    console.log(err);
  }
}
export async function readPlaylist(name){
  try{
      let data = await plist.get(name);
      return data.songs;
  }
  catch(err){
      console.log(err);
  }
}

//songID will be used in the API call and name,artist album etc will be available at the call
//add songs to playlist
export async function updatePlaylist(name,songID){
  try{
      const curData = await plist.get(name);
      curData.songs.push(songID);
      // console.log(curData.songs)
      plist.put({_id:name,_rev:curData._rev,songs:curData.songs});
  }
  catch(err){
      console.log(err);
  }
}

//deletes a song from the playlist
//(may have to change functionality to have index of song instead of ID)
export async function deleteSong(playlist,songID){
  try{
      const data = await plist.get(playlist);
      let ind = data.songs.indexOf(songID);
      data.songs.splice(ind,1);
  }
  catch(err){
      console.log(err);
  }
}

export async function deletePlaylist(playlist){
  console.log(playlist);
  try{
      await plist.remove(playlist)
  }
  catch(err){
      console.log(err)
  }
}

const app = express();
const port = 3001;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));


app.post('/create', async (request, response) => {
  try {
    const options = request.body;
    await createPost(options);
    response.status(200).json({message: "Post created successfully."});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});

app.get('/login', async (request, response) => {
  try {
    const CLIENT_ID = '005d6e07f1404e53a388cdd5933ba469';
    const REDIRECT_URI = 'http://localhost:3001/callback';
    const AUTH_URL = 'https://accounts.spotify.com/authorize';
    const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'user-top-read'];

    const STATE = Math.random().toString(36).substring(2, 15);

    const authParams = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(' '),
      state: STATE
    });

    const authUrl = `${AUTH_URL}?${authParams.toString()}`;
    response.redirect(authUrl)
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
})

app.get('/callback', (response, request) => {
  const { code } = req.query;
  console.log(code);
})

app.get('/readAll', async (request, response) => {
  try {
    let res = await getAllPosts();
    response.status(200).json({message: "Post returned successfully.", data: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});


app.put('/update', async (request, response) => {
  const options = request.body;
  updatePost(options.id, options);
});

app.delete('/delete', async (request, response) => {
  const options = request.body
  deleteCounter(options.id)
})

app.post("/createPlaylist",async(request,response)=>{
  try{
    const options = request.body;
    await createPlaylist(options);
  }
  catch(err){
    console.log(err);
  }
})

app.get('/readPlaylists',async (request,response)=>{
  try {
    let res = await readAllPlaylists();
    response.status(200).json({message: "list returned successfully.", playlists: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error reading"});
  }
})

app.get('/readSongs',async (request,response)=>{
  try{
    const options = request.query;
    let res = await readPlaylist(options.name);
    response.json({name:options.name,songs:res});
  }
  catch(error){
    response.status(400).json({error:"Errpr reading"});
  }
})

app.put('/addSong',async (request,response)=>{
  try{
    const options = request.query;
    updatePlaylist(options.name,options.songID);
    // response.json("Successful addition")
  }
  catch(err){
    console.log(err);
  }
})

app.put('/deleteSong',async(request,response)=>{
  try{
    const options = request.query;
    deleteSong(options.name,options.songID);
  }
  catch(err){
    console.log(err);
  }
});

app.delete('/deletePlaylist',async(request,response)=>{
  try{
    const options = request.query;
    deletePlaylist(options.name);
  }
  catch(err){
    console.log(err);
  }
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


