const modal = document.querySelector("#add-modal");
const backDrop = document.querySelector("#backdrop");
const headerBtn = document.querySelector("header button");
const cancelBtn = modal.querySelector(".btn--passive");
const confirmAdd = cancelBtn.nextElementSibling;
const userInputs = modal.querySelectorAll("input");
const section = document.querySelector("section");
const moviesList = document.querySelector("ul");
const deleteModal = document.querySelector("#delete-modal");
const movies = [];

const backdropHandler = () => {
  backDrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  modal.classList.remove("visible");
};

const addMovieHandler = () => {
  modal.classList.add("visible");
  backdropHandler();
};

const clearModal = () => {
  addMovieHandler();
  clearInputs();
};

const clearInputs = () => {
  for (let input of userInputs) {
    input.value = "";
  }
};

//  update UI function
const updateUi = () => {
  if (movies.length === 0) {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
};

const deleteMovieModal = (movieId) => {
  let index = 0;
  for (let movie of movies) {
    if (movieId === movie.id) {
      break;
    }
    index++;
  }
  movies.splice(index, 1);
  moviesList.children[index].remove();
};

const deleteMovieHandler = (movieId) => {
  deleteModal.classList.add("visible");
  backdropHandler();
  // deleteMovieModal(movieId);
};

const addNewMovie = (id, title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class='movie-element__image'>
        <img src="${image}" alt="${title}" />
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  moviesList.appendChild(newMovieElement);
};

const confirmMovie = () => {
  const title = userInputs[0].value;
  const image = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    image.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("add basic form, stupid!");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: title,
    image: image,
    rating: rating,
  };

  movies.push(newMovie);
  console.log(movies);
  clearInputs();
  clearModal();
  addNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
};

headerBtn.addEventListener("click", addMovieHandler);
backDrop.addEventListener("click", clearModal);
cancelBtn.addEventListener("click", clearModal);
confirmAdd.addEventListener("click", confirmMovie);
