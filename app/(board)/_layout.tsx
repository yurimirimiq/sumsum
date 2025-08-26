// app/(board)/_layout.tsx
import { Stack } from 'expo-router';

export default function BoardLayout() {
    return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="write" />
        <Stack.Screen name="[id]" />
    </Stack>
    );
}