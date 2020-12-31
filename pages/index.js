import axios from 'axios';
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import Router from 'next/router'

import Header from '../components/header';

const Home = ({ movielist, pagelist }) => {

  const [movies, setMovies] = useState(movielist);

  const handleChangePage = async (pageNumber) => {
    const res = await axios.post('http://localhost:3000/api/load_index', { page : pageNumber })
    setMovies(res.data)
  }

  let pageChanger = [];

  for (let index = 1; index < ((pagelist > 6 ) ? 6 : pagelist); index++) {
    
    pageChanger.push(
      <div className="page" key={index} onClick={() => handleChangePage(index)}>{index}</div>
    )
    
  }

  if (pagelist > 6) {
    pageChanger.push(
        <div className="pageDot" key={"PageDot"}>.....</div>
    )

    pageChanger.push(
        <div className="page" key={pagelist} onClick={() => handleChangePage(pagelist)}>{pagelist}</div>
    )
  }  
  
  return (
      <div className={styles.container}>
        <Header />
        <div className={styles.containerInner}>
          <h2>รายการของฉัน</h2>
          <div className={styles.items}>
            {
              movies.map(({ title, pic, href }) => (
                <div key={title} className={styles.item} style={{ backgroundImage : `url('${pic}')` }} onClick={() => Router.push(encodeURI("/movies/" + href))}>
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
  const res = await axios.post('http://localhost:3000/api/load_index', { page : 1 })

  const res1 = await axios.post('http://localhost:3000/api/get_pagelist')

  // const res = await axios.post('https://freemovies.centos.vercel.app/api/load_index', { page : 1 })

  // const res1 = await axios.post('https://freemovies.centos.vercel.app/api/get_pagelist')

  return {
    movielist : res.data,
    pagelist : res1.data
  }
}

export default Home;
