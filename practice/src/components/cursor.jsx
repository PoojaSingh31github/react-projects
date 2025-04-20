import React, { useEffect, useState } from "react";

export const CursorMoveComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX +50,
      y: event.clientY +50,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursorStyle = {
    position: "fixed",
    top: position.y,
    left: position.x,
    width: "20px",
    height: "20px",
    backgroundColor: "yellow",
    borderRadius: "50%",
    pointerEvents: "none", // So it doesn't interfere with other elements
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  return (
    <>
      <div style={cursorStyle}></div>
      <h1>Move your cursor around!</h1>
    </>
  );
};



export const SnakeCursor = () => {
  const TRAIL_LENGTH = 10;
  const [trail, setTrail] = useState(
    new Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = [...trail];
      newTrail[0] = { x: e.clientX, y: e.clientY };

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        newTrail[i] = {
          x: newTrail[i - 1].x * 0.9 + newTrail[i].x * 0.1,
          y: newTrail[i - 1].y * 0.9 + newTrail[i].y * 0.1,
        };
      }

      setTrail(newTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trail]);

  return (
    <>
      {trail.map((dot, index) => (
        <div
          key={index}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            width: `${10 + index}px`,
            height: `${10 + index}px`,
            backgroundColor: "limegreen",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.8 - index * 0.07,
          }}
        />
      ))}
    </>
  );
};



export const SnakeCursor2 = () => {
  const TRAIL_LENGTH = 12;
  const [trail, setTrail] = useState(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = [...trail];
      newTrail[0] = { x: e.clientX, y: e.clientY };

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        newTrail[i] = {
          x: newTrail[i - 1].x * 0.9 + newTrail[i].x * 0.1,
          y: newTrail[i - 1].y * 0.9 + newTrail[i].y * 0.1,
        };
      }

      setTrail(newTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trail]);

  return (
    <>
      {trail.map((dot, index) => (
        <div
          key={index}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            width: `${8 + index * 1.2}px`,
            height: `${8 + index * 1.2}px`,
            backgroundColor: "#3f3fff",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 1000,
            opacity: 0.9 - index * 0.06,
            transition: "left 0.02s linear, top 0.02s linear",
          }}
        />
      ))}
    </>
  );
};



