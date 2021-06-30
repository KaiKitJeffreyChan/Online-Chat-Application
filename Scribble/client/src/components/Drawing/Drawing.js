import { useState, useEffect } from "react";

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
  const [cooardinate, setcooardinate] = useState({ x: 0, y: 0 });
  const [cooardinates, setCooardinates] = useState([]);
  const delay = 1;
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
      let timer1 = setTimeout(() => setcooardinate({ x: x, y: y }), delay * 10);
      addToArray();
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
