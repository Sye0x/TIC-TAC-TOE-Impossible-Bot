import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

// PlayerVbot component represents a Tic-Tac-Toe game where a player competes against a bot
const PlayerVbot = () => {
  // This is a Tic-Tac-Toe game where a player competes against a bot. The game allows the player to choose between "X" or "O" at the beginning.
  // The grid consists of 9 cells arranged in 3x3 rows, where the player and bot take turns to place their respective symbols.
  // The game utilizes a minimax algorithm to determine the optimal move for the bot, and checks after each move if there is a winner or a draw.
  // The state of the game is stored in a 2D array (grid), and the game's progress is tracked using the "turn" (which player is making the move),
  // "winner" (who won the game or if it's a draw), and "xScore" and "oScore" (keeping track of scores for both players). The game also displays
  // a modal for the player to pick their symbol at the start, and a modal at the end to show the result (win or draw). After each game,
  // the user can reset the board to play again. The bot's move is determined by the minimax algorithm, which evaluates all possible moves
  // and chooses the one that maximizes the bot's chances of winning while minimizing the player's chances. The component is modular, with functions
  // like `minmax`, `Botmove`, `checkWinner`, and `handlePress` handling the game logic, AI move decisions, and user interactions. The design
  // includes a simple UI with a responsive grid, score display, and intuitive player vs. bot gameplay.

  const navigation = useNavigation<any>();

  // State variables to track the game status
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [start, setStart] = useState(true); // Controls the start screen visibility
  const [player, setPlayer] = useState(""); // Tracks the selected player symbol
  const [turn, setTurn] = useState("X"); // Tracks whose turn it is (X or O)
  const [winner, setWinner] = useState<string | null>(null); // Tracks the winner ("X", "O", or "Draw")
  const [xScrore, setScorex] = useState(0); // Score for player X
  const [oScrore, setScoreo] = useState(0); // Score for player O

  // Minimax algorithm for determining the best move for the bot
  function minmax(grid: string[][], depth: any, maximizing: any) {
    let result = checkWinner(grid);
    if (result !== null) {
      if (result == "Draw") {
        return 0;
      } else if (result == turn) {
        return 1;
      } else {
        return -1;
      }
    }
    if (maximizing) {
      let bestScore = -Infinity;

      // Try every possible move for the bot
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] == "") {
            grid[i][j] = turn;
            let score = minmax(grid, depth + 1, false); // Recursively call minmax for the opponent's turn
            grid[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      // Try every possible move for the player
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] == "") {
            grid[i][j] = player;
            let score = minmax(grid, depth + 1, true); // Recursively call minmax for the bot's turn
            grid[i][j] = "";
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  }

  // Bot makes its move based on the best available option
  const Botmove = (grid: string[][]) => {
    let row = -1;
    let col = -1;
    let bestScore = -Infinity;

    // Evaluate all possible moves for the bot and choose the best one
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === "") {
          grid[i][j] = turn;
          const score = minmax(grid, 0, false); // Get the score for the current move
          grid[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            row = i;
            col = j;
          }
        }
      }
    }

    // If there are no available moves or a winner exists, stop
    if (row === -1 || col === -1 || winner) return;

    // Update the grid with the bot's move
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[row][col] = turn;

      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
        if (gameWinner === "X") setScorex((prev) => prev + 1); // Increment score for player X
        if (gameWinner === "O") setScoreo((prev) => prev + 1); // Increment score for player O
      } else {
        setTurn((prev) => (prev === "X" ? "O" : "X")); // Switch turn
      }

      return newGrid;
    });
  };

  // Trigger bot's move whenever it's the bot's turn
  useEffect(() => {
    if (
      (turn === "X" && !winner && player === "O") ||
      (turn === "O" && !winner && player === "X")
    ) {
      Botmove(grid);
    }
  }, [grid, turn, winner, player]);

  // Set the player's symbol and start the game
  const setGame = (value: any) => {
    setStart(false);
    setPlayer(value);
  };

  // Check for a winner or draw condition
  const checkWinner = (grid: string[][]) => {
    const lines = [
      // Horizontal, vertical, and diagonal win conditions
      [grid[0][0], grid[0][1], grid[0][2]],
      [grid[1][0], grid[1][1], grid[1][2]],
      [grid[2][0], grid[2][1], grid[2][2]],
      [grid[0][0], grid[1][0], grid[2][0]],
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[0][2], grid[1][1], grid[2][0]],
    ];

    // Check if any line has three matching symbols
    for (const line of lines) {
      if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }

    // Check if all cells are filled, resulting in a draw
    if (grid.every((row) => row.every((cell) => cell !== ""))) {
      return "Draw";
    }

    return null;
  };

  // Handle player input on cell press
  const handlePress = (row: number, col: number) => {
    if (grid[row][col] !== "" || winner) return; // Ignore if cell is already filled or game has ended

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[row][col] = turn;

      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        if (turn === "X") {
          setTurn("O"); // Switch turn to O
        } else {
          setTurn("X"); // Switch turn to X
        }
      }

      return newGrid;
    });
  };

  // Reset the game to its initial state
  const resetGame = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurn("X");
    setWinner(null);
  };

  return (
    <View style={styles.bg}>
      {start && (
        // Modal to let the player choose X or O at the start
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!start}
          onRequestClose={resetGame} // Close the modal on back button press (Android)
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Pick One</Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => setGame("O")}
                  style={{ paddingHorizontal: wp(4) }}
                >
                  <Image
                    style={styles.o}
                    source={require("../assets/images/o.png")}
                  />
                </Pressable>
                <Pressable
                  style={{ paddingHorizontal: wp(4) }}
                  onPress={() => setGame("X")}
                >
                  <Image
                    style={styles.o}
                    source={require("../assets/images/x.png")}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Back button to navigate to the menu */}
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1, width: wp(90), marginBottom: hp(1) },
        ]}
        onPress={() => navigation.navigate("Menu")}
      >
        <AntDesign name="back" size={wp(14)} color="#08605F" />
      </Pressable>

      {/* Scoreboard displaying the current scores for X and O */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.score}>
          <Text style={{ fontSize: wp(7) }}>X</Text>
          <Text style={styles.scoreNumber}>{xScrore}</Text>
        </View>
        <View style={styles.score}>
          <Text style={{ fontSize: wp(7) }}>O</Text>
          <Text style={styles.scoreNumber}>{oScrore}</Text>
        </View>
      </View>

      {/* Game grid */}
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Pressable
                key={colIndex}
                style={[styles.cell, styles.center]}
                onPress={() => handlePress(rowIndex, colIndex)}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Game result modal */}
      {winner && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!winner}
          onRequestClose={resetGame}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {winner === "Draw" ? "Draw!" : winner + " wins!"}
              </Text>
              <Pressable style={styles.playAgain} onPress={resetGame}>
                <Text style={styles.playAgainText}>Play Again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PlayerVbot;

// Styles for the game components
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp(8),
    alignItems: "center",
  },
  modalText: {
    fontSize: wp(6),
    fontWeight: "bold",
    marginBottom: hp(3),
  },
  score: {
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: wp(8),
    fontWeight: "bold",
  },
  grid: {
    marginTop: hp(2),
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: wp(25),
    height: wp(25),
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: wp(10),
    fontWeight: "bold",
  },
  o: {
    width: wp(15),
    height: wp(15),
  },
  playAgain: {
    backgroundColor: "#08605F",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    marginTop: hp(2),
  },
  playAgainText: {
    fontSize: wp(5),
    color: "#fff",
  },
});
