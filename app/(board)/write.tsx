// *** 섬포터즈 게시판 게시글 작성 페이지 ***

import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TopHeaderBoard from '../../components/TopHeaderBoard';
import { customFonts } from '../../constants/fonts';
import { useAuth } from '../../context/AuthContext';

export default function BoardWrite() {
  const { createPost, user } = useAuth();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]); // YYYY-MM-DD 형식
    hideDatePicker();
  };
  

  // 등록하기 버튼 클릭 시
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('알림', '로그인이 필요합니다.');
      return;
    }

    if (user.type !== 'student') {
      Alert.alert('알림', '학생만 게시글을 작성할 수 있습니다.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await createPost(title, content, date, link);
      if (success) {
        Alert.alert('성공', '게시글이 작성되었습니다.');
        router.back();
      } else {
        Alert.alert('실패', '게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '게시글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // 폰트 로드 관련
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
    <TopHeaderBoard
      showBackButton={true}
      logoText='섬포터즈 게시판'
    />

      <View style={styles.container}>

        {/* 제목 */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="예) 한빛초등학교 AI교육봉사"
            style={styles.inputBox}
          />
        </View>

        {/* 일자 */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>일자</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={[styles.inputBox, styles.dateBox]}
          >
            <Text>{date || '봉사 시작 날짜 선택'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {/* 내용 */}
        <View style={styles.inputColumn}>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="간단하게 봉사 내용을 채워주세요!"
            multiline
            numberOfLines={10}
            scrollEnabled={true}
            style={[styles.contentBox]}
          />
        </View>

        {/* 링크 */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>링크</Text>
          <TextInput
            value={link}
            onChangeText={setLink}
            placeholder="인스타그램 포스트 링크를 올려주세요!"
            style={styles.inputBox}
          />
        </View>

        {/* 등록 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>{isSubmitting ? '등록중...' : '등록하기'}</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputColumn: {
    marginBottom: 15,
  },
  label: {
    width: 50,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'preMedium',
    marginRight: 10,
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: 'preLight',
  },
  dateBox: {
    justifyContent: 'center',
  },
  contentBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    marginTop: 10,
    marginBottom: 150,
    minHeight: 160,
    fontFamily: 'preLight',
  },
  submitButton: {
    position: 'absolute',
    bottom: 350,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'godoMaum',
  },
});
