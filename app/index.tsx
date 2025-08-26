import { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function IntroScreen() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/login');
        }, 4000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <LinearGradient
            colors={['#FFFEDD', '#FFFFFF', '#ABDCFF']}
            locations={[0, 0.5, 0.99]}
            style={styles.container}
        >
            <Image
                source={require('../assets/images/sumpo_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/images/sumpo_typo.png')}
                style={styles.typo}
                resizeMode="contain"
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    typo: {
        width: 200,
        height: 200,
        marginTop: -60,
    }
})

