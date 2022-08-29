import React, { useState } from "react";

export const CardgameContainer = () => {
  // total 56 cards.
  const cards = [
    "A",
    "K",
    "Q",
    "J",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1"
  ];
  const suits = ["spades", "hearts", "diamonds", "clubs"];
  const sortedCards = suits
    .map((item) => {
      return cards
        .map((num: any) => ({
          card: num,
          value:
            num === "A"
              ? 4
              : num === "K"
              ? 3
              : num === "Q"
              ? 2
              : num === "J"
              ? 1
              : 0,
          type: item
        }))
        .flat();
    })
    .flat();

  const [northPoints, setNorthPoints] = useState(0);
  const [eastPoints, setEastPoints] = useState(0);
  const [southPoints, setSouthPoints] = useState(0);
  const [westPoints, setWestPoints] = useState(0);

  const [activePlayer, setActivePlayer] = React.useState(-1);
  const [allCards, resetCards] = React.useState(sortedCards);

  const onDeckClick = () => {
    if (allCards?.length > 0) {
      const updatedActivePLayer = activePlayer < 3 ? activePlayer + 1 : 0;
      console.log(updatedActivePLayer, allCards.length, allCards[0].value);
      updatedActivePLayer === 0
        ? setNorthPoints(northPoints + allCards[0].value)
        : updatedActivePLayer === 1
        ? setEastPoints(eastPoints + allCards[0].value)
        : updatedActivePLayer === 2
        ? setSouthPoints(southPoints + allCards[0].value)
        : setWestPoints(westPoints + allCards[0].value);

      setActivePlayer(updatedActivePLayer);
      allCards.shift();
    } else {
      alert("all cards have been shared across N, E, S, W");
    }
  };

  const reset = () => {
    resetCards(sortedCards);
    setEastPoints(0);
    setNorthPoints(0);
    setWestPoints(0);
    setSouthPoints(0);
    setActivePlayer(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div
          id="north"
          className={`box1 ${
            activePlayer === 0 ? "activePlayerBackground" : ""
          }`}
        >
          NORTH
          <p>{northPoints}</p>
        </div>
      </div>
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          id="west"
          className={`box2 ${
            activePlayer === 3 ? "activePlayerBackground" : ""
          }`}
        >
          WEST
          <p>{westPoints}</p>
        </div>
        <div id="card-deck" className="box4" onClick={onDeckClick}>
          <div className="Logo">
            <p className="unselect">Cards left : {allCards?.length}</p>
          </div>
        </div>
        <div
          id="east"
          className={`box3 ${
            activePlayer === 1 ? "activePlayerBackground" : ""
          }`}
        >
          EAST
          <p>{eastPoints}</p>
        </div>
      </div>
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          id="south"
          className={`box1 ${
            activePlayer === 2 ? "activePlayerBackground" : ""
          }`}
        >
          SOUTH
          <p>{southPoints}</p>
        </div>
      </div>
      <div className="footer">
        <button className="button button2" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};
