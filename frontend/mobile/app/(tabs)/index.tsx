import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextField, View } from "react-native-ui-lib";

export default function HomeScreen() {
  return (
    <View centerV centerH height={"100%"}>
      <ThemedText>hello</ThemedText>
        <TextField
          placeholder="Email"
          keyboardType="email-address"
          floatingPlaceholder
          enableErrors
          validate={["required", (value) => !value?.search("@")]}
          validationMessage={["Please enter an email","Enter a valid email"]}
          maxLength={30}
          
        ></TextField>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderColor: "#ff9933",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
