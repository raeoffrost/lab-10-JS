// post content variables
let postID = document.getElementById("display-id");
let postTitle = document.getElementById("display-title");
let postBody = document.getElementById("display-body");
let alertMSG = document.getElementById("alert");
const form = document.getElementById("form");
// display post content
const displayPost = post => { 
    // JSON.parse(post);
    postID.innerHTML = "Post ID: " + post.id;
    postTitle.innerHTML = post.title;
    postBody.innerHTML = post.body;
};
// Task 1
// Event listener for fetch
document.getElementById("fetch").addEventListener("click", function() {
  // fetch post function with error handling
  fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => {
          if (!response.ok) {
              throw new Error("Request failed. Data not fetched.");
          }
          return response.json();
      })
      .then(data => {
          displayPost(data);
      })
      .catch(error => { 
        postBody.innerHTML = "Error fetching data:" + error;
        console.log("Error fetching data:", error);
      })
});

// Task 2
// Event listener for xhr
document.getElementById("xhr").addEventListener("click", function() { 
// XML post function with error handling
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4){
        if(xhr.status == 200) {
          const post = JSON.parse(xhr.responseText);
          displayPost(post);
        } else if (xhr.status == 404){
          postBody.innerHTML = "Error finding data:" + xhr.statusText;
          console.log("Error finding data:", xhr.statusText);
        } else if (xhr.status == 500){
          postBody.innerHTML = "Server Error:" + xhr.statusText;
          console.log("Server Error:", xhr.statusText);
        } else {
          postBody.innerHTML = "Error:" + xhr.statusText;
          console.log("Error:", xhr.statusText);
        }
  }};
    xhr.send();    
  });


  const saveBtn = document.getElementById("save-btn");
  const updateBtn = document.getElementById("update-btn");

  // Task 3
  // POST method send post body and title with confirmation message
  saveBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const sendID = document.getElementById("id").value;
    const sendTitle = document.getElementById("title").value;
    const sendBody = document.getElementById("body").value;

    const fullPost = {
      id: sendID,
      title: sendTitle,
      body: sendBody
  };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPost)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error("Send failed. Post not sent.");
      }
      return response.json();
  })
  .then(responseData => {
      displayPost(responseData);
      alertMSG.innerHTML = "Post Added!";
  })
  .catch(error => {
      console.log("Error adding post:", error);
      alertMSG.innerHTML = "Could not add post. Please try again. " + error;
  });
});

// Task 4
// PUT method, update post with using ID with confirmation message
updateBtn.addEventListener("click", function(post) { 
post.preventDefault(); 

const xhr = new XMLHttpRequest();

const refID = document.getElementById("id").value;
const newTitle = document.getElementById("title").value;
const newBody = document.getElementById("body").value;

if (!refID) {
 alertMSG.innerHTML = "Please provide a valid numerical ID for updating posts";
  return;
}


const updatedPost = {
  id: Number(refID),
  title: newTitle,
  body: newBody
};
console.log(updatedPost);
  xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${refID}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4){
      if(xhr.status == 200) {
        const post = JSON.parse(xhr.responseText);
        displayPost(post);
        console.log(xhr.responseText);
      } else if (xhr.status == 404){
        alertMSG.innerHTML = "Error updating post:" + xhr.statusText;
        console.log("Error updating post:", xhr.statusText);
      } else if (xhr.status == 500){
        alertMSG.innerHTML = "Server Error" + xhr.statusText;
        console.log("Server Error", xhr.statusText);
      } else {
        alertMSG.innerHTML = "Error:" + xhr.statusText;
        console.log("Error:", xhr.statusText);
      }
}};
xhr.send(JSON.stringify(updatedPost));

});
