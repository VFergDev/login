import React, { useEffect, useState } from "react";
import Axios from "axios";
import NormalUser from "../components/NormalUser";
import Mod from "../components/Mod";
import Admin from "../components/Admin";

const Main = () => {
  const [role, setRole] = useState("visitor");
  const [loading, setLoading] = useState(true);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setRole(response.data.user[0].role);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {role == "visitor" && <NormalUser />}
      {role == "mod" && <Mod />}
      {role == "admin" && <Admin />}
    </div>
  );
};

export default Main;
