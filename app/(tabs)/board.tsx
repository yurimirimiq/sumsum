import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import TopHeaderBoard from '../../components/TopHeaderBoard';
import { customFonts } from '../../constants/fonts';

export default function BoardPage() {
  const router = useRouter();
  const [fontsLoaded] = useFonts(customFonts);

  // 임시 데이터
  const [posts, setPosts] = useState([
    { id: '1', title: '한빛초등학교 AI교육봉사', author: '학생1', date: '2024-01-15' },
    { id: '2', title: '땡떙요양원 증명사진촬영봉사', author: '학생2', date: '2024-01-14' },
    { id: '3', title: '무슨봉사', author: '학생3', date: '2024-01-13' },
  ]);

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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => router.push(`/(board)/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>봉사날짜 : {item.date}</Text>
          </Pressable>
        )}
      />
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10, // 모서리 둥글게
    borderWidth: 1, // 얇은 테두리
    borderColor: '#ddd', // 연한 회색 테두리
  },
  title: { 
    fontSize: 18, 
    fontFamily: 'preMedium',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 4,
  },
  date: { 
    color: '#666', 
    marginTop: 4,
    fontFamily: 'preLight',
    marginBottom: 4,
  },
});
