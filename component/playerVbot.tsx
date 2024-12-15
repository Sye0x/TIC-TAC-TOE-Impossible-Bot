import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const playerVbot = () => {
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
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1, width: wp(90), marginBottom: hp(1) },
        ]}
        onPress={() => navigation.navigate("Menu")}
      >
        <AntDesign name="back" size={wp(14)} color="#08605F" />
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        {" "}
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

export default playerVbot;

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
