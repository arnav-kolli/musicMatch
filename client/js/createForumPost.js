
import { createPost } from './forumCrud.js';

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
    window.location.href = REDIRECT_URI;// Do something else after the post is created, e.g. redirect to the post page
  } catch (error) {
    console.error(error);
  }
});

