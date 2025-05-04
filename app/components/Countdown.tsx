"use client";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialSeconds = 600, onExpire }: { initialSeconds: number; onExpire: () => void }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire(); 
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <span className="countdown font-mono text-xs">
      <span style={{ "--value": hours } as React.CSSProperties}>{hours}</span>:
      <span style={{ "--value": minutes } as React.CSSProperties}>{minutes}</span>:
      <span style={{ "--value": seconds } as React.CSSProperties}>{seconds}</span>
    </span>
  );
};

export default CountdownTimer;
