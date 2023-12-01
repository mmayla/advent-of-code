const inputText = await Deno.readTextFile("./2023/day1.input");

const lines = inputText.split("\n");

function findAllDigits(inputString: string) {
  const regex =
    /1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine/g;
  const results = [];
  let start = 0;

  while (start < inputString.length) {
    regex.lastIndex = start; // Set the starting point for the search
    const match = regex.exec(inputString);

    if (match) {
      results.push({ digit: match[0], index: match.index });
      start = match.index + 1; // Move past the current match
    } else {
      break; // No more matches found
    }
  }

  return results;
}

function convertDigitToNumber(digit: string) {
  const spelledDigits: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return digit.replace(
    /one|two|three|four|five|six|seven|eight|nine/g,
    (matched) => spelledDigits[matched]
  );
}

const numbersSum = lines.reduce((acc, curr) => {
  const digits = findAllDigits(curr);
  const firstDigit = convertDigitToNumber(digits[0].digit);
  const lastDigit = convertDigitToNumber(digits[digits.length - 1].digit);

  console.log(firstDigit, lastDigit);
  console.log(
    convertDigitToNumber(firstDigit),
    convertDigitToNumber(lastDigit)
  );

  return acc + Number(`${firstDigit}${lastDigit}`);
}, 0);

console.log(numbersSum);
