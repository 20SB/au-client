import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function LinkedInAutomation() {
  const [status, setStatus] = useState("");
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    // Listen for status updates
    socket.on("status", (newStatus) => {
      setStatus(newStatus);
    });

    // Listen for new screenshots
    socket.on("screenshot", (newScreenshot) => {
      setScreenshots((prevScreenshots) => [...prevScreenshots, newScreenshot]);
    });

    return () => {
      socket.off("status");
      socket.off("screenshot");
    };
  }, []);

  const startAutomation = async () => {
    try {
      await fetch("http://localhost:3001/start-linkedin-update", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error starting automation:", error);
    }
  };

  // console.log("screenshots", screenshots);

  return (
    <div>
      <h1>LinkedIn Profile Automation</h1>
      <button onClick={startAutomation}>Start LinkedIn Automation</button>
      <p>Status: {status}</p>
      <div>
        <h2>Screenshots</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              style={{ width: "300px", border: "1px solid #ccc" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinkedInAutomation;
