// 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸
const axios = require("axios");

function getBookByName(name) {
    name = name.replace(/\s/g, "+");
    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/search/' + name,
        headers: {
            'X-RapidAPI-Key': 'ff5169b2c0mshc86c10e8c1fce75p1e987ajsn2a66931edc3b',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function getPopularBooksByYear(year) {
    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/top/' + year,
        headers: {
            'X-RapidAPI-Key': 'ff5169b2c0mshc86c10e8c1fce75p1e987ajsn2a66931edc3b',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function getBookByGenreAndYear(genre, year) {
    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/nominees/' + genre + '/' + year,
        headers: {
            'X-RapidAPI-Key': 'ff5169b2c0mshc86c10e8c1fce75p1e987ajsn2a66931edc3b',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function getWeeklyPopularBookByGenre(genre) {
    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/month/2022/3',
        headers: {
            'X-RapidAPI-Key': 'ff5169b2c0mshc86c10e8c1fce75p1e987ajsn2a66931edc3b',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

function getFefteenPopularBookInAMounthOfAYear(mounth, year) {

    const options = {
        method: 'GET',
        url: 'https://hapi-books.p.rapidapi.com/month/' + year + '/' + mounth,
        headers: {
            'X-RapidAPI-Key': 'ff5169b2c0mshc86c10e8c1fce75p1e987ajsn2a66931edc3b',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


// getBookByName("Harry Potter");
// getPopularBooksByYear("2020");
//getBookByGenreAndYear("romance","2020");
//getWeeklyPopularBookByGenre("romance");
//getFefteenPopularBookInAMounthOfAYear("3", "2022");
