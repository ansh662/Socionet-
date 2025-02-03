let users = JSON.parse(localStorage.getItem("users")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("user")) || null;
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// ✅ Registration function
function register() {
let username = document.getElementById("regUsername").value.trim();
let password = document.getElementById("regPassword").value.trim();

if (username && password) {
if (users.find(user => user.username === username)) {
alert("Username already exists!");
return;
}
users.push({ username, password });
localStorage.setItem("users", JSON.stringify(users));
alert("Registration successful! Please log in.");
window.location.href = "login.html";
} else {
alert("Please fill in both fields.");
}
}

// ✅ Login function
function login() {
let username = document.getElementById("username").value.trim();
let password = document.getElementById("password").value.trim();

let user = users.find(u => u.username === username && u.password === password);

if (user) {
localStorage.setItem("user", JSON.stringify(user));
window.location.href = "home.html";
} else {
alert("Invalid credentials, please try again.");
}
}

// ✅ Logout function
function logout() {
localStorage.removeItem("user");
window.location.href = "login.html";
}

// ✅ Create post function
function addPost() {
if (!currentUser) {
alert("You must be logged in to post!");
return;
}

let postContent = document.getElementById("postContent").value.trim();
let mediaFile = document.getElementById("mediaFile").files[0];

if (postContent || mediaFile) {
let post = {
user: currentUser.username,
content: postContent,
media: mediaFile ? URL.createObjectURL(mediaFile) : null
};
posts.push(post);
localStorage.setItem("posts", JSON.stringify(posts));
displayPosts();
document.getElementById("postContent").value = "";
document.getElementById("mediaFile").value = "";
} else {
alert("Please write something or upload a media file.");
}
}

// ✅ Display posts function
function displayPosts() {
let feed = document.getElementById("feed");
feed.innerHTML = "";
posts.forEach((post, index) => {
let postDiv = document.createElement("div");
postDiv.classList.add("post");
postDiv.innerHTML = `
<p><strong>${post.user}</strong></p>
<p>${post.content}</p>
${post.media ? `<img src="${post.media}" style="max-width: 100%;">` : ""}
<button onclick="deletePost(${index})">Delete</button>
`;
feed.appendChild(postDiv);
});
}

// ✅ Delete post function
function deletePost(index) {
posts.splice(index, 1);
localStorage.setItem("posts", JSON.stringify(posts));
displayPosts();
}

// ✅ Search users function
function searchUsers() {
let searchQuery = document.getElementById("searchBar").value.toLowerCase();
let searchResults = document.getElementById("search-results");
searchResults.innerHTML = "";

let filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery));

filteredUsers.forEach(user => {
let userDiv = document.createElement("div");
userDiv.textContent = user.username;
searchResults.appendChild(userDiv);
});
}

// ✅ Chat function
function sendMessage() {
let messageContent = document.getElementById("message").value.trim();
if (messageContent === "") return;

let message = {
sender: currentUser.username,
content: messageContent,
timestamp: new Date().toLocaleTimeString()
};

messages.push(message);
localStorage.setItem("messages", JSON.stringify(messages));
displayMessages();
document.getElementById("message").value = "";
}

// ✅ Display chat messages function
function displayMessages() {
let chatBox = document.getElementById("chat-box");
chatBox.innerHTML = "";

messages.forEach(msg => {
let msgDiv = document.createElement("div");
msgDiv.innerHTML = `<strong>${msg.sender}</strong>: ${msg.content} <span style="font-size: 10px;">(${msg.timestamp})</span>`;
chatBox.appendChild(msgDiv);
});
}

// ✅ Load posts and messages when the page loads
if (document.getElementById("feed")) {
displayPosts();
}

if (document.getElementById("chat-box")) {
displayMessages();
}