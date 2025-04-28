import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerText}>Welcome to our pharmacy</Text>
        <TouchableOpacity style={styles.gettingStartedBtn} onPress={() => router.push("./home")}>
          <Text style={{ color: "green" }}>get started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
  },
  gettingStartedBtn: {
    backgroundColor: "white",
    width: "80%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

})
