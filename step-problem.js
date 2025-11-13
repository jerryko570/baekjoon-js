// step-problem.js
const fs = require("fs");
const { execSync } = require("child_process");

// solved.json 로드
function loadSolved() {
  if (!fs.existsSync("solved.json")) return [];
  return JSON.parse(fs.readFileSync("solved.json", "utf8"));
}

// solved.json 저장
function saveSolved(list) {
  fs.writeFileSync("solved.json", JSON.stringify(list, null, 2));
}

function main() {
  const step = process.argv[2];

  if (!step) {
    console.log("❗ 사용법: npm run step 1");
    return;
  }

  // steps.json 읽기
  const steps = JSON.parse(fs.readFileSync("steps.json", "utf8"));
  const problems = steps[step];

  if (!problems) {
    console.log(`❗ ${step}단계는 steps.json에 없습니다.`);
    return;
  }

  const solved = loadSolved();

  // 아직 풀지 않은 문제 찾기
  const nextProblem = problems.find((p) => !solved.includes(p));

  // 모든 문제 푼 경우
  if (!nextProblem) {
    console.log(`✨ ${step}단계 모든 문제 클리어!`);
    return;
  }

  console.log(`📘 단계 ${step} → 다음 문제: ${nextProblem}`);
  console.log("📥 문제 다운로드 중...");

  // download-problem.js 실행
  try {
    execSync(`node download-problem.js ${nextProblem}`, { stdio: "inherit" });
  } catch (err) {
    console.log("❌ 문제 생성 중 오류 발생:", err.message);
    return;
  }

  // 브랜치 생성 (네가 원치 않으면 제거)
  // execSync(`git checkout -b step${step}/${nextProblem}`, { stdio: "inherit" });

  // solved.json 업데이트
  solved.push(nextProblem);
  saveSolved(solved);

  console.log(`🎉 문제 ${nextProblem} 준비 완료!`);
}

main();
