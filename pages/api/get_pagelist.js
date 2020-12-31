const axios = require("axios");
const jsdom = require("jsdom");
const { async } = require("window-or-global");
module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const _res = await axios.get("https://movie285.com/");
    const dom = new jsdom.JSDOM(_res.data);
    let out = 0;

    dom.window.document.querySelectorAll(".page-numbers:nth-last-child(2)").forEach((a) => {
        out = a.innerHTML
    })
    
    // res.send({ pagelist : dom.window.document.querySelectorAll(".page-numbers") });
    res.send(out);
};