import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
    login as apiLogin,
    logout as apiLogout,
    deleteMember,
    getMemberInfo,
    signupInstitution,
    signupStudent,
    updateMemberInfo
} from '../services/authService';
import {
    getPostDetail as getPostDetailAPI,
    getPosts as getPostsAPI,
    getVolunteerWorkDetail as getVolunteerWorkDetailAPI,
    getVolunteerWorks as getVolunteerWorksAPI
} from '../services/commonService';
import {
    createVolunteerWork as createVolunteerWorkAPI,
    deleteVolunteerWork as deleteVolunteerWorkAPI,
    getVolunteerApplicants as getVolunteerApplicantsAPI,
    selectVolunteerStudent as selectVolunteerStudentAPI,
    toggleVolunteerWork as toggleVolunteerWorkAPI,
    updateVolunteerWork as updateVolunteerWorkAPI
} from '../services/institutionService';
import {
    applyForVolunteer as applyForVolunteerAPI,
    createPost as createPostAPI,
    deletePost as deletePostAPI,
    getVolunteerHistory as getVolunteerHistoryAPI,
    updatePortfolio as updatePortfolioAPI,
    updatePost as updatePostAPI
} from '../services/studentService';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'institution';
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
    institutionName?: string;
    institutionType?: string;
    description?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginId: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  registerStudent: (userData: any) => Promise<{ success: boolean; message?: string }>;
  registerInstitution: (userData: any) => Promise<{ success: boolean; message?: string }>;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  refreshUserInfo: () => Promise<void>;
  
  // 학생 전용 함수들
  updatePortfolio: (portfolio: string) => Promise<boolean>;
  applyForVolunteer: (volunteerId: string, message?: string) => Promise<boolean>;
  getVolunteerHistory: () => Promise<any[]>;
  createPost: (title: string, content: string, date?: string, link?: string) => Promise<boolean>;
  updatePost: (postId: string, data: any) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
  
  // 기관 전용 함수들
  createVolunteerWork: (data: any) => Promise<boolean>;
  getVolunteerApplicants: (volunteerWorkId: string) => Promise<any[]>;
  selectVolunteerStudent: (volunteerWorkId: string, studentId: string, status: 'selected' | 'rejected') => Promise<boolean>;
  updateVolunteerWork: (volunteerWorkId: string, data: any) => Promise<boolean>;
  toggleVolunteerWork: (volunteerWorkId: string) => Promise<boolean>;
  deleteVolunteerWork: (volunteerWorkId: string) => Promise<boolean>;
  
  // 공통 함수들
  getVolunteerWorks: () => Promise<any[]>;
  getVolunteerWorkDetail: (volunteerWorkId: string) => Promise<any>;
  getPosts: () => Promise<any[]>;
  getPostDetail: (postId: string) => Promise<any>;
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
      // 저장된 토큰이 있는지 확인하고 사용자 정보 조회
      const response = await getMemberInfo();
      if (response.success && response.data) {
        const userData = response.data;
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          type: userData.type,
          profile: {
            phone: userData.phone,
            university: userData.university,
            major: userData.major,
            grade: userData.grade,
            selfIntroduction: userData.selfIntroduction,
            portfolio: userData.portfolio,
            institutionName: userData.institutionName,
            institutionType: userData.institutionType,
            address: userData.address,
            description: userData.description,
          },
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginId: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await apiLogin({ loginId: loginId.trim(), password: password.trim() });
      
      if (response.success) {
        // 토큰/세션 기반 모두 대응: 로그인 직후 사용자 정보 조회
        const me = await getMemberInfo();
        if (me.success && me.data) {
          const userData = me.data;
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            type: userData.type,
          };
          setUser(user);
          return { success: true };
        }
        return { success: false, message: me.error || '사용자 정보를 불러오지 못했습니다.' };
      }
      // 비정상 응답(예: 서버가 500이지만 세션을 이미 심은 경우)을 대비한 보정: 바로 내 정보 조회 시도
      const meFallback = await getMemberInfo();
      if (meFallback.success && meFallback.data) {
        const userData = meFallback.data;
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          type: userData.type,
        };
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.error || response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      console.error('Login failed:', error);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  const registerStudent = async (userData: any): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await signupStudent(userData);
      return { success: response.success, message: response.error || response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      console.error('Student registration failed:', error);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const registerInstitution = async (userData: any): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await signupInstitution(userData);
      return { success: response.success, message: response.error || response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : '기관 회원가입에 실패했습니다.';
      console.error('Institution registration failed:', error);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const response = await updateMemberInfo(profileData);
      
      if (response.success) {
        const updatedUser = { 
          ...user, 
          ...profileData,
          profile: {
            ...user.profile,
            ...profileData.profile,
          }
        };
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      const response = await deleteMember();
      if (response.success) {
        setUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Account deletion failed:', error);
      return false;
    }
  };

  const refreshUserInfo = async (): Promise<void> => {
    try {
      const response = await getMemberInfo();
      if (response.success && response.data) {
        const userData = response.data;
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          type: userData.type,
          profile: {
            phone: userData.phone,
            university: userData.university,
            major: userData.major,
            grade: userData.grade,
            selfIntroduction: userData.selfIntroduction,
            portfolio: userData.portfolio,
            institutionName: userData.institutionName,
            institutionType: userData.institutionType,
            address: userData.address,
            description: userData.description,
          },
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Failed to refresh user info:', error);
    }
  };

  // 학생 전용 함수들
  const updatePortfolio = async (portfolio: string): Promise<boolean> => {
    try {
      const response = await updatePortfolioAPI({ portfolio });
      if (response.success && user) {
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            portfolio,
          },
        };
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Portfolio update failed:', error);
      return false;
    }
  };

  const applyForVolunteer = async (volunteerId: string, message?: string): Promise<boolean> => {
    try {
      const response = await applyForVolunteerAPI({ volunteerId, message });
      return response.success;
    } catch (error) {
      console.error('Volunteer application failed:', error);
      return false;
    }
  };

  const getVolunteerHistory = async (): Promise<any[]> => {
    try {
      if (!user) return [];
      const response = await getVolunteerHistoryAPI(user.id);
      return response.success ? response.data || [] : [];
    } catch (error) {
      console.error('Failed to get volunteer history:', error);
      return [];
    }
  };

  const createPost = async (title: string, content: string, date?: string, link?: string): Promise<boolean> => {
    try {
      const response = await createPostAPI({ title, content, date, link });
      return response.success;
    } catch (error) {
      console.error('Post creation failed:', error);
      return false;
    }
  };

  const updatePost = async (postId: string, data: any): Promise<boolean> => {
    try {
      const response = await updatePostAPI(postId, data);
      return response.success;
    } catch (error) {
      console.error('Post update failed:', error);
      return false;
    }
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    try {
      const response = await deletePostAPI(postId);
      return response.success;
    } catch (error) {
      console.error('Post deletion failed:', error);
      return false;
    }
  };

  // 기관 전용 함수들
  const createVolunteerWork = async (data: any): Promise<boolean> => {
    try {
      const response = await createVolunteerWorkAPI(data);
      return response.success;
    } catch (error) {
      console.error('Volunteer work creation failed:', error);
      return false;
    }
  };

  const getVolunteerApplicants = async (volunteerWorkId: string): Promise<any[]> => {
    try {
      const response = await getVolunteerApplicantsAPI(volunteerWorkId);
      return response.success ? response.data || [] : [];
    } catch (error) {
      console.error('Failed to get volunteer applicants:', error);
      return [];
    }
  };

  const selectVolunteerStudent = async (volunteerWorkId: string, studentId: string, status: 'selected' | 'rejected'): Promise<boolean> => {
    try {
      const response = await selectVolunteerStudentAPI(volunteerWorkId, { studentId, status });
      return response.success;
    } catch (error) {
      console.error('Student selection failed:', error);
      return false;
    }
  };

  const updateVolunteerWork = async (volunteerWorkId: string, data: any): Promise<boolean> => {
    try {
      const response = await updateVolunteerWorkAPI(volunteerWorkId, data);
      return response.success;
    } catch (error) {
      console.error('Volunteer work update failed:', error);
      return false;
    }
  };

  const toggleVolunteerWork = async (volunteerWorkId: string): Promise<boolean> => {
    try {
      const response = await toggleVolunteerWorkAPI(volunteerWorkId);
      return response.success;
    } catch (error) {
      console.error('Volunteer work toggle failed:', error);
      return false;
    }
  };

  const deleteVolunteerWork = async (volunteerWorkId: string): Promise<boolean> => {
    try {
      const response = await deleteVolunteerWorkAPI(volunteerWorkId);
      return response.success;
    } catch (error) {
      console.error('Volunteer work deletion failed:', error);
      return false;
    }
  };

  // 공통 함수들
  const getVolunteerWorks = async (): Promise<any[]> => {
    try {
      const response = await getVolunteerWorksAPI();
      return response.success ? response.data || [] : [];
    } catch (error) {
      console.error('Failed to get volunteer works:', error);
      return [];
    }
  };

  const getVolunteerWorkDetail = async (volunteerWorkId: string): Promise<any> => {
    try {
      const response = await getVolunteerWorkDetailAPI(volunteerWorkId);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Failed to get volunteer work detail:', error);
      return null;
    }
  };

  const getPosts = async (): Promise<any[]> => {
    try {
      const response = await getPostsAPI();
      return response.success ? response.data || [] : [];
    } catch (error) {
      console.error('Failed to get posts:', error);
      return [];
    }
  };

  const getPostDetail = async (postId: string): Promise<any> => {
    try {
      const response = await getPostDetailAPI(postId);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Failed to get post detail:', error);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    registerStudent,
    registerInstitution,
    updateProfile,
    deleteAccount,
    refreshUserInfo,
    updatePortfolio,
    applyForVolunteer,
    getVolunteerHistory,
    createPost,
    updatePost,
    deletePost,
    createVolunteerWork,
    getVolunteerApplicants,
    selectVolunteerStudent,
    updateVolunteerWork,
    toggleVolunteerWork,
    deleteVolunteerWork,
    getVolunteerWorks,
    getVolunteerWorkDetail,
    getPosts,
    getPostDetail,
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
