function createToaster(config) {
  return function (str) {
    let parentEl = document.querySelector(".parent");
    let div = document.createElement("div");
    
    // Structure of the toaster
    div.className = "toaster-item flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl mb-3 border-zinc-700 border transition-all duration-300";
    
    // Add icon and text
    div.innerHTML = `
      <div class="bg-green-500/20 p-1.5 rounded-full">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium">${str}</p>
      </div>
      <button class="close-btn text-gray-500 hover:text-white transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    `;

    parentEl.appendChild(div);

    // Apply positioning
    const xPos = config.positionX === "right" ? "right-6" : "left-6";
    const yPos = config.positionY === "bottom" ? "bottom-6" : "top-6";
    parentEl.className = `fixed parent p-0 flex flex-col gap-1 ${xPos} ${yPos}`;

    // Close on click
    div.querySelector(".close-btn").addEventListener("click", () => {
      removeToaster(div);
    });

    function removeToaster(element) {
      element.classList.add("removing");
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 300);
    }

    // Auto remove
    setTimeout(() => {
      removeToaster(div);
    }, config.duration * 1000);
  };
}

let toaster = createToaster({
  positionX: "right",
  positionY: "bottom",
  theme: "dark",
  duration: 4,
});

toaster("Download Done.");

setTimeout(() => {
  toaster("Vivek Complete your Work today itself.");
}, 3000);

setTimeout(() => {
  toaster("Work Done Today.");
}, 5000);

// --------------------------------------------------------------------------------

let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");

const userManager = {
  users: [],
  filteredUsers: [],
  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
    searchBtn.addEventListener("click", this.handleSearch.bind(this));
    searchInput.addEventListener("input", this.handleSearch.bind(this));
  },
  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },
  addUser: function () {
    const newUser = {
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    };
    this.users.push(newUser);
    this.filteredUsers = [...this.users];

    form.reset();
    this.renderUi();
    
    // Notify using toaster
    if (typeof toaster === "function") {
      toaster(`User ${newUser.username} added successfully!`);
    }
  },

  handleSearch: function () {
    const query = searchInput.value.toLowerCase().trim();
    if (query === "") {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => 
        user.username.toLowerCase().includes(query) || 
        user.role.toLowerCase().includes(query)
      );
    }
    this.renderUi();
  },

  renderUi: function () {
    document.querySelector(".users").innerHTML = "";
    const usersToRender = this.filteredUsers;
    
    if (usersToRender.length === 0 && this.users.length > 0) {
      document.querySelector(".users").innerHTML = `
        <div class="col-span-full text-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-800/50">
          <p class="text-zinc-500">No users found matching your search.</p>
        </div>
      `;
      return;
    }

    usersToRender.forEach(function (user, index) {
      // Parent card
      const card = document.createElement("div");
      card.className = "group relative bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-3xl p-6 transition-all duration-500";

      // Card Content Wrapper
      card.innerHTML = `
        <div class="relative flex flex-col items-center">
          <!-- Image Container with Glow -->
          <div class="relative group-hover:scale-110 transition-transform duration-500">
            <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <img src="${user.photo}" class="relative w-24 h-24 rounded-full object-cover border-2 border-zinc-700 shadow-xl" alt="${user.username}">
          </div>

          <!-- User Info -->
          <div class="mt-6">
            <h3 class="text-lg font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent transition-all duration-500">
              ${user.username}
            </h3>
            <span class="inline-block mt-1 px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700 transition-all duration-500">
              ${user.role}
            </span>
          </div>

          <!-- Bio -->
          <p class="mt-4 text-sm text-zinc-400 leading-relaxed line-clamp-3 transition-colors duration-500">
            ${user.bio}
          </p>

          <!-- Action Buttons (Shown Directly) -->
          <div class="mt-6 flex gap-3 transition-all duration-500">
            <button class="px-4 py-2 text-xs font-semibold bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              View Profile
            </button>
            <button class="px-4 py-2 text-xs font-semibold bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700">
              Message
            </button>
          </div>
        </div>

        <!-- Decorative corner element (Shown Directly) -->
        <div class="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 transition-opacity duration-500"></div>
      `;

      // Add card to DOM
      document.querySelector(".users").appendChild(card);
    });
  },
  removeUser: function () {},
};

userManager.init();
