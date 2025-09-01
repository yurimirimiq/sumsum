import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { customFonts } from '../../constants/fonts';
import { useAuth } from '../../context/AuthContext';

export default function SignupAgencyScreen() {
    const router = useRouter();
    const { registerInstitution, isLoading } = useAuth();
    const [fontsLoaded] = useFonts(customFonts);
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        institutionName: '',
        institutionType: '',
        address: '',
        description: '',
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSignup = async () => {
        // 필수 필드 검증
        if (!formData.loginId || !formData.password || !formData.name || !formData.email || !formData.phone || !formData.institutionName || !formData.address) {
            Alert.alert('알림', '필수 항목을 모두 입력해주세요.');
            return;
        }

        // 아이디 형식 검증 (영문, 숫자 조합 8~16자)
        const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        if (!idRegex.test(formData.loginId)) {
            Alert.alert('알림', '아이디는 영문과 숫자를 조합하여 8~16자로 입력해주세요.');
            return;
        }

        // 비밀번호 형식 검증 (영문, 숫자 조합 8~16자)
        if (!idRegex.test(formData.password)) {
            Alert.alert('알림', '비밀번호는 영문과 숫자를 조합하여 8~16자로 입력해주세요.');
            return;
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('알림', '올바른 이메일 형식을 입력해주세요.');
            return;
        }

        try {
            const success = await registerInstitution(formData);
            if (success) {
                Alert.alert('성공', '회원가입이 완료되었습니다!', [
                    {
                        text: '확인',
                        onPress: () => router.push('/login')
                    }
                ]);
            } else {
                Alert.alert('실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <LinearGradient
            colors={['#FFFEDD', '#FFFFFF', '#ABDCFF']}
            locations={[0, 0.5, 0.99]}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>← 뒤로</Text>
                </TouchableOpacity>

                <Text style={styles.title}>회원가입</Text>
                
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>아이디</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.loginId}
                            onChangeText={(value) => handleInputChange('loginId', value)}
                            placeholder="영문, 숫자 조합 8~16자"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>비밀번호</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            placeholder="영문, 숫자 조합 8~16자"
                            placeholderTextColor="#999"
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>이름</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            placeholder="예) 홍길동"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>이메일</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            placeholder="예) example@email.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>전화번호</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.phone}
                            onChangeText={(value) => handleInputChange('phone', value)}
                            placeholder="예) 01012345678"
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>기관 이름</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.institutionName}
                            onChangeText={(value) => handleInputChange('institutionName', value)}
                            placeholder="예) 인천시립도서관"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>기관 유형</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.institutionType}
                            onChangeText={(value) => handleInputChange('institutionType', value)}
                            placeholder="예) 도서관, 복지관, 학교 등"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>주소</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.address}
                            onChangeText={(value) => handleInputChange('address', value)}
                            placeholder="예) 인천시 연수구 송도동 123-45"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>기관 소개</Text>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            value={formData.description}
                            onChangeText={(value) => handleInputChange('description', value)}
                            placeholder="기관에 대한 소개를 입력해주세요"
                            placeholderTextColor="#999"
                            multiline
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.signupButton, isLoading && styles.disabledButton]} 
                        onPress={handleSignup}
                        disabled={isLoading}
                    >
                        <Text style={styles.signupButtonText}>
                            {isLoading ? '가입 중...' : '가입하기'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        fontFamily: 'inkLipquid',
        fontSize: 26,
        color: '#484848',
    },
    title: {
        fontFamily: 'inkLipquid',
        fontSize: 40,
        color: '#484848',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 14,
    },
    label: {
        fontFamily: 'godoMaum',
        fontSize: 28,
        color: '#484848',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    signupButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#508AFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    signupButtonText: {
        fontFamily: 'godoMaum',
        fontSize: 36,
        color: '#FFFFFF',
    },
    disabledButton: {
        opacity: 0.6,
    },
});