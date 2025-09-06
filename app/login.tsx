import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { customFonts } from '../constants/fonts';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, checkApiServer } from '../services/api';

export default function LoginScreen() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [fontsLoaded] = useFonts(customFonts);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = async () => {
        if (!loginId.trim() || !password.trim()) {
            Alert.alert('알림', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // API 서버 연결 상태 확인
            const serverStatus = await checkApiServer();
            if (!serverStatus.isAvailable) {
                Alert.alert('서버 연결 오류', `API 서버에 연결할 수 없습니다.\n\n오류: ${serverStatus.message}\n\n서버 주소: ${API_BASE_URL}\n\n서버가 실행 중인지 확인해주세요.`);
                return;
            }

            const { success, message } = await login(loginId, password);
            if (success) {
                router.replace('/(tabs)/main');
            } else {
                Alert.alert('로그인 실패', message || '아이디 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('오류', '로그인 중 오류가 발생했습니다.');
        }
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

                <TextInput 
                    style={styles.input} 
                    placeholder=" 아이디" 
                    value={loginId}
                    onChangeText={setLoginId}
                    autoCapitalize="none"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder=" 비밀번호" 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.disabledButton]} 
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.loginButtonText}>
                        {isLoading ? '로그인 중...' : 'Login'}
                    </Text>
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
    disabledButton: {
        opacity: 0.6,
    },
})
