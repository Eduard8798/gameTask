import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HeroInfo.module.css";

const HeroInfo = () => {
    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`https://gametask-production.up.railway.app/api/heroes/${id}`);
                setHero(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!hero) return <div>Hero not found</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.nickname}>{hero.nickname}</h1>
            <p><strong>Real Name:</strong> {hero.real_name}</p>
            <p><strong>Origin:</strong> {hero.origin_description}</p>
            <p><strong>Superpowers:</strong> {hero.superpowers?.join(", ")}</p>
            <p><strong>Catchphrase:</strong> {hero.catch_phrase}</p>

            <div className={styles.imagesWrapper}>
                {hero.images?.map((img, idx) => (
                    <img key={idx} src={img} alt={hero.nickname} className={styles.heroImage} />
                ))}
            </div>

            <button
                className={styles.updateButton}
                onClick={() => navigate(`/HeroEdit/${id}`)}
            >
                Update
            </button>
            <button
                className={styles.backButton}
                onClick={() => navigate("/")}
                style={{ marginLeft: "10px" }}
            >
                Back
            </button>
        </div>
    );
};

export default HeroInfo;
