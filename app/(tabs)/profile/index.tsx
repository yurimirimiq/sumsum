import { View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import StudentProfile from './Student';
import AgencyProfile from './agency';

export default function ProfileIndex() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <View />;
  }

  const userType = (user?.type || '').toString().toLowerCase();
  const isInstitution = userType === 'institution' || userType === 'agency' || !!user?.profile?.institutionName || !!user?.profile?.institutionType;

  return isInstitution ? <AgencyProfile /> : <StudentProfile />;
}
