import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'agency';
  profile?: {
    school?: string;
    grade?: string;
    organization?: string;
    address?: string;
    phone?: string;
    university?: string;
    major?: string;
    selfIntroduction?: string;
    portfolio?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 저장된 사용자 정보 확인
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 여기서 AsyncStorage나 다른 저장소에서 사용자 정보를 가져옴
      // 예시로 하드코딩된 사용자 정보 사용
      const savedUser = null; // await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // 테스트용 기본 사용자 정보 설정
        const defaultUser: User = {
          id: '1',
          name: '강유림',
          email: 'test@example.com',
          type: 'student',
          profile: {
            university: '인하대학교',
            major: '인공지능공학과',
            selfIntroduction: '자기소개를 합니다.\n안녕하세요\n일단 대충 만들겠습니다.\n봉사정신 투철합니다.\n섬포터즈 화이팅',
            portfolio: 'www.tistory.com',
          },
        };
        setUser(defaultUser);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // 여기서 실제 로그인 API 호출
      // 예시로 하드코딩된 로그인 로직 사용
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: '테스트 사용자',
          email: email,
          type: 'student',
          profile: {
            school: '서울고등학교',
            grade: '2학년',
          },
        };
        setUser(mockUser);
        // await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // await AsyncStorage.removeItem('user');
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      // 여기서 실제 회원가입 API 호출
      // 예시로 하드코딩된 회원가입 로직 사용
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        type: userData.type || 'student',
        profile: userData.profile,
      };
      setUser(newUser);
      // await AsyncStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { 
        ...user, 
        ...profileData,
        profile: {
          ...user.profile,
          ...profileData.profile,
        }
      };
      
      setUser(updatedUser);
      // await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
