import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './HeroList.module.css';
import { useNavigate } from 'react-router-dom';


const HeroList = () => {

    const [data, setData] = useState([]);
    const  [page,setPage] = useState(1);
    const navigate = useNavigate();

    async function getHero() {
        try {
            const response = await axios.get(`https://gametask-production.up.railway.app/api/heroes?page=${page}&limit=5`)
            console.log("AXIOS RESPONSE:", response)
            setData(response.data);
        } catch (error) {
            console.log('error load hero', error.response || error.message)
        }
    }

    async function deleteHero(id) {
        try {
            const res = await axios.delete(`https://gametask-production.up.railway.app/api/heroes/${id}`, {
                method: 'delete'
            })
        } catch (e) {
            console.log('error delete', e)
        }
    }


    useEffect(() => {
        getHero();
    }, [])

    useEffect(() => {
        getHero();
    }, [page])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Superheroes</h1>
                <button className={styles.createButton}
                onClick={()=> navigate(`/HeroCreate`)}
                >Create New</button>
            </div>

            <div className={styles.heroGrid}>
                {data.map(hero => (
                    <div key={hero._id} className={styles.heroCard}>
                        <img src={hero.images[0]} alt={hero.nickname} />
                        <h2>{hero.nickname}</h2>
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.button} ${styles.infoButton}`}
                                    onClick={() => navigate(`/HeroInfo/${hero._id}`)}
                            >Info</button>
                            <button className={`${styles.button} ${styles.editButton}`}
                                    onClick={() => navigate(`/HeroEdit/${hero._id}`)}
                            >Edit</button>
                            <button className={`${styles.button} ${styles.deleteButton}`}
                            onClick={()=> deleteHero(hero._id)}
                            >Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button className={styles.pageButton}
                onClick={()=>setPage((prev=> prev - 1))}
                >Prev</button>
                <span className={styles.pageNumber}>{page}</span>
                <button className={styles.pageButton}
                        onClick={()=>setPage((prev=> prev + 1))}
                >Next</button>
            </div>
        </div>
    );
};

export default HeroList;
