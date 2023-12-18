//GET post from API 
function renderPost(post) {
  let resultsContainer = document.querySelector('#post-main');

  let title = document.createElement('h1');
  title.textContent = post.title;
  title.classList.add('title-class');
  resultsContainer.append(title);

  let body = document.createElement('p');
  body.textContent = post.body;
  body.classList.add('body-class');
  resultsContainer.append(body);

  let tags = document.createElement('p');
  tags.textContent = 'Tags: ' + post.tags;
  resultsContainer.append(tags);

  let reactions = document.createElement('p');
  reactions.textContent = 'Votes: ' + post.reactions;
  reactions.classList.add('votes-class');
  resultsContainer.append(reactions);
}

const form = document.querySelector('form');
const url = 'https://dummyjson.com/posts/';

//Create a function to fetch and display the posts
function getPosts() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //Clear the previous posts
      document.querySelector('#post-main').innerHTML = '';
      //Render the new posts
      data.posts.forEach((post) => renderPost(post));
    })
}

//Call the function when the page loads
getPosts();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  //Convert the FormData to a plain object
  const object = Object.fromEntries(formData.entries());
  //Stringify the object to JSON
  const json = JSON.stringify(object);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  })
    .then((res) => res.json())
    .then((data) => {
      //Close the modal window
      modal.style.display = "none";
      //Fetch and display the posts again
      getPosts();
    })
})

// Open an window for creating a post
let modal = document.getElementById("myModal");
let btn = document.getElementById("new-post");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

}
