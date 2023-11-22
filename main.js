function renderPost(post) {
    let resultsContainer = document.querySelector('#post-main');

    let userId = document.createElement('p');
    userId.textContent = 'User: ' + post.userId;
    userId.classList.add('user-class'); 
    resultsContainer.append(userId);

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


let url = 'https://dummyjson.com/posts/';

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.posts.forEach((post) => renderPost(post));
    })

fetchPost();



