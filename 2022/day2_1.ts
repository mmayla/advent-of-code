const inputText = await Deno.readTextFile("./2022/day2.input");

const rounds = inputText.split("\n");

// A, X Rock
// B, Y Paper
// C, Z Scissors
// "opponent player": score
const rpsCombinationScores: Record<string, number> = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,
  "B X": 0,
  "B Y": 3,
  "B Z": 6,
  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

const shapeScores: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const score = rounds.reduce((total, round) => {
  const [opponent, player] = round.split(" ");
  const score: number = rpsCombinationScores[`${opponent} ${player}`];
  return total + score + shapeScores[player];
}, 0);

console.log(score);
