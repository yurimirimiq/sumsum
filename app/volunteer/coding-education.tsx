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

export default function CodingEducationDetail() {
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
        id: '2',
        title: '초등학생 코딩교육 봉사',
        date: '2025.10.15 ~ 10.17',
        location: '서울시 강남구 코딩아카데미',
        description: '초등학생들에게 스크래치와 파이썬 기초를 가르치는 코딩 교육 봉사입니다.',
      };
      setVolunteer(mockVolunteer);
    } catch (error) {
      Alert.alert('오류', '봉사활동 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    Alert.alert('신청 완료', '초등학생 코딩교육 봉사 신청이 완료되었습니다.');
  };

  const handlePortfolioLink = () => {
    Linking.openURL('https://scratch.mit.edu');
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
              <View style={styles.codingIcon}>
                <Text style={styles.codingIconText}>💻</Text>
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
            스크래치를 활용한 블록 코딩부터 파이썬 기초 문법까지, 아이들이 쉽고 재미있게 프로그래밍을 배울 수 있도록 도와주는 봉사활동입니다.
          </Text>
          
          <Text style={styles.descriptionText}>
            컴퓨터 과학의 기초 개념과 논리적 사고력을 키우는 시간을 함께 만들어보세요. 코딩에 관심 있는 대학생들의 많은 참여를 기다립니다.
          </Text>

          {/* 유의사항 */}
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>[유의사항]</Text>
            <Text style={styles.notesText}>초등학생 수준에 맞는 설명 준비 필요</Text>
          </View>

          {/* 학습 자료 링크 */}
          <View style={styles.linkSection}>
            <Text style={styles.linkTitle}>[학습 자료 링크]</Text>
            <TouchableOpacity onPress={handlePortfolioLink}>
              <Text style={styles.linkText}>scratch.mit.edu</Text>
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
  codingIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#e3f2fd',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codingIconText: {
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
