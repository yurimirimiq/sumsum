import { apiRequest, ApiResponse } from './api';

// 포트폴리오 링크 수정
export interface UpdatePortfolioRequest {
  portfolio: string;
}

export const updatePortfolio = async (data: UpdatePortfolioRequest): Promise<ApiResponse> => {
  return apiRequest('/members/student/portfolio', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 봉사 신청
export interface VolunteerApplicationRequest {
  volunteerId: string;
  message?: string;
}

export const applyForVolunteer = async (data: VolunteerApplicationRequest): Promise<ApiResponse> => {
  return apiRequest('/applicants', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 봉사 활동 내역 조회
export interface VolunteerApplication {
  id: string;
  volunteerId: string;
  volunteerTitle: string;
  volunteerDate: string;
  volunteerLocation: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  appliedAt: string;
  message?: string;
}

export const getVolunteerHistory = async (loginId: string): Promise<ApiResponse<VolunteerApplication[]>> => {
  return apiRequest<VolunteerApplication[]>(`/applicants?loginId=${encodeURIComponent(loginId)}`);
};

// 섬포터즈 게시판 게시글 작성
export interface CreatePostRequest {
  title: string;
  content: string;
  date?: string;
  link?: string;
}

export const createPost = async (data: CreatePostRequest): Promise<ApiResponse> => {
  return apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 섬포터즈 게시판 게시글 수정
export interface UpdatePostRequest {
  title?: string;
  content?: string;
  date?: string;
  link?: string;
}

export const updatePost = async (postId: string, data: UpdatePostRequest): Promise<ApiResponse> => {
  return apiRequest(`/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 섬포터즈 게시판 게시글 삭제
export const deletePost = async (postId: string): Promise<ApiResponse> => {
  return apiRequest(`/posts/${postId}`, {
    method: 'DELETE',
  });
};
