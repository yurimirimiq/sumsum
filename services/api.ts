// API 기본 설정 및 공통 함수들
import AsyncStorage from '@react-native-async-storage/async-storage';

// 개발 환경에서는 로컬 네트워크 주소, 프로덕션에서는 공인 주소 사용
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.55.64:8081' // 개발용 (로컬 네트워크)
  : 'https://api.sumpoterz.com'; // 프로덕션용 (공인 주소)

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    loginId: string;
    name: string;
    email: string;
    type: 'student' | 'institution';
  };
}

export interface StudentSignupRequest {
  loginId: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  university?: string;
  major?: string;
  grade?: string;
  selfIntroduction?: string;
  portfolio?: string;
}

export interface InstitutionSignupRequest {
  loginId: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  institutionName: string;
  institutionType: string;
  address: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  loginId: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'institution';
  university?: string;
  major?: string;
  grade?: string;
  selfIntroduction?: string;
  portfolio?: string;
  institutionName?: string;
  institutionType?: string;
  address?: string;
  description?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  university?: string;
  major?: string;
  grade?: string;
  selfIntroduction?: string;
  portfolio?: string;
  institutionName?: string;
  institutionType?: string;
  address?: string;
  description?: string;
}

// API 요청 헬퍼 함수
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // 기본 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // 토큰이 있으면 Authorization 헤더 추가
    const token = await getStoredToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 타임아웃 설정 (10초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 응답이 JSON인지 확인
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // JSON이 아닌 경우 (HTML 에러 페이지 등)
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(`Server returned non-JSON response: ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    
    let errorMessage = 'Unknown error occurred';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = '요청 시간이 초과되었습니다. 서버 상태를 확인해주세요.';
      } else if (error.message.includes('Network request failed')) {
        errorMessage = '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.';
      } else if (error.message.includes('fetch')) {
        errorMessage = '서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// 토큰 저장/조회 함수들 (AsyncStorage 사용)
async function getStoredToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Failed to get stored token:', error);
    return null;
  }
}

async function setStoredToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem('accessToken', token);
    console.log('Token stored:', token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
}

async function removeStoredToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem('accessToken');
    console.log('Token removed');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
}

// API 서버 상태 확인 함수
export const checkApiServer = async (): Promise<{ isAvailable: boolean; message: string }> => {
  try {
    console.log('Checking API server at:', API_BASE_URL);
    
    // 타임아웃 설정 (5초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    if (response.ok) {
      return { isAvailable: true, message: '서버 연결 성공' };
    } else {
      return { isAvailable: false, message: `서버 응답 오류: ${response.status}` };
    }
  } catch (error) {
    console.error('API server check failed:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return { isAvailable: false, message: '서버 연결 시간 초과' };
      } else if (error.message.includes('Network request failed')) {
        return { isAvailable: false, message: '네트워크 연결 실패' };
      } else {
        return { isAvailable: false, message: `연결 오류: ${error.message}` };
      }
    }
    
    return { isAvailable: false, message: '알 수 없는 오류' };
  }
};

export { API_BASE_URL, apiRequest, getStoredToken, removeStoredToken, setStoredToken };

