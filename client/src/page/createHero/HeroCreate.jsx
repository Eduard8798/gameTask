import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./HeroCreate.module.css";

const HeroCreate = () => {
    const navigate = useNavigate();
    const [hero, setHero] = useState({
        nickname: "",
        real_name: "",
        origin_description: "",
        catch_phrase: "",
        superpowers: []
    });

    const [newSuperpower, setNewSuperpower] = useState("");
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSuperpower = () => {
        if (newSuperpower.trim()) {
            setHero((prev) => ({
                ...prev,
                superpowers: [...prev.superpowers, newSuperpower.trim()]
            }));
            setNewSuperpower("");
        }
    };

    const handleDeleteSuperpower = (idx) => {
        setHero((prev) => ({
            ...prev,
            superpowers: prev.superpowers.filter((_, i) => i !== idx)
        }));
    };

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nickname", hero.nickname);
            formData.append("real_name", hero.real_name);
            formData.append("origin_description", hero.origin_description);
            formData.append("catch_phrase", hero.catch_phrase);
            formData.append("superpowers", JSON.stringify(hero.superpowers));

            for (let img of images) {
                formData.append("images", img);
            }

            await axios.post("http://localhost:5007/api/heroes", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Hero created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating hero:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Create New Superhero</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Nickname:</label>
                    <input type="text" name="nickname" value={hero.nickname} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Real Name:</label>
                    <input type="text" name="real_name" value={hero.real_name} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label>Origin Description:</label>
                    <textarea name="origin_description" value={hero.origin_description} onChange={handleChange}></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label>Catch Phrase:</label>
                    <input type="text" name="catch_phrase" value={hero.catch_phrase} onChange={handleChange} />
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
                    <input style={{marginBottom:'15px'}} type="text" value={newSuperpower} onChange={(e) => setNewSuperpower(e.target.value)} />
                    <button type="button" onClick={handleAddSuperpower} className={styles.addButton }>Add</button>
                </div>


                <div className={styles.formGroup}>
                    <label>Upload Images:</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>

                <button type="submit" className={styles.submitButton}
                        onClick={() => navigate("/")}
                >Create Hero</button>
                <button
                    className={styles.backButton}
                    onClick={() => navigate("/")}
                    style={{ marginLeft: "10px" }}
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default HeroCreate;
