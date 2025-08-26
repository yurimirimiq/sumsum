import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import Button from '../common/Button';

interface VolunteerData {
  id: string;
  title: string;
  organization: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'active' | 'closed' | 'completed';
  applicantsCount: number;
  maxApplicants: number;
}

interface AgencyViewProps {
  volunteer: VolunteerData;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
  onViewApplicants?: () => void;
}

export default function AgencyView({ 
  volunteer, 
  onEdit, 
  onDelete, 
  onClose, 
  onViewApplicants 
}: AgencyViewProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '모집중';
      case 'closed':
        return '마감됨';
      case 'completed':
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#28A745';
      case 'closed':
        return '#FF3B30';
      case 'completed':
        return '#6C757D';
      default:
        return '#6C757D';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.title}>{volunteer.title}</ThemedText>
        
        <View style={styles.statusContainer}>
          <ThemedText style={[styles.status, { color: getStatusColor(volunteer.status) }]}>
            {getStatusText(volunteer.status)}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>기본 정보</ThemedText>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>기관명:</ThemedText>
            <ThemedText style={styles.value}>{volunteer.organization}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>날짜:</ThemedText>
            <ThemedText style={styles.value}>{volunteer.date}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>시간:</ThemedText>
            <ThemedText style={styles.value}>{volunteer.time}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>장소:</ThemedText>
            <ThemedText style={styles.value}>{volunteer.location}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>신청자:</ThemedText>
            <ThemedText style={styles.value}>
              {volunteer.applicantsCount}/{volunteer.maxApplicants}명
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>봉사 내용</ThemedText>
          <ThemedText style={styles.description}>{volunteer.description}</ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          {volunteer.status === 'active' && (
            <>
              <Button
                title="수정하기"
                onPress={onEdit || (() => {})}
                variant="outline"
                style={styles.editButton}
              />
              <Button
                title="마감하기"
                onPress={onClose || (() => {})}
                variant="secondary"
                style={styles.closeButton}
              />
            </>
          )}
          <Button
            title="신청자 목록 보기"
            onPress={onViewApplicants || (() => {})}
            style={styles.applicantsButton}
          />
          <Button
            title="삭제하기"
            onPress={onDelete || (() => {})}
            variant="secondary"
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#FF3B30',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    opacity: 0.8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    marginBottom: 10,
  },
  closeButton: {
    marginBottom: 10,
  },
  applicantsButton: {
    marginBottom: 10,
  },
  deleteButton: {
    marginBottom: 10,
  },
});
