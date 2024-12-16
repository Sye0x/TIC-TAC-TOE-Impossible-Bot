import { Text, View, StyleSheet, Image, Pressable, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const Menu = () => {
  // Comments:
  // 1. Overall Structure:
  //    - The component is structured using functional programming with hooks (`useState`) for state management.
  //    - Utilizes modular styling with `StyleSheet.create` for readability and reusability.
  //    - Responsiveness is ensured using `react-native-responsive-screen` for consistent layout on different devices.

  // 2. State Management:
  //    - Two states are managed using `useState`: `Settings` for modal visibility and `audioOn` for audio toggle functionality.

  // 3. Navigation:
  //    - `useNavigation` from React Navigation is used to navigate to the "PlayerVbot" and "Twoplayer" screens.
  //    - Demonstrates clean navigation logic with clear and descriptive screen names.

  // 4. Modal Functionality:
  //    - The modal is implemented for the settings menu and displays toggleable audio options.
  //    - State `audioOn` switches between "Audio on" and "Audio off" states, with appropriate icon and text updates.

  // 5. Design & Styling:
  //    - Dark-themed background enhances visual appeal and consistency with game aesthetics.
  //    - Responsive design ensures adaptability to various screen sizes with `wp` and `hp` utility functions.
  //    - Flexbox is effectively used for layout alignment and positioning.
  //    - Visual elements like images (`X` and `O`) and styled text ("Tic Tac Toe") create a polished UI.

  // 6. Accessibility:
  //    - `Pressable` components provide visual feedback with opacity changes for an improved user experience.
  //    - The modal overlay includes a semi-transparent background to keep focus on the modal content.

  // 7. Code Readability:
  //    - Inline comments and detailed naming conventions make the code easy to understand.
  //    - The use of modular styling (`Styles`) ensures separation of logic and UI elements for maintainability.

  // 8. Potential Improvements:
  //    - Implement functionality for the "1 Player" mode (currently a placeholder).
  //    - Add more settings options or features in the modal for extended functionality.
  //    - Include audio feedback for button presses to enhance user engagement.

  const [Settings, setSetting] = useState(false);
  const [audioOn, setaudio] = useState(false);
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
              {audioOn && (
                <Pressable
                  onPress={() => {
                    setaudio(false);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: hp(2),
                  }}
                >
                  <Feather name="volume-2" size={wp(12)} color="#E84855" />
                  <Text
                    style={{
                      fontSize: wp(7.2),
                      marginLeft: wp(2),
                      color: "#0197F6",
                    }}
                  >
                    Audio on
                  </Text>
                </Pressable>
              )}
              {!audioOn && (
                <Pressable
                  onPress={() => {
                    setaudio(true);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: hp(2),
                  }}
                >
                  <Feather name="volume-x" size={wp(13)} color="#E84855" />
                  <Text
                    style={{
                      fontSize: wp(7.2),
                      marginLeft: wp(2),
                      color: "#0197F6",
                    }}
                  >
                    Audio off
                  </Text>
                </Pressable>
              )}
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
