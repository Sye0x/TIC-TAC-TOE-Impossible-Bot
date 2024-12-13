import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
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
  const [turn, setTurn] = useState("x");
  const handlePress = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (turn === "x" && newGrid[row][col] === "") {
        newGrid[row][col] = "X";
        setTurn("O");
      } else if (turn === "O" && newGrid[row][col] === "") {
        newGrid[row][col] = "O";
        setTurn("X");
      }
      if (newGrid[0][0] === newGrid[0][1]) {
        if (newGrid[0][1] === newGrid[0][2]) {
          //x or o won
        }
      } else if (newGrid[1][0] === newGrid[1][1]) {
        if (newGrid[1][1] === newGrid[1][2]) {
          //x or o won
        }
      } else if (newGrid[2][0] === newGrid[2][1]) {
        if (newGrid[2][1] === newGrid[2][2]) {
          //x or o won
        }
      }
      // You can toggle text or apply logic here
      return newGrid;
    });
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
    </View>
  );
};

export default Twoplayer;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#06070E",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
  },
  box: {
    width: wp(32),
    height: wp(32),
    backgroundColor: "#1A1423",
    borderWidth: wp(1),
    margin: wp(0.5),
    borderColor: "#0197F6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  xo: {
    color: "#e9190f",
    fontSize: wp(22),
    fontWeight: "bold",
  },
});
