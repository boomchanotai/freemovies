import axios from 'axios';
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import Router from 'next/router'

import Header from '../components/header';

import movies from '../movie.json';

const Home = ({ movielist, pagelist }) => {

  const [page, setPage] = useState(1);

  const [startPage, setStartPage] = useState((page - 3 <= 0) ? 1 : page - 3)
  const [endPage, setEndPage] = useState((page - 3 <= 0) ? (page + 4) - (page - 4) : ((page + 4) > pagelist) ? pagelist : page +4)

  const [sliceStart, setSliceStart] = useState(0);
  const [slideEnd, setSlideEnd] = useState(36)

  const handleChangePage = async (pageNumber) => {
    setPage(pageNumber)
    setStartPage((pageNumber - 3 <= 0) ? 1 : pageNumber - 3)
    setEndPage((pageNumber - 3 <= 0) ? (pageNumber + 4) - (pageNumber - 4) : ((pageNumber + 4) > pagelist) ? pagelist : pageNumber +4)
    setSliceStart((pageNumber -1) * 36)
    setSlideEnd(((pageNumber -1) * 36) + 36)
  }

  let pageChanger = [];

  if (startPage > 1) {
    pageChanger.push(
      <div className="page" key="1" onClick={() => handleChangePage(1)}>1</div>
    )
    if (startPage > 2) {
      pageChanger.push(
        <div className="pageDot" key="dotAfter1">&#183;&#183;&#183;&#183;&#183;</div>
      )
    }
  }

  for (let index = startPage; index < endPage; index++) {

    if (index === page) {
      pageChanger.push(
        <div className="page page-active" key={index} onClick={() => handleChangePage(index)}>{index}</div>
      )
    } else {
      pageChanger.push(
        <div className="page" key={index} onClick={() => handleChangePage(index)}>{index}</div>
      )
    }
    
  }

  if (endPage <= pagelist) {
    if (endPage != pagelist) {
      pageChanger.push(
          <div className="pageDot" key="dotBeforeLast">&#183;&#183;&#183;&#183;&#183;</div>
      )
    }
    
    pageChanger.push(
        <div className="page" key={pagelist} onClick={() => handleChangePage(pagelist)}>{pagelist}</div>
      )
  }
  
  return (
      <div className={styles.container}>
        <Header movielist={movielist} />
        <div className={styles.containerInner}>
          <h2>รายการของฉัน</h2>
          <div className={styles.items}>
            {
              movielist.slice(sliceStart, slideEnd).map(({ title, pic, href }) => (
                <div key={title} className={styles.item} style={{ backgroundImage : `url('${pic}')` }} onClick={() => window.location.href = encodeURI("/movies/" + href)}>
                  <div></div>
                  <div className={styles.itemDescription}><div>{title}</div></div>
                </div>
              ))
            }
          </div>
          <div className={styles.pages}>
            {pageChanger}
          </div>
        </div>
      </div>
    )
}

Home.getInitialProps = async () => {

  return {
    movielist : movies.movie,
    pagelist : movies.total_page
  }
}

export default Home;
