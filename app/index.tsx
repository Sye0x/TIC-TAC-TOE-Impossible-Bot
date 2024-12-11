import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importing the function to create a stack navigator for navigation.

const Stack = createNativeStackNavigator();
import Menu from "../component/Menu";
import Twoplayer from "../component/Twoplayer";
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Twoplayer"
        component={Twoplayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
