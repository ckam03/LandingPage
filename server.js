
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js'); 
global.fetch = fetch;
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY })

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json())
app.use(express.static('public'))

app.post('/photos/random', (req, res) => {
    
    unsplash.photos.getRandomPhoto({
        query: "nature",    
    })
        .then(toJson)
        .then(json => {
            unsplash.photos.trackDownload(json);
            res.send(json)
        })
        
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
