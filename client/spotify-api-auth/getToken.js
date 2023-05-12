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
        // Save your access token in a secure way!
      });
    }
    // console.log("here");
    // console.log(accessToken);
    
    // // Use the access token in your API requests
    // fetch('https://api.spotify.com/v1/me/top/tracks', {
    //     method: 'GET',
    //     headers: { 'Authorization' : 'Bearer ' + 'BQB1qwc4F0_b93wUk9Tc0Xzl9dFxFSpo1SPIICdvi3U-Zwrfc82qkIXZBgDhnK2rfsmr7rmuF1OYSevEhXtoabganP9PMe0SHhDUacpi875Jd1AtIjHvREHDG0Kz_WGR0RM1wrg0fIJqUc9i-jwcbmGUN9_0RHX0pQu_SHoEvJAfQwukzq_aawNx5DFULZQbHX7LV20MXdzGYNnVLiKxVAU'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data); // Do something with the retrieved data
    // });
    // window.accessToken = accessToken;
  };


  //TEST CODE TO SEE IF THE ACCESS TOKEN CAN BE USED TO FETCH ENDPOINTS
let buttonElem = document.getElementById('ex')
buttonElem.addEventListener('click', async () => {
    // Use the access token in your API requests
    console.log("in event listener");
    console.log(accessToken);
    await fetch('https://api.spotify.com/v1/me/top/tracks', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Do something with the retrieved data
    });
})

export {toEx}

