import styles from '../styles/Home.module.css'

import Router from 'next/router'

import Header from '../components/header';

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerInner}>
        <h2>รายการของฉัน</h2>
        <div className={styles.items}>
          <div className={styles.item} style={{ backgroundImage : `url('/wonder-woman.jpg')` }} onClick={() => Router.push(encodeURI("/movies/wonder-woman-1984-%e0%b8%a7%e0%b8%b1%e0%b8%99%e0%b9%80%e0%b8%94%e0%b8%ad%e0%b8%a3%e0%b9%8c-%e0%b8%a7%e0%b8%b9%e0%b9%81%e0%b8%a1%e0%b8%99-1984-2020/"))}>
            <div></div>
            <div className={styles.itemDescription}><div>Wonder Woman 1984 วันเดอร์ วูแมน 1984 (2020)</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
