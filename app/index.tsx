import { Text, View, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Index() {
  return (
    <View style={Styles.bg}>
      <View style={Styles.setting}>
        <Ionicons name="settings" size={wp(14)} color="#E84855" />
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <Image
          style={Styles.cross}
          source={require("../assets/images/x.png")}
        />
      </View>
      <View style={Styles.textContainer}>
        <Text style={[Styles.text, { color: "#E84855" }]}>Tic </Text>
        <Text style={[Styles.text, { color: "#419D78" }]}>Tac </Text>
        <Text style={[Styles.text, { color: "#0197F6" }]}>Toe</Text>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        <Image style={Styles.o} source={require("../assets/images/o.png")} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  bg: {
    backgroundColor: "#06070E",
    flex: 1,
    alignItems: "center",
    // Centers content vertically
  },
  setting: {
    margin: wp(3),
    alignSelf: "flex-end",
  },
  textContainer: {
    flexDirection: "row", // Places "Tic", "Tac", and "Toe" in a row
  },
  text: {
    fontSize: wp(15), // Adjust size if needed
    fontWeight: "bold", // Makes the text bold (optional)
  },
  cross: {
    width: wp(10),
    height: wp(10),
    margin: wp(5),
  },
  o: {
    width: wp(15),
    height: wp(15),
    margin: wp(5),
  },
});
