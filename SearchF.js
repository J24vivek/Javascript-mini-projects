const users = [
  {
    name: "Vivek",
    pic: "https://i.pinimg.com/736x/a8/d9/88/a8d988432e06b4a98901581b03adf062.jpg",
    bio: "Mastering the art of silence in a digital world. 🎧",
  },
  {
    name: "Shriraj",
    pic: "https://i.pinimg.com/736x/2a/9f/3a/2a9f3a77ad234d267c60cb5294993b20.jpg",
    bio: "Bridging the gap between Anime dreams and Tech reality. 🚀",
  },
  {
    name: "Balaji",
    pic: "https://i.pinimg.com/1200x/85/3a/5a/853a5a0102da872e193a3743c2450ac4.jpg",
    bio: "Solving complex problems, one algorithm at a time. 💻",
  },
  {
    name: "Shreyash",
    pic: "Shreyash.jpeg",
    bio: "Crafting seamless digital experiences from front to back. ✨",
  },
  {
    name: "Aditya",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVvxBkxQO1bTyqyoF2ZM8u6leagWqAxFebcy06toYIA&s",
    bio: "The architect behind the scenes, building robust backends. 🏗️",
  },
  {
    name: "Kalpesh",
    pic: "https://i.pinimg.com/1200x/01/a1/5a/01a15a55a495d29a63fbb8ce2cd48136.jpg",
    bio: "Bringing the vibrant spirit of Rajasthan to the tech world. 🏜️",
  },
  {
    name: "Mayur",
    pic: "https://i.pinimg.com/736x/56/53/81/565381a4e54386d667cd5fdd226cd155.jpg",
    bio: "Balancing life, love, and top-tier engineering. 🎓",
  },
];

const cardsContainer = document.getElementById("cardsContainer");
const inp = document.querySelector(".inp");

/* Create a single card */
function createCard({ name, pic, bio }) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img class="bg-img" src="${pic}" alt="profile picture">
    <div class="blurred-layer"></div>
    <div class="content">
      <h3>${name}</h3>
      <p>${bio}</p>
    </div>
  `;

  return card;
}

/* Render users */
function showUsers(arr) {
  cardsContainer.textContent = ""; 
  
  if (arr.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.innerHTML = `
      <div class="no-results-content">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <p>No creators found matching your search</p>
      </div>
    `;
    cardsContainer.appendChild(noResults);
    return;
  }

  const fragment = document.createDocumentFragment();
  arr.forEach(user => fragment.appendChild(createCard(user)));
  cardsContainer.appendChild(fragment);
}

/* Initial render */
showUsers(users);

/* Search filter */
inp.addEventListener("input", () => {
  const query = inp.value.toLowerCase().trim();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query)
  );

  showUsers(filteredUsers);
});
