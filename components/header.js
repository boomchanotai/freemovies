import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

import { useState } from 'react';

import Autocomplete from 'react-autocomplete'

import movies from '../movie.json';

const Header = () => {

    const [value, setValue] = useState("");

    return(
        <div>
            <Head>
                <title>Thaiflix</title>
                <link rel="shortcut icon" href="/logo-min.png"/>
            </Head>
            <div className={styles.navbar}>
                <div>
                    <div>
                        <div style={{ cursor : 'pointer'}} onClick={() => window.location.href = "/"}><img src="/logo.png" alt=""/></div>
                        <div className={styles.nav}>
                            <ul>
                                <li onClick={() => window.location.href = "/"}>หน้าหลัก</li>
                                <li onClick={() => window.location.href = "/"}>ภาพยนตร์</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Autocomplete
                            items={movies.movie}
                            wrapperStyle={{
                                display: 'block',
                                width: '100%'
                            }}
                            shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.title}
                            renderItem={(item, highlighted) =>
                                <div
                                    key={item.title}
                                    style={{ backgroundColor: highlighted ? '#313131' : '#777777'}}
                                    className="searchItem"
                                >
                                    {item.title}
                                </div>
                            }
                            menuStyle={{
                                borderRadius: '0px',
                                boxShadow: '5px 5px 25px -10px rgba(0,0,0,0.5)',
                                background: 'none',
                                padding: '0',
                                fontSize: '0.9em',
                                position: 'fixed',
                                overflow: 'auto',
                                maxHeight: '50%',
                            }}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onSelect={(value, item) => {
                                setValue(value);
                                window.location.href = encodeURI("/movies/" + item.href)
                            }}
                            inputProps={{
                                placeholder : "Search | ค้นหา"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;