import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import Router from "next/router";

import Header from "../components/header";

const Home = ({ movielist, pagelist }) => {
  const [movies, setMovies] = useState(movielist);
  const [page, setPage] = useState(1);

  const [startPage, setStartPage] = useState(page - 3 <= 0 ? 1 : page - 3);
  const [endPage, setEndPage] = useState(
    page - 3 <= 0
      ? page + 4 - (page - 4)
      : page + 4 > pagelist
      ? pagelist
      : page + 4
  );

  const handleChangePage = async (pageNumber) => {
    const res = await axios.post("/api/load_index", { page: pageNumber });
    // const res = await axios.post('https://freemovies.centos.vercel.app/api/load_index', { page : pageNumber })
    setMovies(res.data);
    setPage(pageNumber);
    setStartPage(pageNumber - 3 <= 0 ? 1 : pageNumber - 3);
    setEndPage(
      pageNumber - 3 <= 0
        ? pageNumber + 4 - (pageNumber - 4)
        : pageNumber + 4 > pagelist
        ? pagelist
        : pageNumber + 4
    );
  };

  let pageChanger = [];

  if (startPage > 1) {
    pageChanger.push(
      <div className="page" key="1" onClick={() => handleChangePage(1)}>
        1
      </div>
    );
    if (startPage > 2) {
      pageChanger.push(
        <div className="pageDot" key="dotAfter1">
          &#183;&#183;&#183;&#183;&#183;
        </div>
      );
    }
  }

  for (let index = startPage; index < endPage; index++) {
    if (index === page) {
      pageChanger.push(
        <div
          className="page page-active"
          key={index}
          onClick={() => handleChangePage(index)}>
          {index}
        </div>
      );
    } else {
      pageChanger.push(
        <div
          className="page"
          key={index}
          onClick={() => handleChangePage(index)}>
          {index}
        </div>
      );
    }
  }

  if (endPage <= pagelist) {
    if (endPage != pagelist) {
      pageChanger.push(
        <div className="pageDot" key="dotBeforeLast">
          &#183;&#183;&#183;&#183;&#183;
        </div>
      );
    }

    pageChanger.push(
      <div
        className="page"
        key={pagelist}
        onClick={() => handleChangePage(pagelist)}>
        {pagelist}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerInner}>
        <h2>รายการของฉัน</h2>
        <div className={styles.items}>
          {movies.map(({ title, pic, href }) => (
            <div
              key={title}
              className={styles.item}
              style={{ backgroundImage: `url('${pic}')` }}
              onClick={() =>
                (window.location.href = encodeURI("/movies/" + href))
              }>
              <div></div>
              <div className={styles.itemDescription}>
                <div>{title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pages}>{pageChanger}</div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  // const res = await axios.post("http://localhost:4000/api/load_index", { page : 1 })
  // const res1 = await axios.post('http://localhost:4000/api/get_pagelist')

  const res = await axios.get(
    "https://freemovies.centos.vercel.app/data/indexCached.json"
  );
  const res1 = await axios.post(
    "https://freemovies.centos.vercel.app/api/get_pagelist"
  );

  return {
    movielist: res.data,
    pagelist: res1.data,
  };
};

export default Home;
