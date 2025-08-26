import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TopHeaderProps = {
    showBackButton?: boolean;
    logoText?: string;
    profileImageSource?: any; // require(...) 또는 URL
    gender?: 'male' | 'female' | 'agency';
};

export default function TopHeaderStudent({
    showBackButton = false,
    logoText = '나의페이지',
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

                <TouchableOpacity onPress={() => router.push('/profile/edit')}>
                    <Image source={require('../assets/images/pencil.png')} style={styles.penIcon} />
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
        fontSize: 34,
        fontFamily: 'godoMaum',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: 5,
    },
    penIcon: {
        marginRight: 10,
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});