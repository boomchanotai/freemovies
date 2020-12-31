import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

const Header = () => {
    return(
        <div>
            <Head>
                <title>Thaiflix</title>
                <link rel="shortcut icon" href="/logo-min.png"/>
            </Head>
            <div className={styles.navbar}>
                <div>
                    <div style={{ cursor : 'pointer'}}><Link href="/"><img src="/logo.png" alt=""/></Link></div>
                    <div>
                    <ul>
                        <Link href="/"><li>หน้าหลัก</li></Link>
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