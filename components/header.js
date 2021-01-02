import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

import { useState } from 'react';

import Autocomplete from 'react-autocomplete'

import Router from 'next/router'

const Header = ({ movielist }) => {

    const [value, setValue] = useState("");

    return(
        <div>
            <Head>
                <title>Thaiflix</title>
                <link rel="shortcut icon" href="/logo-min.png"/>
            </Head>
            <div className={styles.navbar}>
                <div>
                    <div style={{ cursor : 'pointer'}} onClick={() => window.location.href = "/"}><img src="/logo.png" alt=""/></div>
                    <div>
                    <ul>
                        <li onClick={() => window.location.href = "/"}>หน้าหลัก</li>
                        <li>รายการทีวี</li>
                        <li>ภาพยนตร์</li>
                        <li>มาใหม่และกำลังฮิต</li>
                        <li>รายการของฉัน</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className={styles.searchbar}>
                <Autocomplete
                    items={movielist}
                    shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.title}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.title}
                            style={{ backgroundColor: highlighted ? '#000000' : '#777777'}}
                            className="searchItem"
                        >
                            {item.title}
                        </div>
                    }
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onSelect={value => setValue(value)}
                />
            </div>
        </div>
    )
}

export default Header;