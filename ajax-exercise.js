import axios from "axios";

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  const res = await axios.get("https://dog.ceo/api/breeds/image/random");
  const imageDiv = document.querySelector("#dog-image");
  imageDiv.innerHTML = `<img src="${res.data.message}" alt="pup">`;
}

document
  .querySelector("#get-dog-image")
  .addEventListener("click", showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector("#zipcode-field").value;

  const url = `/weather.txt?zipcode=${zipcode}`;
  axios.get(url).then((res) => {
    const weatherInfo = document.querySelector("#weather-info");
    weatherInfo.innerText = `${res.data}`;
  });
}

document
  .querySelector("#weather-button")
  .addEventListener("click", showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault();
  const qty = document.querySelector("#qty-field").value;
  const cookieType = document.querySelector("#cookie-type-field").value;
  const cookiesForPurchase = {
    qty: `${qty}`,
    cookieType: `${cookieType}`,
  };

  const res = await axios.post(`/order-cookies.json`, cookiesForPurchase);

  const orderStatus = document.querySelector("#order-status");

  if (res.data.resultCode === "ERROR") {
    orderStatus.setAttribute("class", "order-error");
    orderStatus.innerText = res.data.message;
  } else {
    orderStatus.setAttribute("class", "");
    orderStatus.innerText = res.data.message;
  }
}
document.querySelector("#order-form").addEventListener("submit", orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = { term: `${searchTerm}` };
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  const res = await axios.get(url);
  console.log(res.data);

  let artistAndTrack = "";
  for (const song of res.data.results) {
    artistAndTrack += `<li>${song.artistName}, ${song.trackName}</li>`;
  }
  document.querySelector("#itunes-results").innerHTML = artistAndTrack;
}

document
  .querySelector("#itunes-search-form")
  .addEventListener("submit", iTunesSearch);
