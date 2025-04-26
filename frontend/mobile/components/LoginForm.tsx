import React from "react"
import { StyleSheet, View } from "react-native"
import { ThemedView } from "./ThemedView"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "./ui/form-control"
import { Input, InputField } from "./ui/input";
import { AlertCircleIcon } from "./ui/icon";

export default function LoginForm() {
    const [isInvalid, setIsInvalid] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("12345")

    const handleLogin = () => { }

    return (

        <FormControl isInvalid={isInvalid} style={{ width: 350, borderWidth: 1, borderRadius: 10, height: 400, padding: 20 }}>
            <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
                <InputField
                    type="password"
                    placeholder="password"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
            </Input>
            <FormControlHelper>
                <FormControlHelperText>
                    Must be atleast 6 characters.
                </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    Atleast 6 characters are required.
                </FormControlErrorText>
            </FormControlError>
        </FormControl>

    )
}

const styles = StyleSheet.create({
    inputField: {
        height: 50
    }
})