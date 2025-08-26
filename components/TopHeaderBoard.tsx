import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TopHeaderProps = {
    showBackButton?: boolean;
    logoText?: string;
};

export default function TopHeader({
    showBackButton = false,
    logoText = '섬포터즈 게시판',
}: TopHeaderProps) {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                {showBackButton ? (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 20 }} /> 
                )}

                <Text style={styles.logoText}>{logoText}</Text>
                <TouchableOpacity onPress={() => router.push('/(board)/write')}>
                    <Ionicons name="pencil" size={32} color="#333" style={styles.penIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    backText: {
        fontSize: 34,
        color: '#333',
    },
    logoText: {
        fontSize: 26,
        fontFamily: 'yClover',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: 8,
    },
    penIcon: {
        marginRight: 10,
    },
});