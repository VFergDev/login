import { Route, Routes, Link } from "react-router-dom";
import Registration from "./pages/Registration";
import Main from "./pages/Main";

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Register/Login</Link>
          </li>
          <li>
            <Link to="/main">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
