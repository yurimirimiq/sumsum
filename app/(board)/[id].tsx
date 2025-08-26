import { Ionicons } from "@expo/vector-icons"; // 아이콘
import { useLocalSearchParams } from "expo-router";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopHeaderBoard from "../../components/TopHeaderBoard";

export default function BoardDetail() {
  const { id } = useLocalSearchParams();

  // 임시 데이터
  const post = {
    id,
    title: `게시글 ${id}의 제목`,
    author: "오예송",
    date: "2025-08-14",
    link: "https://www.instagram.com",
    content: "여기는 게시글 상세 내용입니다.",
    profileImage: "https://via.placeholder.com/50", // 예시 프로필 이미지
  };

  const openLink = () => {
    Linking.openURL(post.link);
  };

  return (
    <>
      <TopHeaderBoard showBackButton={true} logoText="섬포터즈 게시판" />

      <View style={styles.container}>
        {/* 제목 + 프로필 */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.authorRow}>
            <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
            <Text style={styles.author}>{post.author}</Text>
          </View>
        </View>

        {/* 날짜 */}
        <Text style={styles.date}>봉사 시작 날짜 : {post.date}</Text>

        {/* 내용 */}
        <Text style={styles.content}>{post.content}</Text>

        {/* 인스타그램 링크 */}
        <TouchableOpacity style={styles.linkRow} onPress={openLink}>
          <Ionicons name="logo-instagram" size={20} color="#E1306C" />
          <Text style={styles.link}>{post.link}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: { fontSize: 22, fontWeight: "bold", flex: 1, marginRight: 10 },

  authorRow: { flexDirection: "row", alignItems: "center" },

  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#ddd",
  },

  author: { fontSize: 14, color: "gray" },

  date: { fontSize: 14, color: "gray", marginBottom: 30 },

  content: { fontSize: 16, lineHeight: 24, marginBottom: 30 },

  linkRow: { flexDirection: "row", alignItems: "center" },

  link: { fontSize: 14, color: "#E1306C", marginLeft: 6 },
});
