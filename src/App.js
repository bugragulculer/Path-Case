import { GameCard } from "./GameCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://www.cheapshark.com/api/1.0/games?title=batman&limit=60&exact=0"
      );
      setLoading(false);
      setList(result.data);
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="bg-slate-200 flex items-center justify-center p-4">
      <div className=" grid grid-cols-1 gap-4 p-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((e) => (
          <GameCard item={e} />
        ))}
      </div>
    </div>
  );
}

export default App;
