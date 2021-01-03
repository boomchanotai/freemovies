const fs = require('fs');
const axios = require("axios");
const jsdom = require("jsdom");

console.time('Saved');
fs.readFile('movie.json', 'utf8', async (err, data) => {

    data = JSON.parse(data)

    let processedItem = 0;

    data.movie.forEach(async (element, key) => {
        const res = await axios.get('https://movie285.com/' + element.href, {
            headers: {"Access-Control-Allow-Origin": "*"}
        });

        const dom = new jsdom.JSDOM(res.data);
        data.movie[key].info = dom.window.document.querySelector(".x-content").innerHTML.replace( /(<([^>]+)>)/ig, '').replace(/\n/g, '');
        data.movie[key].src = dom.window.document.getElementsByClassName("video-box")[0].querySelector("iframe").src;

        processedItem++;

        if (processedItem == data.movie.length) {
            fs.writeFile('test.json', JSON.stringify(data), function (err) {
                if (err) throw err;
            });
            console.timeEnd('Saved');
        }
    });



});