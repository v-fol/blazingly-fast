const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const someDummyDataDict = {
    name: "John Doe",
    age: 30,
    city: "New York",
    has_children: false,
    titles: ["engineer", "developer", "programmer", "coder"],
    salary: 100000.0,
    is_married: true,
    is_single: false,
    is_divorced: false,
    is_widowed: false,
    is_engaged: false,
    siblings: null,
    parents: null,
    spouse: null,
};

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, '../../frontend/dist/index.html');
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading the file');
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    });
});

app.get('/json', (req, res) => {
    const jsonResponse = JSON.stringify(someDummyDataDict);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
});

app.get('/assets/:file_path', (req, res) => {
    const assetFilePath = path.join(__dirname, `../../frontend/dist/assets/${req.params.file_path}`);
    fs.readFile(assetFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    });
});

const PORT = 8000;
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
