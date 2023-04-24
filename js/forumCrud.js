import PouchDB from 'pouchdb';
import express from 'express';
import logger from 'morgan';

const db = new PouchDB('forum');

// Function to create a new forum post
export async function createPost(response, data) {
    try {
        const response = await db.post(data);
        response.json({"message": "create done"});
      } catch (error) {
        console.error(error);
        response.status(400).json({error: "error in create"})
      }
}
  
// Function to retrieve all forum posts
export async function getAllPosts() {
    return db.allDocs({ include_docs: true })
      .then(response => response.rows.map(row => row.doc));
}
  
// Function to retrieve a specific forum post by ID
export async function getPostById(id) {
    return db.get(id);
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

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.post('/create', async (request, response) => {
  const options = request.body;
  createPost(options);
});

app.get('/readAll', async (request, response) => {
  response = getAllPosts();
});

app.put('/update', async (request, response) => {
  const options = request.body;
  updatePost(options);
});

app.delete('/delete', async (request, response) => {
  const options = request.query
  deleteCounter(options.id)
})

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on poart ${port}`);
});
