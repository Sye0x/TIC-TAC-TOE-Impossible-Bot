import { Text, View, StyleSheet, Image, Pressable, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const Menu = () => {
  /**
   * This React Native component implements the main menu for a Tic-Tac-Toe game.
   *
   * 1. Navigation:
   *    - Utilizes `useNavigation` from React Navigation to navigate between screens.
   *    - The "2 Player" button navigates to the `Twoplayer` screen.
   *
   * 2. Menu Items:
   *    - "1 Player": Placeholder for a single-player mode (currently without functionality).
   *    - "2 Player": Navigates to the `Twoplayer` game mode screen.
   *
   * 3. Icons and Images:
   *    - A settings icon (`Ionicons`) at the top-right corner for potential future features.
   *    - Images of "X" and "O" as visual design elements.
   *
   * 4. Styling:
   *    - A dark-themed background for a visually appealing interface.
   *    - Buttons (`Pressable`) for menu options with opacity feedback on press.
   *    - Styled text for the title "Tic Tac Toe" with different colors for each word.
   *    - Consistent use of responsive design with `widthPercentageToDP` (`wp`) and `heightPercentageToDP` (`hp`) for adaptability across screen sizes.
   *
   * 5. Flexbox Layout:
   *    - Aligns items horizontally and vertically using `alignItems` and `justifyContent`.
   *    - Positions the settings icon at the top-right, the title in the center, and menu items below.
   *
   * This component serves as a visually appealing and functional entry point for navigating the game modes.
   */
  const [Settings, setSetting] = useState(false);
  const navigation = useNavigation<any>();
  const openSetting = () => {
    setSetting(true);
  };
  const closeSetting = () => {
    setSetting(false);
  };
  return (
    <View style={Styles.bg}>
      <Pressable
        onPress={openSetting}
        style={({ pressed }) => [
          Styles.setting,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Ionicons name="settings" size={wp(14)} color="#E84855" />
      </Pressable>
      {Settings && (
        <Modal transparent={true} animationType="slide" visible={!!Settings}>
          <View style={Styles.modalOverlay}>
            <View style={Styles.modalContent}>
              <Pressable style={Styles.saveButton} onPress={closeSetting}>
                <Text style={Styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

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
        onPress={() => navigation.navigate("PlayerVbot")}
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
  saveButton: {
    backgroundColor: "#0197F6",
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    marginTop: hp(2),
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
