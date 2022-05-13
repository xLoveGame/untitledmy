import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GoogleMap from './GoogleMap';
import Header from "./Header/Header";
import PolicePoint from "./Police/PolicePoint";

function App() {

    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path="/" element={<GoogleMap/>}></Route>
                <Route path="/police" element = {<PolicePoint/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;