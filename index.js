const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use(cors(corsOptions));
app.get('/', require('./routes/root'));
app.use('/api', require('./routes/api/scraper'))

app.listen(PORT, ()=> console.log(`Server running at PORT ${PORT}`));