import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { customFonts } from '../constants/fonts';

export default function LoginScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = () => {
        console.log('로그인 버튼 클릭');
        // 추후 API 연결

        router.replace('/(tabs)/main');
    }

    const handleNavigateToSignup = () => {
        router.push('/selectType');
    }

    return (
        <LinearGradient
        colors={['#FFFEDD', '#FFFFFF', '#ABDCFF']}
        locations={[0, 0.5, 0.99]}
        style={styles.container}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>로그인</Text>

                <TextInput style={styles.input} placeholder=" 아이디" />
                <TextInput style={styles.input} placeholder=" 비밀번호" />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.questionText}>섬포터즈가 처음이신가요?</Text>
                <TouchableOpacity style={styles.questionButton} onPress={handleNavigateToSignup}>
                    <Text style={styles.buttonText}>회원가입 하기</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'inkLipquid',
        color: '#484848',
        fontSize: 50,
        alignSelf: 'flex-start',
        marginTop: -100,
        marginLeft: 39,
        marginBottom: 40,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    loginButton: {
        width: '80%',
        height: 44,
        backgroundColor: '#FFE26E',
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        fontFamily: 'godoMaum',
        color: '#484848',
        fontSize: 38,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    questionButton: {
        width: '30%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#484848',
        fontSize: 16,
        textAlign: 'center',
    },
    divider: {
        width: '80%',
        height: 0.5,
        backgroundColor: '#484848',
        marginBottom: 30,
    },
})
