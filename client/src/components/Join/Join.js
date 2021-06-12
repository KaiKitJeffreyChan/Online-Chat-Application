import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuter">
      <div className="joinInner">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {/* have margin top 20 VVVV*/}
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        {/* //how am i accessing the name */}
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          {/* have margin top 20 VVVV*/}
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
