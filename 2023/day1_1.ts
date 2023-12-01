const inputText = await Deno.readTextFile("./2023/day1.input");

const lines = inputText.split("\n");

const digitsOnly = lines.map((line) => line.replace(/\D/g, ""));

const numbersSum = digitsOnly.reduce(
  (acc, curr) => acc + Number(`${curr[0]}${curr[curr.length - 1]}`),
  0
);

console.log(numbersSum);
