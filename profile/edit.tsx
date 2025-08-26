import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import Button from '../components/common/Button';

export default function ProfileEdit() {
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('hong@example.com');
  const [school, setSchool] = useState('서울고등학교');
  const [grade, setGrade] = useState('2학년');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('알림', '이름과 이메일을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 여기서 실제 프로필 수정 API 호출
      console.log('프로필 수정:', { name, email, school, grade });
      Alert.alert('성공', '프로필이 수정되었습니다.');
      // 수정 완료 후 이전 페이지로 이동
    } catch (error) {
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.title}>프로필 수정</ThemedText>
        
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>이름</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>이메일</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>학교</ThemedText>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
            placeholder="학교를 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>학년</ThemedText>
          <TextInput
            style={styles.input}
            value={grade}
            onChangeText={setGrade}
            placeholder="학년을 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="수정하기"
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
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    marginBottom: 10,
  },
});
