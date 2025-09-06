import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TopHeaderAgency from '../../../components/TopHeaderAgency';
import { useAuth } from '../../../context/AuthContext';

export default function AgencyProfile() {
  const { user } = useAuth();
  return (  
    <>
    <TopHeaderAgency
      showBackButton={true}
      logoText='기관페이지'
    />

    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>기관페이지</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기관 정보</Text>
          <View style={styles.infoItem}>
            <Text style={styles.label}>기관명:</Text>
            <Text style={styles.value}>{user?.profile?.institutionName || user?.name || ''}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>주소:</Text>
            <Text style={styles.value}>{user?.profile?.address || ''}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>연락처:</Text>
            <Text style={styles.value}>{user?.profile?.phone || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>등록한 봉사</Text>
          <View style={styles.infoItem}>
            <Text style={styles.label}>등록한 봉사:</Text>
            <Text style={styles.value}>0건</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
