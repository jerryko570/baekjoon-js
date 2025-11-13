const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function downloadProblem(id) {
  const url = `https://www.acmicpc.net/problem/${id}`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  const $ = cheerio.load(data);

  const title = $("#problem_title").text().trim();
  const description = $("#problem_description").text().trim();
  const inputDesc = $("#problem_input").text().trim();
  const outputDesc = $("#problem_output").text().trim();

  const sampleInput = $("#sample-input-1").text().trim();
  const sampleOutput = $("#sample-output-1").text().trim();

  const folder = `${id}`;
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  // 문제 코드 파일
  fs.writeFileSync(
    `${folder}/${id}.js`,
    `// 문제 ${id}: ${title}
// 입력 예시: node ${id}.js < input.txt

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split("\\n");

// TODO: 여기서 문제 해결 코드 작성
console.log(input);
`
  );

  // 예제 파일
  fs.writeFileSync(`${folder}/input.txt`, sampleInput || "");
  fs.writeFileSync(`${folder}/output.txt`, sampleOutput || "");

  // 문제 설명 파일
  fs.writeFileSync(
    `${folder}/README.md`,
    `# ${id}. ${title}

## 📘 문제 설명
${description}

## 📥 입력 설명
${inputDesc}

## 📤 출력 설명
${outputDesc}

## 🔍 예제 입력
\`\`\`
${sampleInput}
\`\`\`

## 🔍 예제 출력
\`\`\`
${sampleOutput}
\`\`\`
`
  );

  console.log(`📥 문제 ${id} 다운로드 완료!`);
}

const id = process.argv[2];
if (!id) {
  console.log("문제 번호를 입력하세요");
  process.exit(1);
}

downloadProblem(id);
