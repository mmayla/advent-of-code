const inputText = await Deno.readTextFile("./2022/day1.input");

const calories = inputText.split("\n");

const elves = calories.reduce(
  (groups: string[][], line) => {
    if (line === "") {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(line);
    }
    return groups;
  },
  [[]]
);

const elvesCaloriesSum = elves.map((elf) => {
  return elf.reduce((acc, cur) => acc + parseInt(cur), 0);
});

const topThree = elvesCaloriesSum.sort((a, b) => b - a).slice(0, 3);
const topThreeSum = topThree.reduce((acc, cur) => acc + cur, 0);

console.log(topThreeSum);
