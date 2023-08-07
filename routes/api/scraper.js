const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

    const baseUrl = 'https://www.cnnbrasil.com.br/'
    const cnnClassName = '.mostread__item'
    

    axios(baseUrl)
    .then(response =>{
        const html = response.data; //This gets the html of the page
        const $ = cheerio.load(html); //This will transform the html in a cheerio object, that is a representation of the html
        const articles = [];

        $(cnnClassName).each((index, element) => {
            const title = $(element).find('h3').text()
            const url = $(element).find('a').attr('href')
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

