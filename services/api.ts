// API 기본 설정 및 공통 함수들
import AsyncStorage from '@react-native-async-storage/async-storage';

// 개발 환경에서는 제공된 개발 서버 주소, 프로덕션에서는 공인 주소 사용
const API_BASE_URL = __DEV__ 
  ? 'http://165.246.80.9:8080' // 개발용 (제공된 서버)
  : 'https://api.sumpoterz.com'; // 프로덕션용 (공인 주소)

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  headers?: Record<string, string>;
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
      'Accept': 'application/json',
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
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 응답이 JSON인지 확인하고, 비-JSON 이더라도 성공 상태(200/201/204)면 성공으로 처리
    const contentType = response.headers.get('content-type');
    // 응답 헤더 수집
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    if (!contentType || !contentType.includes('application/json')) {
      // 본문이 비어있는 200/201/204 응답은 성공으로 간주
      if (response.ok) {
        const text = await response.text();
        if (!text) {
          return { success: true, headers: responseHeaders } as ApiResponse<T>;
        }
        // 텍스트 메시지가 있으면 메시지로 반환
        return { success: true, message: text, headers: responseHeaders } as ApiResponse<T>;
      }
      // 성공이 아닌데 JSON도 아니면 에러로 처리
      const text = await response.text();
      console.error('Non-JSON error response:', text);
      throw new Error(`Server returned non-JSON response: ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok) {
      // 서버에서 검증 오류 상세를 내려주는 경우 최대한 추출해서 메시지로 합칩니다.
      let detailedMessage = data?.message || data?.error || `HTTP error! status: ${response.status}`;

      // 흔한 필드: errors(배열/객체), violations, details
      const candidates = [data?.errors, data?.violations, data?.details, data?.fieldErrors, data?.errorMessages];
      const parts: string[] = [];

      for (const c of candidates) {
        if (!c) continue;
        if (Array.isArray(c)) {
          parts.push(
            ...c
              .map((v) => {
                if (typeof v === 'string') return v;
                if (v?.message) return v.message;
                if (v?.defaultMessage) return v.defaultMessage;
                if (v?.reason) return v.reason;
                return JSON.stringify(v);
              })
              .filter(Boolean)
          );
        } else if (typeof c === 'object') {
          parts.push(
            ...Object.entries(c).map(([key, value]) => {
              if (Array.isArray(value)) return `${key}: ${value.join(', ')}`;
              if (value?.message) return `${key}: ${value.message}`;
              return `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`;
            })
          );
        } else if (typeof c === 'string') {
          parts.push(c);
        }
      }

      if (parts.length > 0) {
        detailedMessage = `${detailedMessage}${detailedMessage.endsWith('.') ? '' : '.'} ${parts.join(' | ')}`;
      }

      throw new Error(detailedMessage);
    }

    // 성공(JSON) 응답을 통일된 형태로 반환
    if (typeof (data as any)?.success === 'boolean') {
      return { ...(data as any), headers: responseHeaders };
    }
    return { success: true, data, headers: responseHeaders } as ApiResponse<T>;
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
export const checkApiServer = async (): Promise<{ isAvailable: boolean; message: string; status?: number }> => {
  try {
    console.log('Checking API server at:', API_BASE_URL);
    
    // 타임아웃 설정 (5초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // 여러 후보 엔드포인트를 순차 확인 (하나라도 응답이 오면 연결 가능으로 판단)
    const candidates: Array<{ path: string; method: 'GET' | 'OPTIONS' }> = [
      { path: '/login', method: 'OPTIONS' },
      { path: '/posts', method: 'GET' },
      { path: '/members', method: 'GET' },
      { path: '/', method: 'GET' },
    ];

    for (const c of candidates) {
      try {
        const res = await fetch(`${API_BASE_URL}${c.path}`, {
          method: c.method,
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        // 응답 코드가 무엇이든(200~599) 도달만 되면 서버는 살아있다고 간주
        return { isAvailable: true, message: `서버 응답 상태: ${res.status}`, status: res.status };
      } catch (innerErr) {
        // 다음 후보로 진행
        continue;
      }
    }

    clearTimeout(timeoutId);
    return { isAvailable: false, message: '서버 응답 없음' };
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

