import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TopHeaderProps = {
    showBackButton?: boolean;
    logoText?: string;
    profileImageSource?: any; // require(...) 또는 URL
    gender?: 'male' | 'female' | 'agency';
    onLogoutPress?: () => void; // 로그아웃 함수 추가
};

export default function TopHeader({
    showBackButton = false,
    logoText = '섬포터즈',
    gender = 'agency',
    profileImageSource,
    onLogoutPress,
}: TopHeaderProps) {
    const router = useRouter();

    // 성별에 따른 프로필 아이콘
    const genderIcon =
        gender === 'male'
            ? require('../assets/images/men.png')
            : gender === 'female'
            ? require('../assets/images/women.png')
            : null;

    // 뒤로가기 또는 로그아웃 처리
    const handleBackPress = () => {
        if (onLogoutPress) {
            onLogoutPress(); // 로그아웃 함수 호출
        } else {
            router.back(); // 기본 뒤로가기
        }
    };

    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                {showBackButton ? (
                    <TouchableOpacity onPress={handleBackPress}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 20 }} /> 
                )}

                <Text style={styles.logoText}>{logoText}</Text>

                <View style={styles.profileContainer}>
                    {profileImageSource ? (
                        <Image source={profileImageSource} style={styles.profile} />
                    ) : (
                        <View style={[styles.profile, styles.placeholder]} />
                    )}
                    {genderIcon && <Image source={genderIcon} style={styles.genderIcon} />}
                </View>
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
        marginLeft: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile: {
        height: 36,
        width: 36,
        borderRadius: 18,
        backgroundColor: '#ccc',
    },
    placeholder: {
        backgroundColor: '#eee',
    },
    genderIcon: {
        height: 18,
        width: 18,
        marginLeft: 5,
    },
});
