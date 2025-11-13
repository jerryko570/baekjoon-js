// download-problem.js
const fs = require("fs");
const axios = require("axios");
const { execSync } = require("child_process");

async function main() {
  const problemNumber = process.argv[2];

  if (!problemNumber) {
    console.log("❗ 사용법: node download-problem.js 1000");
    return;
  }

  const url = `https://www.acmicpc.net/problem/${problemNumber}`;
  console.log(`📥 Fetching problem ${problemNumber}...`);

  // 1. HTML 가져오기
  let html = "";
  try {
    const res = await axios.get(url);
    html = res.data;
  } catch (err) {
    console.error("❌ 문제 불러오기 실패:", err.message);
    return;
  }

  // 2. 제목 추출
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch
    ? titleMatch[1].replace("번 문제", "")
    : `문제 ${problemNumber}`;

  // 3. 입력 설명 추출
  const inputDescMatch = html.match(/<h2>입력[\s\S]*?<p>([\s\S]*?)<\/p>/);
  const inputDesc = inputDescMatch
    ? inputDescMatch[1].replace(/<[^>]*>/g, "").trim()
    : "입력 설명을 파싱하지 못했습니다.";

  // 4. 입력 형태 자동 판별
  let inputTemplate = "";
  if (inputDesc.includes("한 줄") && inputDesc.includes("공백")) {
    inputTemplate = `
const fs = require("fs");
const [A, B] = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

// TODO: 로직 작성
console.log(A + B);
`;
  } else if (inputDesc.includes("여러 줄") || inputDesc.includes("N개의 줄")) {
    inputTemplate = `
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\\n").map(Number);

// TODO: 로직 작성
console.log(input);
`;
  } else {
    inputTemplate = `
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// TODO: 로직 작성
console.log(input);
`;
  }

  // 5. 폴더 생성
  const dir = `${problemNumber}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // 6. js 파일 생성
  const template = `
// 문제 ${problemNumber}: ${title}
// 입력 설명: ${inputDesc}

${inputTemplate}
`;

  fs.writeFileSync(`${dir}/${problemNumber}.js`, template.trim());
  fs.writeFileSync(`${dir}/input.txt`, "");
  fs.writeFileSync(`${dir}/output.txt`, "");
  fs.writeFileSync(
    `${dir}/README.md`,
    `# ${problemNumber} - ${title}\n\n${inputDesc}`
  );

  console.log(`🎉 문제 ${problemNumber} 생성 완료!`);
}

main();
