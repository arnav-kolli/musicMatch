

import * as crud from "./crud.js"
//import * as forumCrud from "./forumCrud"



//access the groups.html page
//get data from crud for forums
//upload to forums div
//create new divs for each forum
//[{},{},{},{},{}]

let forums = document.getElementById("forums")

console.log("in groups befroe the crud now whaaaattttt")

await crud.crudCreatePost(({"artistName": "Anvesh Sunkara", "eventDate": new Date("2023-07-30"), "eventName": "Coachella", "Description": "Anvesh is performing", "DatePosted": new Date("2023-04-23")}));
// crud.crudCreatePost({"artistName": "Aayush Patel", "eventDate": new Date("2023-11-05"), "eventName": "Ultra Miami", "Description": "Aayush is performing", "DatePosted": new Date("2023-04-24")});
// crud.crudCreatePost({"artistName": "Arnav Kolli", "eventDate": new Date("2023-04-12"), "eventName": "Rolling Loud NYC", "Description": "Arnav is performing", "DatePosted": new Date("2023-04-25")});
// crud.crudCreatePost({"artistName": "Rahul Vedula", "eventDate": new Date("2023-08-02"), "eventName": "GovBall", "Description": "Rahul is performing", "DatePosted": new Date("2023-04-26")});
console.log("in groups befroe the readALl now whaaaattttt")

let posts;

async function main() {
    posts = await crud.crudReadAllPosts();
    console.log("posts", posts);
}
  
main();
//posts = await *insert function to retrieve posts*
//json parse this to get an array
// let posts = [{}]

for (let i = 0; i < posts.length; i++){
    let post = document.createElement("div")
    post.id = posts[i]["id"]
    post.innerHTML = ("<div>"+posts[i]["artistName"] +"</div>" + "<div>"+posts[i]["eventDate"]+"</div>"
                    +"<div>"+posts[i]["eventName"] +"</div>" + "<div>"+posts[i]["eventDate"]+"</div>"
                    +"<div>"+posts[i]["Description"] +"</div>" + "<div>"+posts[i]["DatePosted"]+"</div>")
    forums.appendChild(post)
                };
