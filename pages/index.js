import axios from 'axios';
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Router from 'next/router'

import Header from '../components/header';

const Home = ({ movielist }) => {

  return (
      <div className={styles.container}>
        <Header />
        <div className={styles.containerInner}>
          <h2>รายการของฉัน</h2>
          <div className={styles.items}>
            {
              movielist.map(({ title, pic, href }) => (
                <div className={styles.item} style={{ backgroundImage : `url('${pic}')` }} onClick={() => Router.push(encodeURI("/movies/" + href))}>
                  <div></div>
                  <div className={styles.itemDescription}><div>{title}</div></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
}

Home.getInitialProps = async () => {
  const res = await axios.post('https://freemovies.centos.vercel.app/api/load_index', { page : 1 })

  return {
    movielist : res.data
  }
}

export default Home;
