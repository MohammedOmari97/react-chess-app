import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { movePiece } from "../app/store";

export default function Piece({ piece, square, type, color, pieceId }) {
  const dispatch = useDispatch();
  const pieceSet = useSelector((state) => state.positions.pieceSet);
  const [{ isDragging }, drag] = useDrag({
    item: {
      name: piece,
      type: "piece",
      square,
      pieceType: type,
      color,
      pieceId,
    },
    end: (item, monitor) => {
      let result = monitor.getDropResult();
      if (item && result) {
        dispatch(
          movePiece(pieceId, result.squareName, result.move, result.castle)
        );
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  let opacity = isDragging ? 0 : 1;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(/images/${pieceSet}-${piece}.jpg)`,
        backgroundSize: "contain",
        opacity,
        transition: "all .2s ease",
      }}
      ref={drag}
    ></div>
  );
}
