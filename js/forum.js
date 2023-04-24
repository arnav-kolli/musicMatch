import PouchDB from 'pouchdb';

const db = new PouchDB('forum');

// Function to create a new forum post
export async function createPost(data) {
    try {
        const response = await db.post(data);
        return response;
      } catch (error) {
        console.error(error);
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