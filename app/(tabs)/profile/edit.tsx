import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TopHeaderStudent from '../../../components/TopHeaderStudent';
import { useAuth } from '../../../context/AuthContext';

export default function ProfileEdit() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState(user?.name || '');
  const [university, setUniversity] = useState(user?.profile?.university || '');
  const [major, setMajor] = useState(user?.profile?.major || (user as any)?.profile?.department || '');
  const [selfIntroduction, setSelfIntroduction] = useState(user?.profile?.selfIntroduction || '');
  const [portfolio, setPortfolio] = useState(user?.profile?.portfolio || '');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUniversity(user.profile?.university || '');
      setMajor(user.profile?.major || (user as any)?.profile?.department || '');
      setSelfIntroduction(user.profile?.selfIntroduction || '');
      setPortfolio(user.profile?.portfolio || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // 입력값 검증
      if (!name.trim() || !university.trim() || !major.trim()) {
        Alert.alert('알림', '필수 항목을 모두 입력해주세요.');
        return;
      }

      const success = await updateProfile({
        name: name.trim(),
        profile: {
          ...user?.profile,
          university: university.trim(),
          major: major.trim(),
          selfIntroduction: selfIntroduction.trim(),
          portfolio: portfolio.trim(),
        },
      });

      if (success) {
        Alert.alert('성공', '프로필이 저장되었습니다.', [
          {
            text: '확인',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('오류', '프로필 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      Alert.alert('오류', '프로필 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <TopHeaderStudent showBackButton={true} logoText="나의페이지" />
      
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 이름 */}
        <View style={styles.card}>
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>이름</Text>
            <Text style={styles.infoValue}>{name}</Text>
          </View>
        </View>

        {/* 대학교 & 학과 */}
        <View style={styles.card}>
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>대학교 & 학과</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{university}</Text>
              <Text style={styles.infoValue}>{major}</Text>
            </View>
          </View>
        </View>

        {/* 자기소개 */}
        <View style={styles.card}>
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>자기소개</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                value={selfIntroduction}
                onChangeText={setSelfIntroduction}
                multiline
                placeholder="자기소개를 입력해주세요"
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* 포트폴리오 */}
        <View style={styles.card}>
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>포트폴리오</Text>
            <View style={styles.portfolioContainer}>
              <TextInput
                style={styles.portfolioInput}
                value={portfolio}
                onChangeText={setPortfolio}
                placeholder="링크를 넣어주세요"
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.linkIcon}>
                <Text style={styles.linkIconText}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  infoBlockRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    gap: 16,
  },
  infoLabel: {
    width: 100,
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '400',
    textAlign: 'left',
    flex: 1,
  },
  infoValueContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
  },
  portfolioContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  portfolioInput: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  linkIcon: {
    marginLeft: 8,
  },
  linkIconText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});