import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { AuthProvider } from "@/contexts/auth-context";
import { Redirect, router, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <Redirect href={"/(auth)/login"}/>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
  },
  

})
