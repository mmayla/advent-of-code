const inputText = await Deno.readTextFile("./2022/day2.input");

const rounds = inputText.split("\n");

enum Shape {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

// A Rock
// B Paper
// C Scissors
// "opponent score": player
const combinationScores: Record<string, Shape> = {
  "A 3": Shape.ROCK,
  "A 6": Shape.PAPER,
  "A 0": Shape.SCISSORS,
  "B 0": Shape.ROCK,
  "B 3": Shape.PAPER,
  "B 6": Shape.SCISSORS,
  "C 6": Shape.ROCK,
  "C 0": Shape.PAPER,
  "C 3": Shape.SCISSORS,
};

const outcomeMap: Record<string, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

const score = rounds.reduce((total, round) => {
  const [opponent, outcome] = round.split(" ");
  const outcomeScore = outcomeMap[outcome];
  const shape = combinationScores[`${opponent} ${outcomeScore}`];
  return total + outcomeScore + shape;
}, 0);

console.log(score);
