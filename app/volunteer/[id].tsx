import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopHeaderMain from '../../components/TopHeaderMain';

interface VolunteerData {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function VolunteerDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [volunteer, setVolunteer] = useState<VolunteerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVolunteer();
  }, [id]);

  const loadVolunteer = async () => {
    try {
      setIsLoading(true);
      // 여기서 실제 봉사활동 상세 API 호출
      const mockVolunteer: VolunteerData = {
        id: id || '1',
        title: '한빛초등학교 AI교육봉사',
        date: '2025.10.08 ~ 10.10',
        location: '강화군 불은면 중앙로 삼성초등학교',
        description: '강화도에 위치한 한빛초등학교를 찾아가, 초등학생들에게 AI 기초 개념과 코딩 체험을 알려주는 교육봉사 활동입니다.',
      };
      setVolunteer(mockVolunteer);
    } catch (error) {
      Alert.alert('오류', '봉사활동 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    Alert.alert('신청 완료', '봉사활동 신청이 완료되었습니다.');
  };

  const handleTravelCourseLink = () => {
    Linking.openURL('https://www.blog.com');
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
              <Image 
                source={require('../../assets/images/StudentsImage.png')} 
                style={styles.studentsImage}
                resizeMode="contain"
              />
              <Text style={styles.imageDimensions}>92 × 87</Text>
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
            대학생 멘토들이 직접 준비한 콘텐츠로, 아이들에게 AI를 쉽고 재미있게 보여줌으로써 따뜻한 교류를 나눌 수 있습니다.
          </Text>
          
          <Text style={styles.descriptionText}>
            기술을 나누고, 마음을 나누는 특별한 하루를 보내봐요. 교육봉사에 관심 있는 분들의 많은 참여를 기다립니다.
          </Text>

          {/* 유의사항 */}
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>[유의사항]</Text>
            <Text style={styles.notesText}>초등학생들 너무 귀여움 주의</Text>
          </View>

          {/* 여행 코스 링크 */}
          <View style={styles.linkSection}>
            <Text style={styles.linkTitle}>[여행 코스 링크]</Text>
            <TouchableOpacity onPress={handleTravelCourseLink}>
              <Text style={styles.linkText}>www.blog.com</Text>
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
  studentsImage: {
    width: 92,
    height: 87,
    marginBottom: 10,
  },
  imageDimensions: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a2d',
    marginBottom: 8,
  },
  bannerDate: {
    fontSize: 16,
    color: '#4a7c59',
    marginBottom: 5,
  },
  bannerLocation: {
    fontSize: 14,
    color: '#4a7c59',
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
