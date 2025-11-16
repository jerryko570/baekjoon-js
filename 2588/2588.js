// 문제 2588: 2588번: 곱셈
// 입력 설명: 첫째 줄에 (1)의 위치에 들어갈 세 자리 자연수가, 둘째 줄에 (2)의 위치에 들어갈 세자리 자연수가 주어진다.

// TODO: 입력이 필요한 경우 아래 예시를 참고해서 직접 작성하세요.
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/); 

const A = input[0]
const B = input[1]

const b1 = Number(B[2])
const b2 = Number(B[1])
const b3 = Number(B[0])

console.log(Number(A)*b1)
console.log(Number(A)*b2)
console.log(Number(A)*b3)
console.log(Number(A)*Number(B))


