import { AuthProvider } from "@/contexts/auth-context";
import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function RootLayout() {
  return <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
    </Stack>
  </AuthProvider>

}
