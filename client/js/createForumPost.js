
import { createPost } from './forumCrud.js';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const postData = {
    'artist-name': formData.get('artist-name'),
    'event-date': formData.get('event-date'),
    'event-name': formData.get('event-name'),
    'post-content': formData.get('post-content'),
    'date-posted': formData.get('date-posted')
  };
  try {
    const response = await createPost(postData);
    console.log(response);
    // Do something else after the post is created, e.g. redirect to the post page
  } catch (error) {
    console.error(error);
  }
});