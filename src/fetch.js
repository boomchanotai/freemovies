const fs = require('fs');

const axios = require("axios");
const jsdom = require("jsdom");

(async () => {
    console.time('Saved');
    const getIndex = await axios.get("https://movie285.com/", {
        headers: {"Access-Control-Allow-Origin": "*"}
    });

    const domIndex = new jsdom.JSDOM(getIndex.data);

    // get Page list
    let pageList = 0;
    domIndex.window.document.querySelectorAll(".page-numbers:nth-last-child(2)").forEach((a) => {
        pageList = a.innerHTML
    })

    // get Movie
    let movie = [];
    movie = await getMovie(pageList);

    // get Movie list
    let movieList = movie.length;

    // get Frame src and info
    let processedItem = 0;

    movie.forEach(async (element, key) => {
        const res = await axios.get('https://movie285.com/' + element.href, {
            headers: {"Access-Control-Allow-Origin": "*"}
        });

        const dom = new jsdom.JSDOM(res.data);
        movie[key].info = dom.window.document.querySelector(".x-content").innerHTML.replace( /(<([^>]+)>)/ig, '').replace(/\n/g, '');
        movie[key].src = dom.window.document.getElementsByClassName("video-box")[0].querySelector("iframe").src;

        processedItem++;

        if (processedItem == movie.length) {
            
            // write file
            fs.writeFile('movie.json', 
            JSON.stringify(
                { 
                    total_page : parseInt(pageList),
                    total_movie : parseInt(movieList),
                    movie
                }
            ), 

            function (err) {
                    if (err) throw err;
                    console.timeEnd('Saved');
            });
        }
    });

})()

const getMovie = async (pagelist) => {

    let out = [];

    for (let index = 1; index <= 2; index++) {
        const res = await axios.get("https://movie285.com/page/" + index, {
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        const dom = new jsdom.JSDOM(res.data);

        let moviePageNum = dom.window.document.querySelectorAll(".col-3.list-box-item").length;

        dom.window.document
            .querySelectorAll(".col-3.list-box-item")
            .forEach(async (a) => {
                
                let href = a.getElementsByClassName("list-link")[0].href

                out.push({
                    title: a
                        .getElementsByClassName("list-link")[0]
                        .getElementsByClassName("list-box")[0]
                        .getElementsByClassName("list-title")[0].innerHTML,
                    href: href.replace("https://movie285.com/", ""),
                    pic: a
                        .getElementsByClassName("list-link")[0]
                        .getElementsByClassName("list-box")[0]
                        .getElementsByClassName("list-thumbnail")[0]
                        .getElementsByClassName("attachment-full")[0].src
                });
            });
    }

    return out;
}