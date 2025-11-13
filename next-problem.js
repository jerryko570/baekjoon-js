const axios = require("axios");
const { execSync } = require("child_process");
const fs = require("fs");

async function getAlreadySolved() {
  if (!fs.existsSync("solved.json")) return [];
  return JSON.parse(fs.readFileSync("solved.json"));
}

async function getEasyProblems() {
  const res = await axios.get(
    "https://solved.ac/api/v3/search/problem?query=solvable:true&sort=level&direction=asc"
  );

  return res.data.items.map((p) => p.problemId);
}

async function main() {
  const solved = await getAlreadySolved();
  const all = await getEasyProblems();

  // 이미 푼 문제 제외
  const next = all.find((id) => !solved.includes(id));

  if (!next) {
    console.log("😎 모든 문제를 다 풀었습니다!");
    return;
  }

  // 푼 문제 기록 저장
  solved.push(next);
  fs.writeFileSync("solved.json", JSON.stringify(solved, null, 2));

  console.log(`📥 다음 문제: ${next}`);
  console.log("📥 다운로드 중...");

  // 🔥 boj download 제거하고 직접 만든 downloader 사용
  execSync(`node download-problem.js ${next}`, { stdio: "inherit" });

  console.log(`🌿 git 브랜치 생성: boj/${next}`);
  execSync(`git checkout -b boj/${next}`, { stdio: "inherit" });
}

main();
