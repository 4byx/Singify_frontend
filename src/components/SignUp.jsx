import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      if (json.Success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signUp",
        formData
      );
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/signIn");

      //   const resdata = await response.json();
      console.log(response.data);
    } catch (error) {
      console.log("axios log ", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <label className="" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div className="">
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            className=""
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <div className="">
          <label className="" htmlFor="username">
            Email
          </label>
          <input
            className=""
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
        </div>
        <div className="">
          <button className="" type="submit">
            Sign Up
          </button>
          <Link to="/signIn" className="" href="#">
            Already have an account ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
