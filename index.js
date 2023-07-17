const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

const url = 'https://www.cnnbrasil.com.br/';

axios(url)
    .then(response =>{
        const html = response.data; //This gets the html of the page
        console.log("chamado");
        const $ = cheerio.load(html); //This will transform the html in a cheerio object, that is a representation of the html
        const articles = [];

        $('.mostread__item').each((index, element) => {
            const title = $(element).text()
            const url = $(element).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles);
    })
    .catch(error =>{
        console.error(error);
    })

app.listen(PORT, ()=> console.log(`Server running at PORT ${PORT}`));