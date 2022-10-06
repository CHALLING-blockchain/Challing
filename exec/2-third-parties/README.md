## Third parties

사용한 외부 서비스

### 카카오 로그인

사용자 인증을 위해 사용

#### 설정

- [카카오 디벨로퍼스](https://developers.kakao.com/)
- 로그인
- 내 애플리케이션
- 애플리케이션 추가하기
- 이메일 필수 동의를 위해 개발용 비즈 앱 전환 ([개인 개발자 비즈 앱 전환 방법](https://developers.kakao.com/docs/latest/ko/getting-started/app#biz-app-for-individual))
- 제품 설정 > 카카오 로그인
	- 활성화 & Redirect URI 등록
- 제품 설정 > 카카오 로그인 > 동의항목
	- 닉네임, 프로필 사진, 카카오계정(이메일) 필수 동의 설정
- 제품 설정 > 카카오 로그인 > 고급
	- Logout Redirect URI 등록
- 앱 설정 > 앱 키
	- REST API
		- 크리덴셜로 다루기 (저장소에 올라가지 않게)
			- 프론트엔드
				- .env.local
				- .env.production.local
			- 백엔드
				- application-production-secret.yml
