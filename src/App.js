import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import Main from './pages/Main';

const App = () => {
    return <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/main" element={<Main />} />
    </Routes>
}

export default App;
