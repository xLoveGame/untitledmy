import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GoogleMap from './GoogleMap';
import Header from "./Header/Header";

function App() {

    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path="/" element={<GoogleMap/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;