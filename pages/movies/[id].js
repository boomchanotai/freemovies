import Router from 'next/router';
import Header from '../../components/header';

import { useState, useEffect } from 'react';

import styles from '../../styles/Home.module.css'

const Movies = ({ id }) => {

    const [movie, setMovie] = useState(null)

    useEffect(async () => {
        
        const axios = await import('axios');
        
        const data = await axios.post("http://localhost:4000/api/get_video", { movie: id }).catch(err => console.error(err))
        
        setMovie(data.data);
    }, [])

    if (movie === null) {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.loading}>
                    <div className="loadingio-spinner-dual-ring-lk26u54o6kf">
                        <div className="ldio-zzwp2dk7lus">
                            <div></div>
                            <div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className={styles.container}>
                <Header />
                <div className={styles.containerVideo}>
                    <div className={styles.videoWrapper}>
                        <iframe
                            src={movie.src}
                            scrolling="no"
                            frameBorder="0"
                            width="80%"
                            height="430px"
                            allowFullScreen
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true">
                        </iframe>
                    </div>
                    <div>
                        <h1>{ movie.name }</h1>
                        <div style={{ textIndent : '1.8em' }}>{ movie.synopsis }</div>
                    </div>
                </div>
            </div>
        )
    }
    
    
}

Movies.getInitialProps = async ({ query }) => {
    
    return {
        id : query.id
    }
    
}

export default Movies;