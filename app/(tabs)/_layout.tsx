import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

const icons = {
  home: require('@/components/common/home2.png'),
  calendar: require('@/components/common/calendar2.png'),
  bell: require('@/components/common/bell2.png'),
  user: require('@/components/common/user2.png'),
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderIcon = (source: any, color: string) => (
    <View style={styles.tabIcon}>
      <Image source={source} style={[styles.iconImage, { tintColor: color }]} resizeMode="contain" />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 15,
          paddingTop: 10,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
          flex: 1,
          maxWidth: '25%',
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: '',
          tabBarIcon: ({ color }) => renderIcon(icons.home, color),
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: '',
          tabBarIcon: ({ color }) => renderIcon(icons.calendar, color),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: '',
          tabBarIcon: ({ color }) => renderIcon(icons.bell, color),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => renderIcon(icons.user, color),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
});
