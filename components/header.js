import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

import Router from 'next/router'

const Header = () => {
    return(
        <div>
            <Head>
                <title>Thaiflix</title>
                <link rel="shortcut icon" href="/logo-min.png"/>
            </Head>
            <div className={styles.navbar}>
                <div>
                    <div style={{ cursor : 'pointer'}} onClick={() => Router.push("/")}><img src="/logo.png" alt=""/></div>
                    <div>
                    <ul>
                        <li onClick={() => Router.push("/")}>หน้าหลัก</li>
                        <li>รายการทีวี</li>
                        <li>ภาพยนตร์</li>
                        <li>มาใหม่และกำลังฮิต</li>
                        <li>รายการของฉัน</li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;