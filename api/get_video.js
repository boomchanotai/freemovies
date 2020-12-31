const axios = require("axios");
const jsdom = require("jsdom");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const _res = await axios.get("https://movie285.com/" + req.body.movie);
  const dom = new jsdom.JSDOM(_res.data);
  res.send({
    src: dom.window.document
      .getElementsByClassName("video-box")[0]
      .querySelector("iframe").src,
    title : dom.window.document
      .getElementsByClassName("titlex")[0]
      .querySelector("h1").innerHTML,
    synopsis : dom.window.document
      .querySelector(".x-content").innerHTML.replace( /(<([^>]+)>)/ig, '')
  });
};