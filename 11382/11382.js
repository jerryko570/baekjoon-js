// 문제 11382: 11382번: 꼬마 정민
// 입력 설명: 첫 번째 줄에 A, B, C (1 &le; A, B, C &le; 10 12 )이 공백을 사이에 두고 주어진다.

const fs = require("fs");
const [A, B, C] = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

console.log(A + B + C);