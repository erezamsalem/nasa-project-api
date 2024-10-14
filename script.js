const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Scroll To Top, Remove Loader, Show Content
function showContent(page) {
  window.scrollTo({ top: 0, behavior: 'instant' });
  loader.classList.add('hidden');
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
}

function createDOMNodes(page) {
  // Load ResultsArray or Favorites
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if (page === 'results') {
      saveText.textContent = 'Add To Favorites';
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
    }
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  // Reset DOM, Create DOM Nodes, Show Content
  imagesContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM('results');
  } catch (error) {
    // Catch Error Here
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

// On Load
getNasaPictures();

// const resultsNav = document.getElementById('resultsNav');
// const favoritesNav = document.getElementById('favoritesNav');
// const imagesContainer = document.querySelector('.images-container');
// const saveConfirmed = document.querySelector('.save-confirmed');
// const loader = document.querySelector('.loader');

// const count = 10;
// const apiKey = 'VUSQag3tPuIYxrzrvnpzW3k0BBkJgXcmGFViLj2b';
// const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// let resultsArray = [];
// let favorites = {}

// function showContent(page) {
//     window.scrollTo({ top: 0, behavior: 'instant' });
//     if (page === 'results') {
//         resultsNav.classList.remove('hidden');
//         favoritesNav.classList.add('hiddn');
//     } else {
//         resultsNav.classList.add('hidden');
//         favoritesNav.classList.remove('hiddn');
//     }
//     loader.classList.add('hidden');
// }

// function createDOMNodes(page) {
//     const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
//     currentArray.forEach((result) => {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         const link = document.createElement('a');
//         link.href = result.hdurl;
//         link.title = 'View Full Image';
//         link.target = '_blank';
//         const image = document.createElement('img');
//         image.src = result.url;
//         image.alt = 'NASA Picture of the Day';
//         image.loading = 'lazy';
//         image.classList.add('card-img-top');
//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');
//         const cardTitle = document.createElement('h5');
//         cardTitle.classList.add('card-title');
//         cardTitle.textContent = result.title;
//         const saveText = document.createElement('p');
//         saveText.classList.add('clickable');
//         if (page === 'results') {
//             saveText.textContent = 'Add To Favorites';
//             saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
//         } else {
//             saveText.textContent = 'Remove Favorite';
//             saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
//         }
//         const cardText = document.createElement('p');
//         cardText.textContent = result.explanation;
//         const footer = document.createElement('small');
//         footer.classList.add('text-muted');
//         const date = document.createElement('strong');
//         date.textContent = result.date;
//         const copyrightResult = result.copyright === undefined ? '' : result.copyright;
//         const copyright = document.createElement('span');
//         copyright.textContent = ` ${copyrightResult}`;
//         footer.append(date, copyright);
//         cardBody.append(cardTitle, saveText, cardText, footer);
//         link.appendChild(image);
//         card.append(link, cardBody);
//         imagesContainer.appendChild(card);
//         });
// }

// function updateDOM(page) {
//   if (localStorage.getItem('nasaFavorites')) {
//     favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
//   }
//   imagesContainer.textContent = '';
//   createDOMNodes(page);
//   showContent(page);
// }


// async function getNasaPictures() {
//     loader.classList.remove('hidden');
//     try {
//         const response = await fetch(apiUrl);
//         resultsArray = await response.json();
//         updateDOM('results');
//     } catch (error) {

//     }
// }

// function saveFavorite(itemUrl) {
//     resultsArray.forEach((item) => {
//         if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
//             favorites[itemUrl] = item;
//             console.log(JSON.stringify(favorites));
//             saveConfirmed.hidden = false;
//             setTimeout(()=>{
//                 saveConfirmed.hidden = true;
//             }, 2000);
//             localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
//         }
//     });
// }

// function removeFavorite(itemUrl) {
//     if (favorites[itemUrl]) {
//         delete favorites[itemUrl];
//         localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
//         updateDOM('favorites');
//     }
// }

// getNasaPictures();



