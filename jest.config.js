module.exports = {
  // 해당 패턴에 일치하는 경로가 존재할 경우 테스트를 하지 않고 넘어갑니다.
  testPathIgnorePatterns: [
    "/node_modules/(?!my-package)(.*)", // 노드모듈스 모든테스트 코드 파일 제외
  ],
  // 테스트 실행 시 각 TestCase에 대한 출력을 해줍니다.
  // jest --verbose와 동일한 역할을 함
  verbose: true, // jest실행시 상세하게 보고싶을 때
};
