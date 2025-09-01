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

  if (response.success && response.data) {
    // 로그인 성공 시 토큰 저장
    await setStoredToken(response.data.accessToken);
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
