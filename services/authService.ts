import {
    apiRequest,
    ApiResponse,
    InstitutionSignupRequest,
    LoginRequest,
    LoginResponse,
    removeStoredToken,
    setStoredToken,
    StudentSignupRequest,
    UpdateProfileRequest,
    UserProfile
} from './api';

// 회원가입 - 학생용
export const signupStudent = async (data: StudentSignupRequest): Promise<ApiResponse> => {
  return apiRequest('/members/signup/student', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 회원가입 - 기관용
export const signupInstitution = async (data: InstitutionSignupRequest): Promise<ApiResponse> => {
  return apiRequest('/members/signup/institution', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 로그인
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // 서버가 토큰을 본문으로 안 주는 케이스도 있어 세션 기반 로그인 지원
  if (response.success) {
    // 1) 본문 토큰
    if (response.data?.accessToken) {
      await setStoredToken(response.data.accessToken);
    }
    // 2) 헤더 토큰 (예: Authorization: Bearer <token>)
    const authHeader = response.headers?.authorization || response.headers?.Authorization;
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const token = authHeader.slice(7).trim();
      if (token) {
        await setStoredToken(token);
      }
    }
  }

  return response;
};

// 로그아웃
export const logout = async (): Promise<ApiResponse> => {
  const response = await apiRequest('/logout', {
    method: 'POST',
  });

  // 로그아웃 시 토큰 제거
  await removeStoredToken();

  return response;
};

// 회원 정보 조회
export const getMemberInfo = async (): Promise<ApiResponse<UserProfile>> => {
  return apiRequest<UserProfile>('/members');
};

// 회원 정보 조회 (기관→학생)
export const getStudentInfo = async (loginId: string): Promise<ApiResponse<UserProfile>> => {
  return apiRequest<UserProfile>(`/members?loginId=${encodeURIComponent(loginId)}`);
};

// 회원 정보 수정
export const updateMemberInfo = async (data: UpdateProfileRequest): Promise<ApiResponse> => {
  return apiRequest('/members', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 회원 탈퇴
export const deleteMember = async (): Promise<ApiResponse> => {
  const response = await apiRequest('/members', {
    method: 'POST',
  });

  if (response.success) {
    // 탈퇴 성공 시 토큰 제거
    await removeStoredToken();
  }

  return response;
};
