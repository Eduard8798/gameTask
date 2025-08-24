import React from 'react';
import './main.css'
import HeroList from "./page/heroList/HeroList.jsx";
import HeroInfo from "./page/heroInfo/HeroInfo.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import HeroEdit from "./page/heroEdit/HeroEdit.jsx";
import HeroCreate from "./page/createHero/HeroCreate.jsx";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HeroList />} />
                <Route path="/HeroInfo/:id" element={<HeroInfo />} />
                <Route path="/HeroEdit/:id" element={<HeroEdit />} />
                <Route path="/HeroCreate" element={<HeroCreate />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
