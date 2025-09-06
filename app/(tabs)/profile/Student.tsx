import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopHeaderStudent from '../../../components/TopHeaderStudent';
import { useAuth } from '../../../context/AuthContext';

export default function StudentProfile() {
  const { user } = useAuth();
  const portfolioUrl = user?.profile?.portfolio || 'https://www.tistory.com';
  const department = (user as any)?.profile?.major || (user as any)?.profile?.department;

  const volunteerItems = [
    {
      id: '1',
      title: '한빛초등학교 AI교육봉사',
      date: '2025.10.08 ~ 10.10',
      status: '진행중' as const,
      thumbnail: require('../../../assets/images/StudentsImage.png'),
    },
    {
      id: '2',
      title: '은빛경로당 디지털교육봉사',
      date: '2025.03.12 ~ 03.13',
      status: '완료' as const,
      thumbnail: null,
    },
  ];

  const openPortfolio = () => {
    if (user?.profile?.portfolio) {
      Linking.openURL(user.profile.portfolio);
    } else {
      Linking.openURL(portfolioUrl);
    }
  };

  return (
    <>
      <TopHeaderStudent showBackButton={true} logoText="나의페이지" />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 정보 카드 */}
        <View style={styles.card}>
          <InfoRow label="이름" value={user?.name || ''} />
          <Separator />
          <InfoRow label="전화번호" value={user?.profile?.phone || ''} />
          <Separator />
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>대학명 & 학과</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user?.profile?.university || ''}</Text>
              <Text style={styles.infoValue}>{department || ''}</Text>
            </View>
          </View>
          <Separator />
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>자기소개</Text>
            <View style={styles.infoValueContainer}>
              {user?.profile?.selfIntroduction
                ? user.profile.selfIntroduction.split('\n').map((line, index) => (
                    <Text key={index} style={styles.infoValue}>{line || '자기소개를 입력해주세요'}</Text>
                  ))
                : <Text style={styles.infoValue}>자기소개를 입력해주세요</Text>}
            </View>
          </View>
          <Separator />
          <View style={styles.infoBlockRow}>
            <Text style={styles.infoLabel}>포트폴리오</Text>
            <TouchableOpacity onPress={openPortfolio}>
              <Text style={[styles.infoValue, styles.linkText]}>
                {user?.profile?.portfolio ? user.profile.portfolio : 'www.tistory.com… ?'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 나의 봉사 */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderText}>나의 봉사</Text>
        </View>
        <View style={styles.card}>
          {volunteerItems.map((item, index) => (
            <View key={item.id}>
              <View style={styles.volunteerRow}>
                {item.thumbnail ? (
                  <Image source={item.thumbnail} style={styles.volunteerThumb} />
                ) : (
                  <View style={styles.volunteerThumbPlaceholder} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.volunteerTitle}>{item.title}</Text>
                  <Text style={styles.volunteerDate}>{item.date}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    item.status === '진행중' ? styles.statusProgress : styles.statusDone,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      item.status === '진행중' ? styles.statusTextProgress : styles.statusTextDone,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              {index < volunteerItems.length - 1 && <Separator />}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBlockRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoBlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    gap: 14,
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
    marginBottom: 4,
    flex: 1,
  },
  infoValueContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  linkText: {
    color: '#0066CC',
    textDecorationLine: 'underline',
    right: '128%',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 0,
  },
  sectionHeaderRow: {
    marginTop: 26,
    paddingHorizontal: 2,
  },
  sectionHeaderText: {
    fontSize: 16,
    left: 4,
    color: '#222',
  },
  volunteerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 23,
  },
  volunteerThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
  },
  volunteerThumbPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#EAF5E9',
  },
  volunteerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  volunteerDate: {
    fontSize: 13,
    color: '#8A8A8A',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusProgress: {
    backgroundColor: '#FFECEC',
  },
  statusDone: {
    backgroundColor: '#E8F0FF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextProgress: {
    color: '#FF3B30',
  },
  statusTextDone: {
    color: '#3A7BFF',
  },
});
