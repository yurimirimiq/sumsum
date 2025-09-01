import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export default function ProfileEdit() {
  const { user, updateProfile, updatePortfolio, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.profile?.phone || '');
      setUniversity(user.profile?.university || '');
      setMajor(user.profile?.major || '');
      setGrade(user.profile?.grade || '');
      setSelfIntroduction(user.profile?.selfIntroduction || '');
      setPortfolio(user.profile?.portfolio || '');
      setInstitutionName(user.profile?.institutionName || '');
      setInstitutionType(user.profile?.institutionType || '');
      setAddress(user.profile?.address || '');
      setDescription(user.profile?.description || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('알림', '이름과 이메일을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profileData = {
        name,
        email,
        phone,
        university,
        major,
        grade,
        selfIntroduction,
        portfolio,
        institutionName,
        institutionType,
        address,
        description,
      };

      const success = await updateProfile(profileData);
      if (success) {
        Alert.alert('성공', '프로필이 수정되었습니다.');
      } else {
        Alert.alert('실패', '프로필 수정에 실패했습니다.');
      }
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
          <ThemedText style={styles.label}>전화번호</ThemedText>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="전화번호를 입력하세요"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        {user?.type === 'student' && (
          <>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>대학교</ThemedText>
              <TextInput
                style={styles.input}
                value={university}
                onChangeText={setUniversity}
                placeholder="대학교를 입력하세요"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>학과</ThemedText>
              <TextInput
                style={styles.input}
                value={major}
                onChangeText={setMajor}
                placeholder="학과를 입력하세요"
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

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>자기소개</ThemedText>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={selfIntroduction}
                onChangeText={setSelfIntroduction}
                placeholder="자기소개를 입력하세요"
                placeholderTextColor="#999"
                multiline
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>포트폴리오</ThemedText>
              <TextInput
                style={styles.input}
                value={portfolio}
                onChangeText={setPortfolio}
                placeholder="포트폴리오 URL을 입력하세요"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.updatePortfolioButton}
                onPress={async () => {
                  if (portfolio.trim()) {
                    const success = await updatePortfolio(portfolio);
                    if (success) {
                      Alert.alert('성공', '포트폴리오가 업데이트되었습니다.');
                    } else {
                      Alert.alert('실패', '포트폴리오 업데이트에 실패했습니다.');
                    }
                  } else {
                    Alert.alert('알림', '포트폴리오 URL을 입력해주세요.');
                  }
                }}
              >
                <Text style={styles.updatePortfolioButtonText}>포트폴리오 업데이트</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {user?.type === 'institution' && (
          <>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>기관명</ThemedText>
              <TextInput
                style={styles.input}
                value={institutionName}
                onChangeText={setInstitutionName}
                placeholder="기관명을 입력하세요"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>기관 유형</ThemedText>
              <TextInput
                style={styles.input}
                value={institutionType}
                onChangeText={setInstitutionType}
                placeholder="기관 유형을 입력하세요"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>주소</ThemedText>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="주소를 입력하세요"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>기관 소개</ThemedText>
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={description}
                onChangeText={setDescription}
                placeholder="기관 소개를 입력하세요"
                placeholderTextColor="#999"
                multiline
              />
            </View>
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? "수정 중..." : "수정하기"}
            onPress={handleSubmit}
            disabled={isSubmitting || isLoading}
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
  updatePortfolioButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  updatePortfolioButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
