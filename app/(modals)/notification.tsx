import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotificationModal() {
    const router = useRouter();

    return (
    <View style={styles.modal}>
        <Text style={styles.title}>알림</Text>
        <Text>여기에 알림 목록을 표시합니다.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
        <Text style={{ color: 'white' }}>닫기</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    closeBtn: {
        marginTop: 20,
        backgroundColor: '#4A90E2',
        padding: 10,
        borderRadius: 5,
    },
});
