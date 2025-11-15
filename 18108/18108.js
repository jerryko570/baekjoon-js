// 문제 18108: 18108번: 1998년생인 내가 태국에서는 2541년생?!
// 입력 설명: 서기 연도를 알아보고 싶은 불기 연도 y 가&nbsp;주어진다. (1000 &le; y &le; 3000)

// TODO: 입력이 필요한 경우 아래 예시를 참고해서 직접 작성하세요.

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();

console.log(input - 543);
