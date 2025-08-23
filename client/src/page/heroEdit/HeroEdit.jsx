import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HeroEdit.module.css";

const HeroEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hero, setHero] = useState({
        _id: "",
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: [],
        catch_phrase: "",
        images: []
    });

    const [newSuperpower, setNewSuperpower] = useState("");
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`http://localhost:5007/api/heroes/${id}`);
                setHero(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHero();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSuperpower = () => {
        if (newSuperpower.trim()) {
            setHero(prev => ({ ...prev, superpowers: [...prev.superpowers, newSuperpower.trim()] }));
            setNewSuperpower("");
        }
    };

    const handleDeleteSuperpower = (idx) => {
        setHero(prev => ({ ...prev, superpowers: prev.superpowers.filter((_, i) => i !== idx) }));
    };

    const handleFileChange = (e) => {
        setNewImages([...e.target.files]);
    };

    const handleDeleteImage = (idx) => {
        setHero(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("_id", hero._id);
            formData.append("nickname", hero.nickname);
            formData.append("real_name", hero.real_name);
            formData.append("origin_description", hero.origin_description);
            formData.append("catch_phrase", hero.catch_phrase);
            formData.append("superpowers", JSON.stringify(hero.superpowers));


            newImages.forEach(file => formData.append("file", file));


            await axios.put("http://localhost:5007/api/heroes", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Hero updated!");
            navigate(`/HeroInfo/${hero._id}`);
        } catch (error) {
            console.log(error);
            alert("Error updating hero");
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1>Edit Hero</h1>

            <div className={styles.formGroup}>
                <label>Nickname:</label>
                <input name="nickname" value={hero.nickname} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
                <label>Real Name:</label>
                <input name="real_name" value={hero.real_name} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
                <label>Origin Description:</label>
                <textarea name="origin_description" value={hero.origin_description} onChange={handleChange}></textarea>
            </div>

            <div className={styles.formGroup}>
                <label>Catch Phrase:</label>
                <input name="catch_phrase" value={hero.catch_phrase} onChange={handleChange} />
            </div>


            <div className={styles.formGroup}>
                <label>Superpowers:</label>
                <div className={styles.superpowers}>
                    {hero.superpowers.map((sp, idx) => (
                        <span key={idx} className={styles.superpower}>
              {sp}
                            <button type="button" onClick={() => handleDeleteSuperpower(idx)}>✕</button>
            </span>
                    ))}
                </div>
                <input style={{marginBottom: '8px'}} value={newSuperpower} onChange={(e) => setNewSuperpower(e.target.value)} />
                <button style={{borderWidth: 'solid 3px blue',borderRadius: '8px',minHeight: '35px'}} onClick={handleAddSuperpower} >Add</button>
            </div>


            <div className={styles.formGroup}>
                <label>Images:</label>
                <div className={styles.imageContainer}>
                    {hero.images.map((img, idx) => (
                        <div key={idx} className={styles.imageWrapper}>
                            <img src={img} alt={hero.nickname} className={styles.heroImage} />
                            <button type="button" onClick={() => handleDeleteImage(idx)}>✕</button>
                        </div>
                    ))}
                </div>
                <input type="file" multiple onChange={handleFileChange} />
            </div>

            <button onClick={handleUpdate} className={styles.updateButton}>Update Hero</button>
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

export default HeroEdit;
