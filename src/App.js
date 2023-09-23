import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";

function App() {
  return (
    <div id="App">
      <Router>
        <Routes>
          {/* Registration Route */}
          <Route
            path="/"
            element={<Registration />} // Render Registration component for /registration
          />
          {/* Updated Route */}
          <Route
            path="/main"
            element={<Main />} // Render Main component for the root path
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
