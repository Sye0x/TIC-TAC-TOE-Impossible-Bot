import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const Menu = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={Styles.bg}>
      <Pressable
        style={({ pressed }) => [
          Styles.setting,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Ionicons name="settings" size={wp(14)} color="#E84855" />
      </Pressable>
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
      <Pressable
        style={({ pressed }) => [
          Styles.menuitem,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={Styles.menutext}>1 Player</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          Styles.menuitem,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => navigation.navigate("Twoplayer")}
      >
        <Text style={Styles.menutext}>2 Player</Text>
      </Pressable>
    </View>
  );
};

export default Menu;

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
  menuitem: {
    backgroundColor: "#261447",
    width: wp(62),
    height: hp(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(1),
    borderColor: "#0197F6",
    borderRadius: wp(5),
    marginTop: hp(5),
  },

  menutext: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: "#E84855",
  },
});
