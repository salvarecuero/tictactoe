import React from "react";

function Result({ winner }) {
  return (
    <>
      <h3>{winner ? `The winner is ${winner}` : `It's a draw :(`} </h3>
    </>
  );
}

export default Result;
