import { apiRequest, ApiResponse } from './api';

// 봉사 공고 목록 조회
export interface VolunteerWork {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxApplicants?: number;
  currentApplicants: number;
  requirements?: string;
  benefits?: string;
  isActive: boolean;
  createdAt: string;
  institutionName: string;
  institutionType: string;
}

export const getVolunteerWorks = async (): Promise<ApiResponse<VolunteerWork[]>> => {
  return apiRequest<VolunteerWork[]>('/volunteer-works');
};

// 봉사 공고 상세 조회
export interface VolunteerWorkDetail extends VolunteerWork {
  applicants?: any[];
}

export const getVolunteerWorkDetail = async (volunteerWorkId: string): Promise<ApiResponse<VolunteerWorkDetail>> => {
  return apiRequest<VolunteerWorkDetail>(`/volunteer-works/${volunteerWorkId}`);
};

// 섬포터즈 게시판 게시글 조회
export interface Post {
  id: string;
  title: string;
  content: string;
  date?: string;
  link?: string;
  createdAt: string;
  authorName: string;
  authorType: 'student' | 'institution';
}

export const getPosts = async (): Promise<ApiResponse<Post[]>> => {
  return apiRequest<Post[]>('/posts');
};

// 섬포터즈 게시판 게시글 상세조회
export interface PostDetail extends Post {
  // 추가 상세 정보가 있다면 여기에 추가
}

export const getPostDetail = async (postId: string): Promise<ApiResponse<PostDetail>> => {
  return apiRequest<PostDetail>(`/posts/${postId}`);
};
