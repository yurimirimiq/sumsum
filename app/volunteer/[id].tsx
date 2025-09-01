import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopHeaderAgency from '../../components/TopHeaderAgency';
import TopHeaderMain from '../../components/TopHeaderMain';
import { useAuth } from '../../context/AuthContext';

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
  const { applyForVolunteer, getVolunteerApplicants, user } = useAuth();
  const [volunteer, setVolunteer] = useState<VolunteerData | null>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);

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

  const handleApply = async () => {
    if (!user) {
      Alert.alert('알림', '로그인이 필요합니다.');
      return;
    }

    if (user.type !== 'student') {
      Alert.alert('알림', '학생만 봉사활동에 신청할 수 있습니다.');
      return;
    }

    setIsApplying(true);
    try {
      const success = await applyForVolunteer(id || '');
      if (success) {
        Alert.alert('신청 완료', '봉사활동 신청이 완료되었습니다.');
      } else {
        Alert.alert('신청 실패', '봉사활동 신청에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      Alert.alert('오류', '봉사활동 신청 중 오류가 발생했습니다.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleTravelCourseLink = () => {
    Linking.openURL('https://www.blog.com');
  };

  const handleViewApplicants = async () => {
    if (!user || user.type !== 'institution') {
      Alert.alert('알림', '기관만 신청자 목록을 볼 수 있습니다.');
      return;
    }

    try {
      const applicantList = await getVolunteerApplicants(id || '');
      setApplicants(applicantList);
      setShowApplicants(true);
    } catch (error) {
      Alert.alert('오류', '신청자 목록을 불러오는데 실패했습니다.');
    }
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
      {user?.type === 'institution' ? (
        <TopHeaderAgency
          showBackButton={true}
          logoText='섬포터즈'
          profileImageSource={require('../../assets/images/men.png')}
          gender='agency'
        />
      ) : (
        <TopHeaderMain
          showBackButton={true}
          logoText='섬포터즈'
          profileImageSource={require('../../assets/images/men.png')}
          gender='agency'
        />
      )}
      
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

      {/* 신청하기 버튼 또는 신청자 목록 버튼 */}
      <View style={styles.applyButtonContainer}>
        {user?.type === 'student' ? (
          <TouchableOpacity 
            style={[styles.applyButton, isApplying && styles.disabledButton]} 
            onPress={handleApply}
            disabled={isApplying}
          >
            <Text style={styles.applyButtonText}>
              {isApplying ? '신청 중...' : '신청하기'}
            </Text>
          </TouchableOpacity>
        ) : user?.type === 'institution' ? (
          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={handleViewApplicants}
          >
            <Text style={styles.applyButtonText}>
              신청자 목록 ({applicants.length})
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 신청자 목록 모달 */}
      <Modal
        visible={showApplicants}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowApplicants(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>신청자 목록</Text>
              <TouchableOpacity onPress={() => setShowApplicants(false)}>
                <Text style={styles.closeButton}>닫기</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.applicantList}>
              {applicants.length === 0 ? (
                <Text style={styles.noApplicantsText}>신청자가 없습니다.</Text>
              ) : (
                applicants.map((applicant) => (
                  <View key={applicant.id} style={styles.applicantCard}>
                    <View style={styles.applicantHeader}>
                      <Text style={styles.applicantName}>{applicant.studentName}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: applicant.status === 'pending' ? '#FF9500' : applicant.status === 'selected' ? '#34C759' : '#FF3B30' }]}>
                        <Text style={styles.statusText}>
                          {applicant.status === 'pending' ? '대기중' : applicant.status === 'selected' ? '선택됨' : '거절됨'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.applicantInfo}>{applicant.studentUniversity} {applicant.studentMajor} {applicant.studentGrade}</Text>
                    <Text style={styles.applicantInfo}>{applicant.studentEmail}</Text>
                    <Text style={styles.applicantDate}>
                      신청일: {new Date(applicant.appliedAt).toLocaleDateString('ko-KR')}
                    </Text>
                    
                    {applicant.message && (
                      <Text style={styles.applicantMessage}>메시지: {applicant.message}</Text>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  disabledButton: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  applicantList: {
    flex: 1,
  },
  noApplicantsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  applicantCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  applicantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  applicantInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  applicantDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  applicantMessage: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
});
