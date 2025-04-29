import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Home() {

    const {user, logout} = useAuth()!;

    return (
        <>
            <View>
                <Text>Welcome Home, {user.name}</Text>
                <TouchableOpacity onPress={logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
