import React from "react";

const numBars = 10;

const VolumeLevel = ({ volume }) => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ color: "#333", marginBottom: "8px" }}>
        <p>Volume Level:</p>
      </div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        {Array.from({ length: numBars }, (_, i) => (
          <div
            key={i}
            style={{
              width: "20px",
              height: "20px",
              margin: "2px",
              backgroundColor: i / numBars < volume ? "#3ef07c" : "#e0e0e0",
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
      <div style={{ color: "#333" }}>{volume}</div>
    </div>
  );
};

export default VolumeLevel;
