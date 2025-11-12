// 백준 1001번: A-B
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const A = Number(input[0]);
const B = Number(input[1]);
console.log(A - B);
console.log("입력값:", input);
