const inputText = await Deno.readTextFile("./2023/day2.input");

const lines = inputText.split("\n");

const gameRegex = /Game (\d+):/;
const colorSetRegex = /(?:\d+ (?:blue|green|red),?\s?)+(?=;|$)/g;
const colorsRegex = /\d+ (blue|green|red)/g;

const games: Record<
  string,
  {
    blue: number;
    green: number;
    red: number;
  }[]
> = {};

lines.forEach((line) => {
  const gameMatch = line.match(gameRegex);
  const gameNumber = gameMatch ? gameMatch[1] : null;
  const colorSets = line.match(colorSetRegex);

  if (!gameNumber) throw new Error("No game number found");
  if (!colorSets) throw new Error("No color sets found");

  if (!Object.prototype.hasOwnProperty.call(games, gameNumber)) {
    games[gameNumber] = [];
  }

  colorSets.forEach((set) => {
    const matches = set.match(colorsRegex);
    let blue = 0;
    let green = 0;
    let red = 0;
    if (matches) {
      matches.forEach((match) => {
        const parts = match.split(" ");
        const number = parseInt(parts[0], 10);
        const color = parts[1] as "blue" | "green" | "red";

        if (color === "blue") blue = number;
        if (color === "green") green = number;
        if (color === "red") red = number;
      });
    }

    games[gameNumber].push({ blue, green, red });
  });
});

const bag = {
  blue: 14,
  green: 13,
  red: 12,
};

let gameNumberSum = 0;
Object.entries(games).forEach(([gameNumber, game]) => {
  let over = false;
  game.forEach((colorSet) => {
    if (
      colorSet.blue > bag.blue ||
      colorSet.green > bag.green ||
      colorSet.red > bag.red
    ) {
      over = true;
    }
  });

  if (!over) {
    gameNumberSum += parseInt(gameNumber, 10);
  }
});

// console.log(games);
console.log(gameNumberSum);
