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

  const handlePress = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = "X"; // You can toggle text or apply logic here
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
