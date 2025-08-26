import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { ThemedView } from '../../../components/ThemedView';
import TopHeaderAgency from '../../../components/TopHeaderAgency';

export default function AgencyProfile() {
  return (  
    <>
    <TopHeaderAgency
      showBackButton={true}
      logoText='기관페이지'
    />

    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.title}>기관 마이페이지</ThemedText>
        
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>기관 정보</ThemedText>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>기관명:</ThemedText>
            <ThemedText style={styles.value}>서울시립복지관</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>주소:</ThemedText>
            <ThemedText style={styles.value}>서울시 강남구</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>연락처:</ThemedText>
            <ThemedText style={styles.value}>02222-1234-5678</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>봉사활동 관리</ThemedText>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>등록한 봉사:</ThemedText>
            <ThemedText style={styles.value}>8건</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>진행중인 봉사:</ThemedText>
            <ThemedText style={styles.value}>3건</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={styles.label}>완료된 봉사:</ThemedText>
            <ThemedText style={styles.value}>5건</ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
    </>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#FF3B30',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
});
