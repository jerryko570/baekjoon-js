// 문제 10869: 문제 10869
// 입력 설명: 두 자연수 A와 B가 주어진다. 이때, A+B, A-B, A*B, A/B(몫), A%B(나머지)를 출력하는 프로그램을 작성하시오.

// TODO: 입력이 필요한 경우 아래 예시를 참고해서 직접 작성하세요.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const A = input[0];
const B = input[1];

console.log(A + B);
console.log(A - B);
console.log(A * B);
console.log(Math.floor(A / B));
console.log(A % B);
