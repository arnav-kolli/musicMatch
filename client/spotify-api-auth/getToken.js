var accessToken = "";
const toEx = "TESTING"
window.onload = function() {
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (code) {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: '005d6e07f1404e53a388cdd5933ba469',
          client_secret: 'a7c5b6f6dfdd44d0b5583d84df4efb98',
          redirect_uri: 'http://localhost:3001/client/home.html',
          grant_type: 'authorization_code',
          code,
          scope: 'user-top-read'
        })
      })
      .then(response => response.json())
      .then(data => {
        // console.log('Authorization code:', code);
        accessToken = data.access_token
        console.log(accessToken);
        console.log('Access token:', data.access_token);        
      });
    }
  };


  //TEST CODE TO SEE IF THE ACCESS TOKEN CAN BE USED TO FETCH ENDPOINTS
let buttonElem = document.getElementById('ex')
buttonElem.addEventListener('click', async () => {
    console.log("in event listener");
    console.log(accessToken);
    await fetch('https://api.spotify.com/v1/me/top/tracks', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
    });
})

export {accessToken};