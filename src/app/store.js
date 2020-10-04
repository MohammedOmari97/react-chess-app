import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import * as Chess from "chess.js";

export let game = new Chess();
console.log(game.turn());
// console.log(game);

const initialPosition = [
  {
    piece: "pawn-white",
    id: 1,
    square: "a2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 2,
    square: "b2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 3,
    square: "c2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 4,
    square: "d2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 5,
    square: "e2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 6,
    square: "f2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 7,
    square: "g2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-white",
    id: 8,
    square: "h2",
    type: "pawn",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "queen-white",
    id: 1,
    square: "d1",
    type: "queen",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "king-white",
    id: 1,
    square: "e1",
    type: "king",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "rook-white",
    id: 1,
    square: "a1",
    type: "rook",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "rook-white",
    id: 2,
    square: "h1",
    type: "rook",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "bishop-white",
    id: 1,
    square: "c1",
    type: "bishop",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "bishop-white",
    id: 2,
    square: "f1",
    type: "bishop",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "knight-white",
    id: 1,
    square: "b1",
    type: "knight",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "knight-white",
    id: 2,
    square: "g1",
    type: "knight",
    color: "white",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 1,
    square: "a7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 2,
    square: "b7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 3,
    square: "c7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 4,
    square: "d7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 5,
    square: "e7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 6,
    square: "f7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 7,
    square: "g7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "pawn-black",
    id: 8,
    square: "h7",
    type: "pawn",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "queen-black",
    id: 1,
    square: "d8",
    type: "queen",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "king-black",
    id: 1,
    square: "e8",
    type: "king",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "rook-black",
    id: 1,
    square: "a8",
    type: "rook",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "rook-black",
    id: 2,
    square: "h8",
    type: "rook",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "bishop-black",
    id: 1,
    square: "c8",
    type: "bishop",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "bishop-black",
    id: 2,
    square: "f8",
    type: "bishop",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "knight-black",
    id: 1,
    square: "b8",
    type: "knight",
    color: "black",
    pieceId: nanoid(),
  },
  {
    piece: "knight-black",
    id: 2,
    square: "g8",
    type: "knight",
    color: "black",
    pieceId: nanoid(),
  },
];

const positions = createSlice({
  name: "positions",
  initialState: {
    allPositions: initialPosition,
    boardTheme: "bg1",
    pieceSet: "bases",
  },
  reducers: {
    movePiece: {
      reducer(state, action) {
        game.move(action.payload.move);
        // console.log(game.ascii());
        // Castling moves for black and white
        if (action.payload.castle === "WKS") {
          state.allPositions = state.allPositions.map((position) => {
            if (position.square === "e1") {
              return { ...position, square: "g1" };
            } else if (position.square === "h1") {
              return { ...position, square: "f1" };
            } else return position;
          });
          return state;
        } else if (action.payload.castle === "WQS") {
          state.allPositions = state.allPositions.map((position) => {
            if (position.square === "e1") {
              return { ...position, square: "c1" };
            } else if (position.square === "a1") {
              return { ...position, square: "d1" };
            } else return position;
          });
          return state;
        } else if (action.payload.castle === "BKS") {
          state.allPositions = state.allPositions.map((position) => {
            if (position.square === "e8") {
              return { ...position, square: "g8" };
            } else if (position.square === "h8") {
              return { ...position, square: "f8" };
            } else return position;
          });
          return state;
        } else if (action.payload.castle === "BQS") {
          state.allPositions = state.allPositions.map((position) => {
            if (position.square === "e8") {
              return { ...position, square: "c8" };
            } else if (position.square === "a8") {
              return { ...position, square: "d8" };
            } else return position;
          });
          return state;
        }

        // Taking moves
        if (action.payload.move.includes("x")) {
          let target = state.allPositions.find(
            (position) => position.square === action.payload.square
          );
          if (!target) {
            if (game.turn() === "b") {
              let target = `${action.payload.square[0]}${
                Number(action.payload.square[1]) - 1
              }`;
              console.log(target);
              state.allPositions = state.allPositions.map((position) => {
                if (position.square === target) {
                  return { ...position, square: "" };
                } else return position;
              });
            } else {
              let target = `${action.payload.square[0]}${
                Number(action.payload.square[1]) + 1
              }`;
              console.log(target);
              state.allPositions = state.allPositions.map((position) => {
                if (position.square === target) {
                  return { ...position, square: "" };
                } else return position;
              });
            }
          } else {
            state.allPositions = state.allPositions.map((position) => {
              if (position.square === action.payload.square) {
                return { ...position, square: "" };
              } else return position;
            });
          }
        }

        if (action.payload.move.includes("=")) {
          state.allPositions = state.allPositions.map((position) => {
            if (action.payload.pieceId === position.pieceId) {
              return {
                ...position,
                square: action.payload.square,
                piece: `queen-${position.color}`,
                type: "queen",
              };
            } else return position;
          });
        } else {
          // Normal moves
          state.allPositions = state.allPositions.map((position) => {
            if (action.payload.pieceId === position.pieceId) {
              return { ...position, square: action.payload.square };
            } else return position;
          });
        }

        return state;
      },
      prepare(pieceId, square, move, castle) {
        return { payload: { pieceId, square, move, castle } };
      },
    },
    resetBoard: {
      reducer(state) {
        game = new Chess();
        state.allPositions = initialPosition;
        return state;
      },
    },
    changePieceSet: {
      reducer(state, action) {
        state.pieceSet = action.payload.pieceSet;
      },
      prepare(pieceSet) {
        return { payload: { pieceSet } };
      },
    },
    changeBoardTheme: {
      reducer(state, action) {
        state.boardTheme = action.payload.boardTheme;
      },
      prepare(boardTheme) {
        return { payload: { boardTheme } };
      },
    },
    loadBoard: {
      reducer(state, action) {
        // game.load(action.payload.FEN);
        // let board = game.board();
      },
      prepare(board) {
        return { payload: { board } };
      },
    },
  },
});

const status = createSlice({
  name: "status",
  initialState: {
    gameOver: false,
    winner: undefined,
    whiteScore: 0,
    blackScore: 0,
    checkmate: false,
    stalemate: false,
    threeFoldRepetition: false,
    insufficientMaterial: false,
    isPlaying: false,
  },
  reducers: {
    gameOver: {
      reducer(state, action) {
        if (action.payload.status === "timeOut") {
          return {
            ...state,
            gameOver: true,
            winner: action.payload.winner,
            timeOut: true,
            isPlaying: false,
            whiteScore:
              action.payload.winner === "white"
                ? state.whiteScore + 1
                : state.whiteScore,
            blackScore:
              action.payload.winner === "black"
                ? state.blackScore + 1
                : state.blackScore,
          };
        } else if (game.in_checkmate()) {
          let loser = game.turn();
          return {
            ...state,
            gameOver: true,
            winner: loser === "w" ? "black" : "white",
            isPlaying: false,
            whiteScore: loser === "w" ? state.whiteScore : state.whiteScore + 1,
            blackScore: loser === "b" ? state.blackScore : state.blackScore + 1,
            checkmate: true,
          };
        } else if (game.in_stalemate()) {
          return {
            ...state,
            gameOver: true,
            isPlaying: false,
            whiteScore: state.whiteScore + 0.5,
            blackScore: state.blackScore + 0.5,
            stalemate: true,
          };
        } else if (game.in_threefold_repetition()) {
          return {
            ...state,
            gameOver: true,
            isPlaying: false,
            whiteScore: state.whiteScore + 0.5,
            blackScore: state.blackScore + 0.5,
            threeFoldRepetition: true,
          };
        } else if (game.insufficient_material()) {
          return {
            ...state,
            gameOver: true,
            isPlaying: false,
            whiteScore: state.whiteScore + 0.5,
            blackScore: state.blackScore + 0.5,
            insufficientMaterial: true,
          };
        }
      },
      prepare(status, winner) {
        return { payload: { status, winner } };
      },
    },
    startPlaying: {
      reducer(state) {
        return { ...state, isPlaying: true };
      },
    },
    resetScores: {
      reducer(state) {
        return { ...state, whiteScore: 0, blackScore: 0 };
      },
    },
    reset: {
      reducer(state) {
        return {
          ...state,
          gameOver: false,
          winner: undefined,
          checkmate: false,
          stalemate: false,
          threeFoldRepetition: false,
          insufficientMaterial: false,
          timeOut: false,
          isPlaying: false,
        };
      },
    },
  },
});

// export the actions from the slices
export const {
  movePiece,
  takePiece,
  changePieceSet,
  changeBoardTheme,
  resetBoard,
} = positions.actions;

export const { gameOver, reset, startPlaying, resetScores } = status.actions;

// export the the store containing all the slices reducers
export default configureStore({
  reducer: {
    positions: positions.reducer,
    status: status.reducer,
  },
});
