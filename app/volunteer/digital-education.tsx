import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopHeaderMain from '../../components/TopHeaderMain';

interface VolunteerData {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function DigitalEducationDetail() {
  const router = useRouter();
  const [volunteer, setVolunteer] = useState<VolunteerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVolunteer();
  }, []);

  const loadVolunteer = async () => {
    try {
      setIsLoading(true);
      const mockVolunteer: VolunteerData = {
        id: '3',
        title: '노인정 디지털 교육 봉사',
        date: '2025.10.20 ~ 10.22',
        location: '인천시 연수구 행복노인정',
        description: '노인정 어르신들에게 스마트폰과 태블릿 사용법을 가르치는 디지털 교육 봉사입니다.',
      };
      setVolunteer(mockVolunteer);
    } catch (error) {
      Alert.alert('오류', '봉사활동 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    Alert.alert('신청 완료', '노인정 디지털 교육 봉사 신청이 완료되었습니다.');
  };

  const handleGuideLink = () => {
    Linking.openURL('https://www.smartphone.guide');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <TopHeaderMain
          showBackButton={true}
          logoText='섬포터즈'
          profileImageSource={require('../../assets/images/men.png')}
          gender='agency'
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      </View>
    );
  }

  if (!volunteer) {
    return (
      <View style={styles.container}>
        <TopHeaderMain
          showBackButton={true}
          logoText='섬포터즈'
          profileImageSource={require('../../assets/images/men.png')}
          gender='agency'
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>봉사활동을 찾을 수 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopHeaderMain
        showBackButton={true}
        logoText='섬포터즈'
        profileImageSource={require('../../assets/images/men.png')}
        gender='agency'
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 배너 섹션 */}
        <View style={styles.bannerSection}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerIllustration}>
              <View style={styles.smartphoneIcon}>
                <Text style={styles.smartphoneIconText}>📱</Text>
              </View>
            </View>
            <View style={styles.bannerInfo}>
              <Text style={styles.bannerTitle}>{volunteer.title}</Text>
              <Text style={styles.bannerDate}>{volunteer.date}</Text>
              <Text style={styles.bannerLocation}>{volunteer.location}</Text>
            </View>
          </View>
        </View>

        {/* 상세 내용 */}
        <View style={styles.detailSection}>
          <Text style={styles.descriptionText}>
            {volunteer.description}
          </Text>
          
          <Text style={styles.descriptionText}>
            카카오톡, 네이버 지도, 유튜브 등 일상생활에 필요한 앱 사용법을 단계별로 가르치며, 디지털 격차를 줄이는 데 기여하는 봉사활동입니다.
          </Text>
          
          <Text style={styles.descriptionText}>
            어르신들의 디지털 문해력을 높이고, 정보 접근성을 향상시켜 더 풍요로운 노후를 보낼 수 있도록 도와주세요.
          </Text>

          {/* 유의사항 */}
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>[유의사항]</Text>
            <Text style={styles.notesText}>어르신들의 눈높이에 맞춘 천천히 설명 필요</Text>
          </View>

          {/* 사용법 가이드 링크 */}
          <View style={styles.linkSection}>
            <Text style={styles.linkTitle}>[사용법 가이드 링크]</Text>
            <TouchableOpacity onPress={handleGuideLink}>
              <Text style={styles.linkText}>www.smartphone.guide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 신청하기 버튼 */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>신청하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF3B30',
  },
  bannerSection: {
    backgroundColor: '#fff3e0',
    padding: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIllustration: {
    marginRight: 20,
    alignItems: 'center',
  },
  smartphoneIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#e8f5e8',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smartphoneIconText: {
    fontSize: 40,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bannerDate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bannerLocation: {
    fontSize: 14,
    color: '#666',
  },
  detailSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  notesSection: {
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  linkSection: {
    marginBottom: 20,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
