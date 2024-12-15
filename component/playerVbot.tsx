import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

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

const PlayerVbot = () => {
  const navigation = useNavigation<any>();

  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [start, setStart] = useState(true);
  const [player, setPlayer] = useState("");
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [xScrore, setScorex] = useState(0);
  const [oScrore, setScoreo] = useState(0);

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
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] == "") {
            grid[i][j] = turn;
            if (checkWinner(grid) === turn) {
              grid[i][j] = "";
              return 1; // Immediate win
            }
            grid[i][j] = "";
          }
        }
      }
    }

    if (maximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] == "") {
            grid[i][j] = turn;
            let score = minmax(grid, depth + 1, false);
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
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] == "") {
            grid[i][j] = player;
            let score = minmax(grid, depth + 1, true);
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
  const Botmove = (grid: string[][]) => {
    let row = -1;
    let col = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === "") {
          grid[i][j] = turn;
          const score = minmax(grid, 0, false);
          grid[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            row = i;
            col = j;
          }
        }
      }
    }

    if (row === -1 || col === -1 || winner) return;

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[row][col] = turn;

      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
        if (gameWinner === "X") setScorex((prev) => prev + 1);
        if (gameWinner === "O") setScoreo((prev) => prev + 1);
      } else {
        setTurn((prev) => (prev === "X" ? "O" : "X"));
      }

      return newGrid;
    });
  };

  useEffect(() => {
    if (
      (turn === "X" && !winner && player === "O") ||
      (turn === "O" && !winner && player === "X")
    ) {
      Botmove(grid);
    }
  }, [grid, turn, winner, player]);
  const setGame = (value: any) => {
    setStart(false);
    setPlayer(value);
  };

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

    for (const line of lines) {
      if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }

    if (grid.every((row) => row.every((cell) => cell !== ""))) {
      return "Draw";
    }

    return null;
  };

  const handlePress = (row: number, col: number) => {
    if (grid[row][col] !== "" || winner) return;

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[row][col] = turn;

      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        if (turn === "X") {
          setTurn("O");
        } else {
          setTurn("X");
        }
      }

      return newGrid;
    });
  };

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
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!start}
          onRequestClose={resetGame} // Close the modal on back button press (Android)
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Pick One</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
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

      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1, width: wp(90), marginBottom: hp(1) },
        ]}
        onPress={() => navigation.navigate("Menu")}
      >
        <AntDesign name="back" size={wp(14)} color="#08605F" />
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.scoreBoard}>
          <Image
            style={styles.cross}
            source={require("../assets/images/x.png")}
          />
          <Text style={styles.scoreTxt}>{xScrore}</Text>
        </View>
        <View style={styles.scoreBoard}>
          <Image style={styles.o} source={require("../assets/images/o.png")} />
          <Text style={styles.scoreTxt}>{oScrore}</Text>
        </View>
      </View>

      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, colIndex) => (
            <Pressable
              key={colIndex}
              style={({ pressed }) => [
                styles.box,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => handlePress(rowIndex, colIndex)}
            >
              <Text
                style={[
                  styles.xo,
                  { color: cell === "X" ? "#e9190f" : "#08605F" },
                ]}
              >
                {cell}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
      {winner && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!winner}
          onRequestClose={resetGame} // Close the modal on back button press (Android)
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
              </Text>
              <Pressable style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetText}>Play Again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PlayerVbot;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#06070E",
    flex: 1,
    alignItems: "center",
    paddingTop: hp(5),
  },
  box: {
    width: wp(32),
    height: wp(32),
    backgroundColor: "#1A1423",
    borderWidth: wp(1),
    margin: wp(0.5),
    borderColor: "#0197F6",
    justifyContent: "center",
    alignItems: "center",
  },
  xo: {
    color: "#e9190f",
    fontSize: wp(22),
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: hp(5),
    backgroundColor: "#0197F6",
    padding: wp(3),
    borderRadius: wp(2),
  },
  resetText: {
    color: "#fff",
    fontSize: wp(5),
    fontWeight: "bold",
  },
  cross: {
    width: wp(10),
    height: wp(10),
  },
  o: {
    width: wp(15),
    height: wp(15),
  },
  scoreTxt: {
    color: "#08605F",
    fontSize: hp(8),
  },
  scoreBoard: {
    backgroundColor: "#37123C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: wp(0.6),
    borderColor: "#0197F6",
    borderRadius: wp(4),
    width: wp(40),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    marginBottom: hp(2),
    marginHorizontal: wp(2),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: wp(70), // Set the width of the modal
    height: hp(30), // Set the height of the modal
    backgroundColor: "#1A1423",
    borderRadius: wp(3),
    justifyContent: "center",
    alignItems: "center",
    padding: wp(5),
    borderWidth: 1,
    borderColor: "#0197F6",
  },
  modalText: {
    fontSize: wp(5),
    color: "#FFFFFF",
    marginBottom: hp(2),
    textAlign: "center",
  },
});
