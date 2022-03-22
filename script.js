const main = document.querySelector("#main");
let users = [];

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
    const name = document.createElement("p");
    name.innerText = users[i].name.first + " " + users[i].name.last;
    card.append(name);
    main.append(card);

    const profilePhoto = document.createElement("img");
    profilePhoto.classList.add("card_profil-photo");
    profilePhoto.src = users.picture;
    card.append(profilePhoto);

    const bgCover = document.createElement("img");
    bgCover.classList.add("card-bg-cover");
    bgCover.src =
      users.backgroundImage ||
      "https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_960_720.jpg";
    card.append(bgCover);

    const btnConnect = document.createElement("button");
    btnConnect.classList.add("btn-connect");
    btnConnect.innerText = "Connect";
    card.append(btnConnect);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.innerText = "X";
    card.append(btnDelete);
  }
}

function createUserCard() {}
getUserData();
