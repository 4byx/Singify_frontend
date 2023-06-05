import { useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, downloadUrl, image } = props;
  console.log(image);
  const [songImageUrl, setSongImageUrl] = useState(
    image[image.length - 1].link
  );
  const [songdownloadUrl, setSongDownloadUrl] = useState(
    downloadUrl[downloadUrl.length - 1].link
  );
  return (
    <>
      <div>
        <img src={songImageUrl} alt="" />
        <h1>{name}</h1>
        <Link to={songdownloadUrl}>
          <button>Download</button>
        </Link>
      </div>
    </>
  );
};

export default Card;
