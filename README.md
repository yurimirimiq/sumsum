
# sumpoterz-project
지역상생 공모전 [ 섬포터즈 ]

## API 연결 상태

### 회원 관련 API
- ✅ 회원가입 (학생용) - `POST /members/signup/student`
- ✅ 회원가입 (기관용) - `POST /members/signup/institution`
- ✅ 로그인 - `POST /login`
- ✅ 로그아웃 - `POST /logout`
- ✅ 회원 정보 조회 - `GET /members`
- ✅ 회원 정보 조회 (기관→학생) - `GET /members?loginId=<loginId>`
- ✅ 회원 정보 수정 - `PATCH /members`
- ✅ 회원 탈퇴 - `POST /members`

### 학생 전용 API
- ✅ 포트폴리오 링크 수정 - `PATCH /members/student/portfolio`
- ✅ 봉사 신청 - `POST /applicants`
- ✅ 봉사 활동 내역 조회 - `GET /applicants?loginId=<loginId>`
- ✅ 섬포터즈 게시판 게시글 작성 - `POST /posts`
- ✅ 섬포터즈 게시판 게시글 수정 - `PATCH /posts`
- ✅ 섬포터즈 게시판 게시글 삭제 - `DELETE /posts`

### 기관 전용 API
- ✅ 봉사 공고 등록 - `POST /volunteer-works`
- ✅ 봉사 신청 학생 목록 조회 - `GET /volunteer-works/<int:pk>/applicant-list`
- ✅ 봉사 학생 선택 - `PATCH /volunteer-works/<int:pk>/selecting`
- ✅ 봉사 공고 수정 - `PATCH /volunteer-works/<int:pk>`
- ✅ 봉사 공고 마감/재개 - `PATCH /volunteer-works/<int:pk>/toggle`
- ✅ 봉사 공고 삭제 - `DELETE /volunteer-works/<int:pk>`

### 공통 API
- ✅ 봉사 공고 목록 조회 - `GET /volunteer-works`
- ✅ 봉사 공고 상세 조회 - `GET /volunteer-works/<int:pk>`
- ✅ 섬포터즈 게시판 게시글 조회 - `GET /posts`
- ✅ 섬포터즈 게시판 게시글 상세조회 - `GET /posts/<int:pk>`

### 구현된 기능
1. **인증 시스템**
   - JWT 토큰 기반 인증
   - AsyncStorage를 통한 토큰 저장/관리
   - 자동 로그인 상태 확인

2. **회원가입**
   - 학생용 회원가입 (대학교, 학과, 학년, 자기소개, 포트폴리오 포함)
   - 기관용 회원가입 (기관명, 기관유형, 주소, 기관소개 포함)
   - 입력값 검증 (아이디/비밀번호 형식, 이메일 형식)

3. **로그인/로그아웃**
   - 아이디/비밀번호 로그인
   - 로그인 상태 유지
   - 안전한 로그아웃

4. **프로필 관리**
   - 사용자 타입별 프로필 수정 (학생/기관)
   - 실시간 프로필 정보 업데이트
   - 학생 전용 포트폴리오 링크 수정

5. **학생 전용 기능**
   - 봉사활동 신청 및 내역 조회
   - 섬포터즈 게시판 게시글 작성/수정/삭제
   - 봉사활동 신청 상태 관리 (대기중/승인됨/거절됨/완료됨)

6. **기관 전용 기능**
   - 봉사 공고 등록/수정/삭제
   - 봉사 신청 학생 목록 조회 및 선택
   - 봉사 공고 마감/재개 관리
   - 신청자 상태 관리 (대기중/선택됨/거절됨)

7. **공통 기능**
   - 봉사 공고 목록 및 상세 조회
   - 섬포터즈 게시판 게시글 조회
   - 사용자 타입별 권한 관리

### 설정 방법
1. `services/api.ts` 파일에서 `API_BASE_URL`을 실제 API 서버 주소로 변경
2. 필요한 경우 API 응답 형식에 맞게 인터페이스 수정

### 사용된 기술
- React Native / Expo
- TypeScript
- AsyncStorage (토큰 저장)
- Context API (상태 관리)

