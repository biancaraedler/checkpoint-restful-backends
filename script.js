const cardContainer = document.querySelector("#card-container");
let users = [];
let pendingInvites = 0;

function getUserData() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((res) => res.json())
    .then((data) => {
      users = data;
      renderUserData();
    });
}

function renderUserData() {
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    //bg Cover
    const bgCover = document.createElement("img");
    bgCover.classList.add("card-bg-cover");
    bgCover.src =
      users[i].backgroundImage ||
      "https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_960_720.jpg";
    card.append(bgCover);

    //profile Photo
    const profilePhoto = document.createElement("img");
    profilePhoto.classList.add("card_profil-photo");
    profilePhoto.src = users[i].picture;
    card.append(profilePhoto);

    //name
    const name = document.createElement("p");
    name.innerText = users[i].name.first + " " + users[i].name.last;
    name.classList.add("last-first-name");
    card.append(name);
    cardContainer.append(card);

    //title
    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = users[i].title;
    card.append(title);

    //mutual

    //connect Button
    const btnConnect = document.createElement("button");
    btnConnect.classList.add("btn-connect");
    btnConnect.innerText = "Connect";
    btnConnect.addEventListener("click", pendingConnect);
    card.append(btnConnect);

    //delete button
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.id = users[i];
    btnDelete.innerText = "X";
    btnDelete.addEventListener("click", deleteConnect);
    card.append(btnDelete);
  }
}

function deleteConnect(e) {
  const button = e.target;
  const id = button.id;
  const card = button.parentElement;
  users = users.filter((element) => element.id !== id);
  card.remove();
  getUserData();
}

function pendingConnect(event) {
  const button = event.target;
  if (button.innerText === "Connect") {
    button.innerText = "Pending";
    pendingInvites++;
  } else if (button.innerText === "Pending") {
    button.innerText = "Connect";
    pendingInvites--;
  }
  changeNumber();
}

function changeNumber() {
  document.querySelector("#no-pending").innerText =
    pendingInvites + "pending invitations";
}

getUserData();
