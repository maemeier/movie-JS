const createAutoComplete = ({ root }) => {
  root.innerHTML = `
    <lable><b> Search for a Movie</b></lable>
    <input class="input"/>
      <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
    </div>
  `;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

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
};
