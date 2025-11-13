// 문제 1000: A+B
// 입력 예시: node 1000.js < input.txt

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(" ");

// TODO: 여기서 문제 해결 코드 작성
const A = Number(input[0]);
const B = Number(input[1]);
console.log(A + B);
