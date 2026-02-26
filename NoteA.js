// Select form and inputs
let addNote = document.querySelector("#add-note");
let closeForm = document.querySelector("#close-form");
let formContainer = document.querySelector(".form-container");
const form = document.querySelector(".note-form");

const stack = document.querySelector(".stack");
const previousBtn = document.querySelector(".Previous-btn");
const nextBtn = document.querySelector(".Next-btn");

const formTitle = document.querySelector(".form-title");
const imageUrlInput = document.querySelector(
  'input[placeholder="https://example.com/photo.jpg"]'
);

const fullNameInput = document.querySelector("#fullName");
const homeTownInput = document.querySelector("#homeTown");
const purposeInput = document.querySelector("#purpose");

const categoryFieldset = document.querySelector(".category");
const categoryRadios = document.querySelectorAll(
  'input[type="radio"][name="category"]'
);

const submitButton = document.querySelector(".submit-btn");

// code starts here

function saveToLocalStorage(obj) {
  let oldTasks = localStorage.getItem("tasks");
  oldTasks = oldTasks ? JSON.parse(oldTasks) : [];
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

addNote.addEventListener("click", function () {
  formContainer.style.display = "block";
});

if (closeForm) {
  closeForm.addEventListener("click", function () {
    formContainer.style.display = "none";
  });
}

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  // validation logic
  if (imageUrl === "" || fullName === "" || homeTown === "" || purpose === "") {
    alert("Please fill in all fields.");
    return;
  }

  let categorySelected = false;
  categoryRadios.forEach((radio) => {
    if (radio.checked) categorySelected = true;
  });

  if (!categorySelected) {
    alert("Please select a category");
    return;
  }

  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    categorySelected,
  });

  form.reset();
  formContainer.style.display = "none";
  showCards();
});

// Adding cards
function showCards() {
  let allTasks = localStorage.getItem("tasks");
  if (!allTasks) return;
  
  allTasks = JSON.parse(allTasks);
  stack.innerHTML = "";

  allTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="profile">
        <img src="${task.imageUrl}" alt="${task.fullName}" class="avatar">
        <div class="profile-text">
          <h3>${task.fullName}</h3>
        </div>
      </div>
      <div class="details">
        <div class="detail-row">
          <span>Home Town</span>
          <span>${task.homeTown}</span>
        </div>
        <div class="detail-row">
          <span>Purpose</span>
          <span>${task.purpose}</span>
        </div>
      </div>
      <div class="actions">
        <button class="call-btn">📞 Call</button>
        <button class="msg-btn">Message</button>
      </div>
    `;

    stack.appendChild(card);
  });
  
  updateStack();
}

showCards();

function updateStack() {
  const cards = document.querySelectorAll(".stack .card");
  
  cards.forEach(function (card, index) {
    const depth = index;
    const isFirst = index === 0;
    
    card.style.zIndex = cards.length - index;
    card.style.transform = `
      translateY(${depth * 15}px) 
      translateZ(${-depth * 50}px) 
      scale(${1 - depth * 0.05})
      rotateX(${-depth * 2}deg)
    `;
    card.style.opacity = isFirst ? "1" : `${0.8 - depth * 0.2}`;
    card.style.pointerEvents = isFirst ? "auto" : "none";
    
    if (isFirst) {
      card.style.boxShadow = "var(--shadow-xl)";
    } else {
      card.style.boxShadow = "var(--shadow-md)";
    }
  });
}

// Button navigator
if (previousBtn) {
  previousBtn.addEventListener("click", function () {
    const cards = Array.from(stack.querySelectorAll(".card"));
    if (cards.length > 1) {
      const lastCard = cards.pop();
      stack.prepend(lastCard);
      updateStack();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    const cards = Array.from(stack.querySelectorAll(".card"));
    if (cards.length > 1) {
      const firstCard = cards.shift();
      stack.append(firstCard);
      updateStack();
    }
  });
}
