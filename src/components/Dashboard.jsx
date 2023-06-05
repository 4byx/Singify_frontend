import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const url =
      "https://saavn.me/search/songs?query=kun+faya+kun&page=1&limit=2";
    const data = await fetch(
      "https://saavn.me/search/songs?query=kun+faya+kun&page=1&limit=2"
    );
    const json = await data.json();
    setSongs(json?.data?.results);
    console.log(json?.data?.results);
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {songs.map((song) => {
        // console.log(song);
        return <Card key={song.id} {...song} />;
      })}
    </>
  );
};

export default Dashboard;
