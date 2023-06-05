import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      console.log("inside dashboard");
      const response = await fetch("http://localhost:3000/api/v1/isAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
      if (json.Success === false) {
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <>Dashboard</>;
};

export default Dashboard;
