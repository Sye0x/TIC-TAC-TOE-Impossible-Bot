import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const Twoplayer = () => {
  /**
   * This React Native component implements a two-player Tic-Tac-Toe game.
   *
   * 1. State Management:
   *    - `grid`: Represents the 3x3 game board, initialized with empty strings (`""`).
   *    - `turn`: Tracks the current player's turn, toggling between "X" and "O".
   *    - `winner`: Tracks the winner of the game or identifies a draw.
   *    - `xScrore` and `oScrore`: Keeps track of the scores for player X and player O.
   *
   * 2. Game Logic:
   *    - `checkWinner`: Determines if there's a winner by checking all possible winning combinations
   *      (horizontal, vertical, and diagonal). If all cells are filled without a winner, it declares a draw.
   *    - `handlePress`: Updates the grid when a player presses a cell, toggles the turn, and checks for a winner or draw.
   *      Prevents further action if the game is over or the cell is already filled.
   *    - `resetGame`: Resets the board and game state to allow a new match.
   *
   * 3. Scoreboard:
   *    - Displays the current scores for players X and O using images as labels.
   *
   * 4. Modal for Game Over:
   *    - Shows a message when the game ends, displaying the winner or indicating a draw.
   *      Includes a "Play Again" button to reset the game.
   *
   * 5. Styling:
   *    - Uses `StyleSheet` for consistent design.
   *    - `react-native-responsive-screen` is used for responsive dimensions (`wp` and `hp`).
   *
   * 6. Grid Design:
   *    - Each cell (`Pressable`) is styled to have borders and a dynamic background. The middle row and column
   *      could be customized for unique colors or styles.
   *    - The `Text` inside the cells displays either "X" or "O", colored distinctively.
   *
   * 7. Accessibility and Feedback:
   *    - The `opacity` of cells changes on press for visual feedback.
   *    - The `Modal` is transparent and semi-opaque for focus on the game over message.
   *
   * This component provides a complete two-player Tic-Tac-Toe experience with a responsive UI, clear visuals,
   * and proper game logic for detecting winners or a draw.
   */
  const navigation = useNavigation<any>();

  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [xScrore, setScorex] = useState(0);
  const [oScrore, setScoreo] = useState(0);

  const checkWinner = (grid: string[][]) => {
    const lines = [
      // Horizontal lines
      [grid[0][0], grid[0][1], grid[0][2]],
      [grid[1][0], grid[1][1], grid[1][2]],
      [grid[2][0], grid[2][1], grid[2][2]],
      // Vertical lines
      [grid[0][0], grid[1][0], grid[2][0]],
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      // Diagonals
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[0][2], grid[1][1], grid[2][0]],
    ];

    for (const line of lines) {
      if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        if (line[0] === "X") {
          setScorex(xScrore + 1);
        } else {
          setScoreo(oScrore + 1);
        }
        return line[0]; // Return "X" or "O"
      }
    }
    // Check for draw
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
        setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
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
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, width: wp(90) }]}
        onPress={() => navigation.navigate("Menu")}
      >
        <AntDesign name="back" size={wp(10)} color="#08605F" />
      </Pressable>

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

export default Twoplayer;

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
    width: wp(90),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    marginBottom: hp(2),
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
