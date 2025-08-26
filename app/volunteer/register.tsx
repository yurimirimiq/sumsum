import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/common/Button';

export default function VolunteerRegister() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [maxApplicants, setMaxApplicants] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !date.trim() || !time.trim() || !location.trim() || !description.trim()) {
      Alert.alert('알림', '모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 여기서 실제 봉사활동 등록 API 호출
      console.log('봉사활동 등록:', { 
        title, 
        date, 
        time, 
        location, 
        description, 
        maxApplicants: parseInt(maxApplicants) || 0 
      });
      Alert.alert('성공', '봉사활동이 등록되었습니다.');
      // 등록 완료 후 이전 페이지로 이동
    } catch (error) {
      Alert.alert('오류', '봉사활동 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.title}>봉사활동 등록</ThemedText>
        
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>봉사활동 제목 *</ThemedText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="봉사활동 제목을 입력하세요"
            placeholderTextColor="#999"
            maxLength={100}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>날짜 *</ThemedText>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>시간 *</ThemedText>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="예: 09:00 - 12:00"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>장소 *</ThemedText>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="봉사활동 장소를 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>최대 신청자 수</ThemedText>
          <TextInput
            style={styles.input}
            value={maxApplicants}
            onChangeText={setMaxApplicants}
            placeholder="최대 신청자 수를 입력하세요"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>봉사활동 내용 *</ThemedText>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="봉사활동 내용을 상세히 입력하세요"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="등록하기"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.submitButton}
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
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 150,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    marginBottom: 10,
  },
});
