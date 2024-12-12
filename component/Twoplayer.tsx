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
              <Text>{cell}</Text>
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
    width: wp(20),
    height: wp(20),
    backgroundColor: "white",
    margin: 2,
  },
});
