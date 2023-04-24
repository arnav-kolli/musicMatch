//access the groups.html page
//get data from crud for forums
//upload to forums div
//create new divs for each forum
//[{},{},{},{},{}]

forums = document.getElementById("forums")

//posts = await *insert function to retrieve posts*
//json parse this to get an array
let posts = [{"_id": 1223, "artistName": "Anvesh Sunkara", "eventDate": new Date("2023-07-30"), "eventName": "Coachella", "Description": "Anvesh is performing", "DatePosted": new Date("2023-04-23"),},{}]

for (let i = 0; i < posts.length; i++){
    let post = document.createElement("div")
    post.id = posts[i]["_id"]
    post.innerHTML = ("<div>"+posts[i]["artistName"] +"</div>" + "<div>"+posts[i]["eventDate"]+"</div>"
                    +"<div>"+posts[i]["eventName"] +"</div>" + "<div>"+posts[i]["eventDate"]+"</div>"
                    +"<div>"+posts[i]["Description"] +"</div>" + "<div>"+posts[i]["DatePosted"]+"</div>")
}