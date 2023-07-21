const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    const url = 'https://newsroom.churchofjesuschrist.org/news-releases';
/*  const url = 'https://www.bbc.com/';
    const bbcClassName = ".block-link__overlay-link"
*/
    axios(url)
    .then(response =>{
        const html = response.data; //This gets the html of the page
        console.log("chamado");
        const $ = cheerio.load(html); //This will transform the html in a cheerio object, that is a representation of the html
        const articles = [];

        $('.result').each((index, element) => {
            const title = $(element).find('h3').text()
            const url = $(element).attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles);
        return res.json(articles);
    })
    .catch(error =>{
        console.error(error);
    })
});

module.exports = router;

