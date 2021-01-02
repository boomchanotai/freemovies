import Router from 'next/router';
import Header from '../../components/header';

import styles from '../../styles/Home.module.css'

const Movies = ({ URL, name, synopsis }) => {

    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.containerVideo}>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={URL}
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
                    <h1>{ name }</h1>
                    <div style={{ textIndent : '1.8em' }}>{ synopsis }</div>
                </div>
            </div>
        </div>
    )
    
}

Movies.getInitialProps = async ({ query }) => {
    const axios = await import('axios');
    // const data = await axios.post("http://localhost:4000/api/get_video", {
    const data = await axios.post("https://freemovies.centos.vercel.app/api/get_video", {
            movie: query.id
        })
        .catch(err => console.error(err))
    
    return { 
        URL : (data) ? data.data.src : null,
        name : (data) ? data.data.title : null,
        synopsis : (data) ? data.data.synopsis : null,
    }
    
}

export default Movies;