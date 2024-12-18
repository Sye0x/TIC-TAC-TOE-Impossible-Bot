// Issue in the program need debugging

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importing the function to create a stack navigator for managing navigation.

const Stack = createNativeStackNavigator();
// Initializing the stack navigator.

import Menu from "../component/Menu";
// Importing the Menu component, which will be the first screen.

import Twoplayer from "../component/Twoplayer";
// Importing the Twoplayer component, which will be navigated to from the Menu.
import PlayerVbot from "@/component/PlayerVbot";
export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Menu">
      {/* Defining the stack navigator to manage the navigation between screens. */}

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
        // Adding the Menu screen to the stack and hiding its header.
      />

      <Stack.Screen
        name="Twoplayer"
        component={Twoplayer}
        options={{ headerShown: false }}
        // Adding the Twoplayer screen to the stack and hiding its header.
      />
      <Stack.Screen
        name="PlayerVbot"
        component={PlayerVbot}
        options={{ headerShown: false }}
        // Adding the Twoplayer screen to the stack and hiding its header.
      />
    </Stack.Navigator>
  );
}
