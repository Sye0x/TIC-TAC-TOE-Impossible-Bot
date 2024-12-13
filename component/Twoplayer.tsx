import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Twoplayer = () => {
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);

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
        if (gameWinner === "Draw") {
          Alert.alert("Game Over", "It's a Draw!");
        } else {
          Alert.alert("Game Over", `${gameWinner} Wins!`);
        }
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
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, colIndex) => (
            <Pressable
              key={colIndex}
              style={styles.box}
              onPress={() => handlePress(rowIndex, colIndex)}
            >
              <Text style={styles.xo}>{cell}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      {winner && (
        <Pressable style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetText}>Restart</Text>
        </Pressable>
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
    justifyContent: "center",
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
});
