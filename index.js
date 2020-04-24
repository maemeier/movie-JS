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

// autocomplete

createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
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
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Meta score</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
