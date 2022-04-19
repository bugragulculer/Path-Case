import axios from "axios";
import React, { useState, useEffect } from "react";

export const GameCard = ({ item }) => {
  const [game, setGame] = useState();
  const [deal, setDeal] = useState();

  useEffect(() => {
    const fetchGame = async () => {
      const result = await axios(
        `https://www.cheapshark.com/api/1.0/games?id=${item.gameID}`
      );
      setGame(result.data);
    };
    const fetchDeal = async () => {
      const result = await axios(
        `https://www.cheapshark.com/api/1.0/deals?id=${item.cheapestDealID}`
      );
      setDeal(result.data);
    };

    fetchGame();
    fetchDeal();
  }, [item]);

  return (
    <div className="bg-white rounded-2xl h-[216] w-360 max-w-sm" key={item}>
      <img
        src={game?.info.thumb}
        className="h-52	w-full object-cover rounded-t-2xl"
        alt="game__cover"
      />
      <div className="p-6 py-7 relative h-full">
        <h2 className="text-2xl mb-4">{item.external}</h2>
        <div className="flex gap-2 items-center">
          <p className="text-3xl">${deal?.gameInfo.salePrice}</p>
          <p className="text-xl text-red-600 line-through">
            ${deal?.gameInfo.retailPrice}
          </p>
        </div>
        <div className="absolute -top-12 left-12  z-10 bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
          %
          {parseInt(
            ((deal?.gameInfo.retailPrice - deal?.gameInfo.salePrice) * 100) /
              deal?.gameInfo.retailPrice
          )}
        </div>
        <div className="absolute -top-8 -left-1 bg-red-900 text-white text-xs w-16 h-16 flex items-center justify-center text-center rounded-full">
          highest ever %
          {parseInt(
            ((deal?.gameInfo.retailPrice - deal?.cheapestPrice.price) * 100) /
              deal?.gameInfo.retailPrice
          )}
        </div>
      </div>
    </div>
  );
};
