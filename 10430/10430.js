// 문제 10430: 10430번: 나머지
// 입력 설명: 첫째 줄에 A, B, C가 순서대로 주어진다. (2&nbsp;&le; A, B, C &le; 10000)

// TODO: 입력이 필요한 경우 아래 예시를 참고해서 직접 작성하세요.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(" ").map(Number);

const A = input[0];
const B = input[1];
const C = input[2];

console.log((A + B) % C);
console.log(((A % C) + (B % C)) % C);
console.log((A * B) % C);
console.log(((A % C) * (B % C)) % C);
