import * as crud from "./crud.js";
//import * as forumCrud from "./forumCrud"

//access the groups.html page
//get data from crud for forums
//upload to forums div
//create new divs for each forum
//[{},{},{},{},{}]

let forums = document.getElementById("forums");

console.log("in groups befroe the crud now whaaaattttt");

await crud.crudCreatePost({
  artistName: "Anvesh Sunkara",
  eventDate: "2023-07-30",
  eventName: "Coachella",
  Description: "Anvesh is performing",
  DatePosted: "2023-04-23",
});
await crud.crudCreatePost({"artistName": "Aayush Patel", "eventDate": "2023-11-05", "eventName": "Ultra Miami", "Description": "Aayush is performing", "DatePosted": "2023-04-24"});
await crud.crudCreatePost({"artistName": "Arnav Kolli", "eventDate": new Date("2023-04-12"), "eventName": "Rolling Loud NYC", "Description": "Arnav is performing", "DatePosted": new Date("2023-04-25")});
await crud.crudCreatePost({"artistName": "Rahul Vedula", "eventDate": new Date("2023-08-02"), "eventName": "GovBall", "Description": "Rahul is performing", "DatePosted": new Date("2023-04-26")});
console.log("in groups befroe the readALl now whaaaattttt");

async function main() {
  let posts = await crud.crudReadAllPosts();
  console.log("posts", posts);

  //posts = await *insert function to retrieve posts*
  //json parse this to get an array
  // let posts = [{}]
  let coolData = posts.data;
  for (let i = 0; i < coolData.length; i++) {
    console.log("coolkid lamoooooooooo") //test
    if (coolData[i].hasOwnProperty("artist_name")) {
      let post = document.createElement("div");
      post.id = coolData[i]["id"];
      post.innerHTML =
        "<div>" +
        coolData[i]["artist_name"] +
        "</div>" +
        "<div>" +
        coolData[i]["event_name"] +
        "</div>" +
        "<div>" +
        coolData[i]["event_date"] +
        "</div>" +
        "<div>" +
        coolData[i]["description"] +
        "</div>" +
        "<div>" +
        coolData[i]["date_posted"] +
        "</div>";
      forums.appendChild(post);
    } else {
      console.log(coolData[i]);
    }
  }
}

main();
