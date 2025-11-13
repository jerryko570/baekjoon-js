// download-problem.js
const fs = require("fs");
const axios = require("axios");

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
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9",
      },
    });
    html = res.data;
  } catch (err) {
    console.error("❌ 문제 불러오기 실패:", err.message);
    return;
  }

  // 2. 문제 제목 추출
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch
    ? titleMatch[1].replace("번 문제", "").trim()
    : `문제 ${problemNumber}`;

  // 3. 입력 설명 추출
  const inputBlock = html.match(/<h2[^>]*>입력<\/h2>([\s\S]*?)<h2/);
  const inputDesc = inputBlock
    ? inputBlock[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "입력 설명을 파싱하지 못했습니다.";

  // 4. A+B 자동 감지
  const isTwoNumbers = /공백|두 정수|A와 B|A B/.test(inputDesc);

  let inputTemplate = "";

  if (isTwoNumbers) {
    inputTemplate = `
// 문제 ${problemNumber}: ${title}
// 입력 설명: ${inputDesc}

const fs = require("fs");
const [A, B] = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);

// TODO: 로직 작성
console.log(A + B);
    `.trim();
  } else {
    inputTemplate = `
// 문제 ${problemNumber}: ${title}
// 입력 설명: ${inputDesc}

// TODO: 입력이 필요한 경우 아래 예시를 참고해서 직접 작성하세요.
// const fs = require("fs");
// const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);

console.log("문제 번호 ${problemNumber} 생성됨!");
    `.trim();
  }

  // 5. 폴더 생성
  const dir = `${problemNumber}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // 6. 파일 저장
  fs.writeFileSync(`${dir}/${problemNumber}.js`, inputTemplate);
  fs.writeFileSync(`${dir}/input.txt`, "");
  fs.writeFileSync(`${dir}/output.txt`, "");
  fs.writeFileSync(
    `${dir}/README.md`,
    `# ${problemNumber} - ${title}\n\n${inputDesc}`
  );

  console.log(`🎉 문제 ${problemNumber} 템플릿 생성 완료!`);
}

main();
