import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { customFonts } from '../constants/fonts';

export default function SelectTypeScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    const handleStudentSelect = () => {
        router.push('/signup/student' as any);
    };

    const handleAgencySelect = () => {
        router.push('/signup/agency' as any);
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

            <View style={styles.content}>
                <Text style={styles.title}>선택해 주세요</Text>
                
                    <View style={styles.cardContainer}>
                        <View style={styles.cardWrapper}>
                            <TouchableOpacity style={styles.card} onPress={handleStudentSelect}>
                                <View style={styles.cardContent}>
                                    <Image 
                                        source={require('../assets/images/signin_student.png')} 
                                        style={styles.studentImage} 
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.cardText}>학생이에요</Text>
                        </View>

                        <View style={styles.cardWrapper}>
                            <TouchableOpacity style={styles.card} onPress={handleAgencySelect}>
                                <View style={styles.cardContent}>
                                    <Image 
                                        source={require('../assets/images/signin_agency.png')} 
                                        style={styles.agencyImage} 
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.cardText}>기관이에요</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFEDD',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginBottom: 100,
    },
    title: {
        fontFamily: 'inkLipquid',
        fontSize: 40,
        color: '#000000',
        marginBottom: 60,
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        gap: 10,
    },
    cardWrapper: {
        alignItems: 'center',
    },
    card: {
        width: 160,
        height: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 90,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    studentImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    agencyImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    cardText: {
        fontFamily: 'godoMaum',
        fontSize: 24,
        color: '#000000',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: '600',
    },
});