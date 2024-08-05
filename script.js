const apiKey = 'cuN4ukhZJAMimAAbdf8ylc5fnmDmILL5L1ZuiP8t'; // Replace with your NASA API key
const apiUrl = 'https://api.nasa.gov/planetary/apod';

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});

document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const date = document.getElementById('search-input').value;
    if (date) {
        getImageOfTheDay(date);
    }
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`${apiUrl}?api_key=${apiKey}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error('Error fetching current image of the day:', error);
        });
}

function getImageOfTheDay(date) {
    fetch(`${apiUrl}?api_key=${apiKey}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error fetching image of the day:', error);
        });
}

function displayImage(data) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = '';
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date);
        });
        historyList.appendChild(listItem);
    });
}
