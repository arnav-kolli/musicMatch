import * as crud from "./crud.js";

const REDIRECT_URI = 'http://localhost:3001/client/groups.html';

const form = document.getElementById("form");

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log("yoooooo")
  const formData = new FormData(event.target);
  const postData = {
    'artist_name': formData.get('artist-name'),
    'event_date': formData.get('event-date'),
    'event_name': formData.get('event-name'),
    'description': formData.get('post-content'),
    'date_posted': formData.get('date-posted')
  };
  try {
    await crud.crudCreatePost(postData)
    // Redirect to the post page
    window.location.href = REDIRECT_URI;
  } catch (error) {
    console.error(error);
  }
});

