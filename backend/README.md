### bootRun with server DB

IntelliJ IDEA 에서 해야 함

- Gradle 패널에서 `bootRun` 최소 한 번 실행
- IntelliJ IDEA 툴바에서 `Run`
- `Edit Configurations...`
- Run 항목 중에 `bootRun` 복사
- 적당히 네이밍 후 `Run` 란에 다음과 같이 입력 후 저장 (하단 참고)
  - `bootRun -Pdb_host=<HOST> -Pdb_username=<USERNAME> -Pdb_password=<PASSWORD>`
  - `bootRun` 까지는 입력되어 있음
- Gradle 패널에서 새로고침
  - Run Configurations 하위에 생성됨
- 생성한 Run 으로 실행
