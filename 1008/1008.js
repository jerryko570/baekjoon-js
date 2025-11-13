// 문제 1008: 1008번: A/B
// 입력 설명: 첫째 줄에 A와 B가 주어진다. (0 &lt; A, B &lt; 10)

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

// TODO: 로직 작성
const A = input[0];
const B = input[1];
console.log(A / B);
