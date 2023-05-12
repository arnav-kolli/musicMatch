import express, { request, response } from 'express';
import logger from 'morgan';
import 'dotenv/config'
import { database } from './database.js';

const app = express();
const port = 3001;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));


app.post('/create', async (request, response) => {
  try {
    const options = request.body;
    await database.createPost(options);
    response.status(200).json({message: "Post created successfully."});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});

app.get('/readAll', async (request, response) => {
  try {
    let res = await database.getAllPosts();
    response.status(200).json({message: "Post returned successfully.", data: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});


app.put('/update', async (request, response) => {
  const options = request.body;
  database.updatePost(options.id, options);
});

app.delete('/delete', async (request, response) => {
  const options = request.body
  database.deleteCounter(options.id)
})

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


app.post("/createPlaylist",async(request,response)=>{
  try{
    const options = request.body;
    await database.createPlaylist(options);
  }
  catch(err){
    console.log(err);
  }
})

app.get('/readPlaylists',async (request,response)=>{
  try {
    let res = await database.readAllPlaylists();
    response.status(200).json({message: "list returned successfully.", playlists: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error reading"});
  }
})

app.get('/readSongs',async (request,response)=>{
  try{
    const options = request.query;
    let res = await database.readPlaylist(options.name);
    response.json({name:options.name,songs:res});
  }
  catch(error){
    response.status(400).json({error:"Errpr reading"});
  }
})

app.put('/addSong',async (request,response)=>{
  try{
    const options = request.query;
    database.updatePlaylist(options.name,options.songID);
    // response.json("Successful addition")
  }
  catch(err){
    console.log(err);
  }
})

app.put('/deleteSong',async(request,response)=>{
  try{
    const options = request.query;
    database.deleteSong(options.name,options.songID);
  }
  catch(err){
    console.log(err);
  }
});

app.delete('/deletePlaylist',async(request,response)=>{
  try{
    const options = request.query;
    database.deletePlaylist(options.name);
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

