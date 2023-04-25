
import { createPost, getAllPosts } from './forumCrud.js';

const REDIRECT_URI = 'http://127.0.0.1:5501/client/Home.html';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const postData = {
    'artist-name': formData.get('artist-name'), //aspects that align with crud
    'event-date': formData.get('event-date'),
    'event-name': formData.get('event-name'),
    'post-content': formData.get('post-content'),
    'date-posted': formData.get('date-posted')
  };
  try {
    const response = await createPost(postData);
    console.log(response);
    // Display all the posts
    const postContainer = document.querySelector('#post-container');
    const posts = await getAllPosts();
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h2>${post['event-name']}</h2>
        <p>${post['post-content']}</p>
        <small>Posted for ${post['artist-name']} on ${post['date-posted']}</small>
      `;
      postContainer.appendChild(postElement);
    });
    // Redirect to the post page
    window.location.href = REDIRECT_URI;
  } catch (error) {
    console.error(error);
  }
});

