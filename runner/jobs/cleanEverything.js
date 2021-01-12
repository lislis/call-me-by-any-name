require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/cleanEverything`)
    .then(resp => {
        console.log("clean everything ", resp);
        process.exit(0);
    }).catch(e => {
        console.log(e);
        process.exit(1);
    });
