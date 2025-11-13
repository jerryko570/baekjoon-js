// step-problem.js
const fs = require("fs");
const { execSync } = require("child_process");

function loadSolved() {
  if (!fs.existsSync("solved.json")) return [];
  return JSON.parse(fs.readFileSync("solved.json", "utf8"));
}

function main() {
  const step = process.argv[2];

  if (!step) {
    console.log("❗ 사용법: npm run step 1");
    return;
  }

  const steps = JSON.parse(fs.readFileSync("steps.json", "utf8"));
  const problems = steps[step];

  if (!problems) {
    console.log(`❗ ${step}단계는 steps.json에 없습니다.`);
    return;
  }

  const solved = loadSolved();

  const nextProblem = problems.find((p) => !solved.includes(p));

  if (!nextProblem) {
    console.log(`✨ ${step}단계 모든 문제 클리어!`);
    return;
  }

  console.log(`📘 단계 ${step} → 다음 문제: ${nextProblem}`);
  console.log("📥 문제 다운로드 중...");

  execSync(`node download-problem.js ${nextProblem}`, { stdio: "inherit" });

  execSync(`git checkout -b step${step}/${nextProblem}`, { stdio: "inherit" });

  solved.push(nextProblem);
  fs.writeFileSync("solved.json", JSON.stringify(solved, null, 2));
}

main();
