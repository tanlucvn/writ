"use client";

import { useEffect, useState } from "react";

const WritesList = () => {
  const [writes, setWrites] = useState<any[]>([]);

  useEffect(() => {
    const loadWrites = async () => {
      const res = await fetch("/api/writes");
      const data = await res.json();
      setWrites(data);
    };

    loadWrites();
  }, []);

  return (
    <div>
      <h1>Writes List</h1>
      {writes.length > 0 ? (
        <ul>
          {writes.map((write) => (
            <li key={write.id}>
              <h3>{write.title}</h3>
              <p>{write.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No writes available</p>
      )}
    </div>
  );
};

export default WritesList;
