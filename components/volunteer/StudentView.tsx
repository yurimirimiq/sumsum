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
  status: 'available' | 'applied' | 'completed';
}

interface StudentViewProps {
  volunteer: VolunteerData;
  onApply?: () => void;
  onViewDetails?: () => void;
}

export default function StudentView({ volunteer, onApply, onViewDetails }: StudentViewProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '신청 가능';
      case 'applied':
        return '신청 완료';
      case 'completed':
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#28A745';
      case 'applied':
        return '#007AFF';
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
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>봉사 내용</ThemedText>
          <ThemedText style={styles.description}>{volunteer.description}</ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          {volunteer.status === 'available' && (
            <Button
              title="봉사 신청하기"
              onPress={onApply || (() => {})}
              style={styles.applyButton}
            />
          )}
          <Button
            title="상세 정보 보기"
            onPress={onViewDetails || (() => {})}
            variant="outline"
            style={styles.detailsButton}
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
    color: '#007AFF',
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
  applyButton: {
    marginBottom: 10,
  },
  detailsButton: {
    marginBottom: 10,
  },
});
