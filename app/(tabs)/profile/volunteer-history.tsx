import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import TopHeaderStudent from '../../../components/TopHeaderStudent';
import { useAuth } from '../../../context/AuthContext';

interface VolunteerApplication {
  id: string;
  volunteerId: string;
  volunteerTitle: string;
  volunteerDate: string;
  volunteerLocation: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  appliedAt: string;
  message?: string;
}

export default function VolunteerHistory() {
  const { getVolunteerHistory, user } = useAuth();
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVolunteerHistory();
  }, []);

  const loadVolunteerHistory = async () => {
    try {
      setIsLoading(true);
      const history = await getVolunteerHistory();
      setApplications(history);
    } catch (error) {
      Alert.alert('오류', '봉사활동 내역을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '대기중';
      case 'approved':
        return '승인됨';
      case 'rejected':
        return '거절됨';
      case 'completed':
        return '완료됨';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'approved':
        return '#34C759';
      case 'rejected':
        return '#FF3B30';
      case 'completed':
        return '#007AFF';
      default:
        return '#666';
    }
  };

  if (!user || user.type !== 'student') {
    return (
      <ThemedView style={styles.container}>
        <TopHeaderStudent
          showBackButton={true}
          logoText='섬포터즈'
          profileImageSource={require('../../../assets/images/men.png')}
          gender='student'
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>학생만 접근할 수 있습니다.</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TopHeaderStudent
        showBackButton={true}
        logoText='섬포터즈'
        profileImageSource={require('../../../assets/images/men.png')}
        gender='student'
      />
      
      <ScrollView style={styles.content}>
        <ThemedText style={styles.title}>봉사활동 내역</ThemedText>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>로딩 중...</Text>
          </View>
        ) : applications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>신청한 봉사활동이 없습니다.</Text>
          </View>
        ) : (
          applications.map((application) => (
            <View key={application.id} style={styles.applicationCard}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.volunteerTitle}>
                  {application.volunteerTitle}
                </ThemedText>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) }]}>
                  <Text style={styles.statusText}>
                    {getStatusText(application.status)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>봉사 일자:</Text>
                  <Text style={styles.infoValue}>{application.volunteerDate}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>봉사 장소:</Text>
                  <Text style={styles.infoValue}>{application.volunteerLocation}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>신청 일자:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(application.appliedAt).toLocaleDateString('ko-KR')}
                  </Text>
                </View>
                
                {application.message && (
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageLabel}>신청 메시지:</Text>
                    <Text style={styles.messageText}>{application.message}</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  applicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  volunteerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  messageContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
});
