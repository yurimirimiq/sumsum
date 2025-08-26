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

export default function EnvironmentDetail() {
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
        id: '4',
        title: '환경정리 및 플로깅 봉사',
        date: '2025.10.25 ~ 10.26',
        location: '한강공원 일대',
        description: '한강공원에서 쓰레기를 수거하고 환경을 정리하는 플로깅 봉사활동입니다.',
      };
      setVolunteer(mockVolunteer);
    } catch (error) {
      Alert.alert('오류', '봉사활동 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    Alert.alert('신청 완료', '환경정리 봉사 신청이 완료되었습니다.');
  };

  const handleGuideLink = () => {
    Linking.openURL('https://www.plogging.kr');
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
              <View style={styles.ecoIcon}>
                <Text style={styles.ecoIconText}>🌱</Text>
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
            조깅하면서 동시에 쓰레기를 줍는 플로깅을 통해 건강도 챙기고 환경도 보호하는 일석이조의 봉사활동입니다.
          </Text>
          
          <Text style={styles.descriptionText}>
            한강의 아름다운 자연을 지키고, 깨끗한 공원을 만들어가는 데 동참해주세요. 환경 보호에 관심 있는 분들의 많은 참여를 기다립니다.
          </Text>

          {/* 유의사항 */}
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>[유의사항]</Text>
            <Text style={styles.notesText}>장갑과 집게 등 안전장비 착용 필수</Text>
          </View>

          {/* 플로깅 가이드 링크 */}
          <View style={styles.linkSection}>
            <Text style={styles.linkTitle}>[플로깅 가이드 링크]</Text>
            <TouchableOpacity onPress={handleGuideLink}>
              <Text style={styles.linkText}>www.plogging.kr</Text>
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
    backgroundColor: '#e8f5e8',
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
  ecoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#f1f8e9',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ecoIconText: {
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
