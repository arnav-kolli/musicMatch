import PouchDB from 'pouchdb';

const db = new PouchDB('forum');

// Function to create a new forum post
function createPost(data) {
    return db.post(data);
  }
  
  // Function to retrieve all forum posts
  function getAllPosts() {
    return db.allDocs({ include_docs: true })
      .then(response => response.rows.map(row => row.doc));
  }
  
  // Function to retrieve a specific forum post by ID
  function getPostById(id) {
    return db.get(id);
  }
  
  // Function to update an existing forum post
  function updatePost(id, data) {
    return db.get(id)
      .then(doc => {
        return db.put(Object.assign(doc, data));
      });
  }
  
  // Function to delete a forum post
  function deletePost(id) {
    return db.get(id)
      .then(doc => {
        return db.remove(doc);
      });
  }