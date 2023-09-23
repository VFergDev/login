import React, { useEffect, useState } from "react";
import Axios from "axios";
import NormalUser from "../roles/NormalUser";
import Mod from "../roles/Mod";
import Admin from "../roles/Admin";

Axios.defaults.withCredentials = true;

const Main = () => {
  const [role, setRole] = useState("visitor");
  const [loading, setLoading] = useState(true);

  

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
      {role === "visitor" && <NormalUser />}
      {role === "mod" && <Mod />}
      {role === "admin" && <Admin />}
    </div>
  );
};

export default Main;
