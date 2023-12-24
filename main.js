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
  reactions.textContent = 'Likes: ' + post.reactions;  // Display the number of likes
  reactions.classList.add('votes-class');
  resultsContainer.append(reactions);

  let likeButton = document.createElement('button');
  likeButton.textContent = 'Like';

  likeButton.addEventListener('click', () => {
    post.reactions++;
    reactions.textContent = 'Likes: ' + post.reactions;
  });
  resultsContainer.append(likeButton);
}


const form = document.querySelector('form');
const url = 'https://dummyjson.com/posts/';

//Create a function to save a post in local storage
function savePost(post) {
  let key = 'post-' + Date.now();
  let value = JSON.stringify(post);
  localStorage.setItem(key, value);
}

//Create a function to fetch and display the posts
function getPosts() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let localPosts = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('post-')) {
          let value = localStorage.getItem(key);
          let post = JSON.parse(value);
          localPosts.push(post);
        }
      }

      document.querySelector('#post-main').innerHTML = '';
      let allPosts = data.posts.concat(localPosts);
      allPosts.forEach((post) => renderPost(post));
    })
}


//Call the function when the page loads
getPosts();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData.entries());
  const json = JSON.stringify(object);

  savePost(object);

  modal.style.display = "none";
  getPosts();
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
