import { useState } from "react";
import "../styles/Board.css";
import { Board, Turn } from "../types/board";
import { motion } from "framer-motion";
import { TURNS, winningCombinations } from "../constants";

export default function Board() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<Turn>(TURNS.X);
  const [winner, setWinner] = useState<Turn | null>(null);
  const [tie, setTie] = useState<boolean>(false);

  const checkWinner = (board: Board) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  const handleClick = (index: number) => {
    if (board[index] || winner || tie) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    const validate = checkWinner(newBoard);
    const checkTie = newBoard.every((item) => item !== null);
    setTie(checkTie);
    if (validate) setWinner(validate);
    setBoard(newBoard);
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
  };
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setTie(false);
  };
  const varients = {
    add: {
      backgroundColor: "#9A60FF",
      color: "#fff",
      fontWeight: "500",
      scale: 1.05,
      opacity: 1,
    },
    even: {
      backgroundColor: "#FFFFFF",
      color: "#5C0DE6",
      fontWeight: "bold",
      scale: 1,
      rotate: 360,
      opacity: 1,
    },
  };
  const turnAnimation = {
    add: {
      backgroundColor: "#9A60FF",
      color: "#fff",
      scale: 1,
      rotate: 0,
    },
    even: {
      backgroundColor: "#FFFFFF",
      color: "#5C0DE6",
    },
    winner: {
      backgroundColor: "#000000",
      color: "#fff",
      x: 130,
      y: -200,
      scale: [4, 2],
      rotate: [180, 360],
    },
  };
  // console.log(board);
  return (
    <section>
      <h1 className="title">Board</h1>
      <motion.ul className="board">
        {board.map((item, index) => (
          <motion.li
            key={index}
            onClick={() => void handleClick(index)}
            variants={varients}
            animate={item ? "even" : "add"}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileHover={{ scale: item ? 1.0 : 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
      {}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <motion.div
          variants={turnAnimation}
          animate={winner || tie ? "winner" : turn === TURNS.X ? "even" : "add"}
          transition={{ duration: 0.5 }}
          className="turn"
          style={{ padding: "5px" }}
        >
          <h4>
            {tie ? "EMPATE" : !winner ? `Turn: ${turn}` : `Winner: ${winner}`}
          </h4>
        </motion.div>
        <motion.button
          style={{ marginLeft: "10px" }}
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Reset
        </motion.button>
      </div>
    </section>
  );
}
