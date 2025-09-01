import { apiRequest, ApiResponse } from './api';

// 봉사 공고 등록
export interface CreateVolunteerWorkRequest {
  title: string;
  description: string;
  date: string;
  location: string;
  maxApplicants?: number;
  requirements?: string;
  benefits?: string;
}

export const createVolunteerWork = async (data: CreateVolunteerWorkRequest): Promise<ApiResponse> => {
  return apiRequest('/volunteer-works', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 봉사 신청 학생 목록 조회
export interface VolunteerApplicant {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentUniversity: string;
  studentMajor: string;
  studentGrade: string;
  appliedAt: string;
  message?: string;
  status: 'pending' | 'selected' | 'rejected';
}

export const getVolunteerApplicants = async (volunteerWorkId: string): Promise<ApiResponse<VolunteerApplicant[]>> => {
  return apiRequest<VolunteerApplicant[]>(`/volunteer-works/${volunteerWorkId}/applicant-list`);
};

// 봉사 학생 선택
export interface SelectStudentRequest {
  studentId: string;
  status: 'selected' | 'rejected';
}

export const selectVolunteerStudent = async (volunteerWorkId: string, data: SelectStudentRequest): Promise<ApiResponse> => {
  return apiRequest(`/volunteer-works/${volunteerWorkId}/selecting`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 봉사 공고 수정
export interface UpdateVolunteerWorkRequest {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  maxApplicants?: number;
  requirements?: string;
  benefits?: string;
}

export const updateVolunteerWork = async (volunteerWorkId: string, data: UpdateVolunteerWorkRequest): Promise<ApiResponse> => {
  return apiRequest(`/volunteer-works/${volunteerWorkId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 봉사 공고 마감/재개
export const toggleVolunteerWork = async (volunteerWorkId: string): Promise<ApiResponse> => {
  return apiRequest(`/volunteer-works/${volunteerWorkId}/toggle`, {
    method: 'PATCH',
  });
};

// 봉사 공고 삭제
export const deleteVolunteerWork = async (volunteerWorkId: string): Promise<ApiResponse> => {
  return apiRequest(`/volunteer-works/${volunteerWorkId}`, {
    method: 'DELETE',
  });
};
