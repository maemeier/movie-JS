const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/?", {
    params: {
      apikey: "ac9547f2",
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <lable><b> Search for a Movie</b></lable>
  <input class="input"/>
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
  </div>
`;
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

// delay

const onInput = async event => {
  const movies = await fetchData(event.target.value);

  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  // clear list
  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    // check broken image poster
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
        <img src="${imgSrc}"/>
         ${movie.Title}
      `;

    // select movie and close the drop menu
    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounce(onInput, 1000));

// closing dropdown
document.addEventListener("click", event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

// onMovieSelect
const onMovieSelect = async movie => {
  const response = await axios.get("http://www.omdbapi.com/?", {
    params: {
      apikey: "ac9547f2",
      i: movie.imdbID
    }
  });

  document.querySelector("#summary").innerHTML = movieTemplete(response.data);
};

// movie templete

const movieTemplete = movieDetail => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src=${movieDetail.Poster}/>
      </p>
    </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
  <article>
  `;
};
