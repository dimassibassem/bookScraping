const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
const {abebooks, bookFinder, cpu, alManhal, amazon} = require('./utils');

app.get('/abebooks/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    const data = await abebooks(isbn);
    return res.send(data);
})

app.get('/bookfinder/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const data = await bookFinder(isbn);
    return res.send(data);
})

app.get('/cpu/:isbn', async (req, res) => {
    const {isbn} = req.params
    const data = await cpu(isbn);
    return res.send(data);
})

app.get('/almanhal/:isbn', async (req, res) => {
    const {isbn} = req.params
    const data = await alManhal(isbn);
    return res.send(data);
})

app.get('/amazon/:isbn', async (req, res) => {
    const {isbn} = req.params
    const data = await amazon(isbn);
    return res.send(data);
})

app.get('/all/:isbn', async (req, res) => {
    const {isbn} = req.params

    let result = await bookFinder(isbn);
    if (result.data.coverImage) {
        return res.send(result);
    }
    result = await abebooks(isbn);
    if (result.data.coverImage) {
        return res.send(result);
    }
    result = await amazon(isbn);
    if (result.data.coverImage) {
        return res.send(result);
    }
    result = await alManhal(isbn);
    if (result.data.coverImage) {
        return res.send(result);
    }
    result = await cpu(isbn);
    if (result.data.coverImage) {
        return res.send(result);
    }

    return res.send(result);
})

app.listen(3000, function () {
    console.log('listening on port 3000');
});
