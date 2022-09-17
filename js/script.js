// Get Element HTML to JavaScript
let elForm = document.querySelector(".movies__form");
let elMoviesWrapper = document.querySelector(".movies__wrapper");
let elMoviesTemplate = document.querySelector(".movies__template").content;
let elMoviesResult = document.querySelector(".movies__result");
let elMoviesTitle = document.querySelector(".movies__title");
let elMoviesRating = document.querySelector(".movies__rating");
let elMoviesYear = document.querySelector(".movies__year");
let elMoviesImg = document.querySelector(".movies__img");
let elMoviesInputSearche = document.querySelector(".input__searche");
let elMoviesInputRating = document.querySelector(".input__rating");
let elMoviesInputCategory = document.querySelector(".input__category");
let elMoviesInputSorting = document.querySelector(".input__sorting");
let elMoviesInputYear = document.querySelector(".input__year");
let elMoviesInfoBtn = document.querySelector(".movies__info");
let elMoviesInfoTitle = document.querySelector(".movies__info__title");
let elMoviesInfoSummary = document.querySelector(".movies__info__summary");


let moviesArray = movies.slice(0, 50);

// Normalized Array

let normalizedArray = moviesArray.map(item => {
    return {
        title: item.Title.toString(),
        rating: item.imdb_rating,
        id: item.imdb_id,
        category: item.Categories.split("|"),
        movieYear: item.movie_year,
        info: item.summary,
        video: `https://www.youtube.com/watch?v=${item.ytid}`,
        images: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
    }
});

// Category Find

function findCategory(array) {
    newArray = [];
    
    for (const item of array) {
        let movieCategory = item.category
        for (const item1 of movieCategory) {
            if(!newArray.includes(item1)){
                newArray.push(item1);
            }
        }
    }
    return newArray;
}

let resultCategory = findCategory(normalizedArray).sort();
console.log(resultCategory);

// Render Category

function renderCategory(array, wrapper) {
    let fragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item;
        fragment.appendChild(newOption);
    }
    wrapper.appendChild(fragment);
}

renderCategory(resultCategory, elMoviesInputCategory);



// Render Movies 

function renderMovies(array, wrapper) {
    elMoviesWrapper.innerHTML = null;
    elMoviesResult.textContent = array.length
    
    let fragment = document.createDocumentFragment();
    
    for (const item of array) {
        let moviesTemplate = elMoviesTemplate.cloneNode(true);
        
        moviesTemplate.querySelector(".movies__img").src = item.images;
        moviesTemplate.querySelector(".movies__title").textContent = item.title;
        moviesTemplate.querySelector(".movies__year").textContent = item.movieYear;
        moviesTemplate.querySelector(".movies__rating").textContent = item.rating;
        moviesTemplate.querySelector(".movies__category").textContent = item.category;
        moviesTemplate.querySelector(".movies__trailer").href = item.video;
        moviesTemplate.querySelector(".movies__info").dataset.movieId = item.id;
        moviesTemplate.querySelector(".movies__trailer").target = "_blank";
        
        fragment.appendChild(moviesTemplate);
    }
    wrapper.appendChild(fragment);
}

renderMovies(normalizedArray, elMoviesWrapper);


elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    let inputSearche = elMoviesInputSearche.value.trim();
    let newRegEx = new RegExp(inputSearche , "gi");
    
    let inputYear = elMoviesInputYear.value.trim();
    let inputRating = elMoviesInputRating.value.trim();
    let inputCategory = elMoviesInputCategory.value.trim();
    let inputSorting = elMoviesInputSorting.value.trim();
    
    let filteredArray = normalizedArray.filter(function (item) {
        let searche = item.title.match(newRegEx);
        
        let sorted = inputCategory == "all" ? true :item.category.includes(inputCategory);
        
        let validation = item.movieYear >= inputYear && item.rating >= inputRating && sorted && searche
        return validation;
    })
    
    filteredArray.sort(function (a, b) {
        if (inputSorting == "rating-low-high") {
            return a.rating - b.rating;
        }
        
        if (inputSorting == "rating-high-low") {
            return b.rating - a.rating;
        }
        if (inputSorting == "year-new-old") {
            return a.movieYear - b.movieYear;
        }
        
        if (inputSorting == "year-old-new") {
            return b.movieYear - a.movieYear;
        }
        
        if (inputSorting == "a-z") {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            } else if (a.title = b.title){
                return 0;
            }
        }
        if (inputSorting == "z-a") {
            if (a.title > b.title) {
                return -1;
            }
            if (a.title < b.title) {
                return 1;
            } else if (a.title = b.title){
                return 0;
            }
        }
    });
    renderMovies(filteredArray, elMoviesWrapper);
});

elMoviesWrapper.addEventListener("click", function(evt){

    let moviesInfoId = evt.target.dataset.movieId 

    if (moviesInfoId) {
        let foundMovie = normalizedArray.find(function (item) {
            return item.id == moviesInfoId;
        });
        elMoviesInfoTitle.textContent = foundMovie.title;
        elMoviesInfoSummary.textContent = foundMovie.info;
    }
});






















const gradient = document.querySelector(".gradient");

function onMouseMove(event) {
    gradient.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, rgba(159,0,191,.9) 0, #4D4FA7 70%)';
}
document.addEventListener("mousemove", onMouseMove);

