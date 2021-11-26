import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-lineto";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

const Drawing = () => {
  const [holding, setHolding] = useState(false);
  const [cooardinate, setcooardinate] = useState({ x: null, y: null });
  const [cooardinates, setCooardinates] = useState([]);
  const [allLines, setAllLines] = useState([]);

  const { x, y } = useMousePosition();

  const addToArray = () => {
    setCooardinates((cooardiantes) => [
      ...cooardinates,
      [cooardinate.x, cooardinate.y],
    ]);
    console.log(cooardinates);
  };

  useEffect(() => {
    if (holding) {
      let timer1 = setTimeout(() => {
        setcooardinate({ x: x, y: y });
        addToArray();
      }, 10);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [x, y]);

  return (
    <div
      onMouseDown={() => setHolding((e) => !e)}
      onMouseUp={() => setHolding(false)}
    >
      {cooardinates.map((element, idx, array) => {
        console.log("current", element);
        console.log("next", array[idx + 1]);
        if (array[idx + 1]) {
          return (
            <Line
              x0={element[0]}
              y0={element[1]}
              x1={array[idx + 1][0]}
              y1={array[idx + 1][1]}
              borderColor="black"
              borderWidth="60"
            />
          );
        } else {
          return;
        }
      })}
      {/* <Line
        x0={0}
        y0={0}
        x1={100}
        y1={100}
        
      /> */}
      <p>
        {x} and {y}
      </p>
      <p>{`Boolean Value: ${holding}`}</p>
      <p>
        {cooardinate.x} and {cooardinate.y}
      </p>
    </div>
  );
};

export default Drawing;
