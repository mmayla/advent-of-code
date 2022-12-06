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

let maxCalories = 0;
elves.forEach((elf) => {
  const sum = elf.reduce((acc, cur) => acc + parseInt(cur), 0);
  if (sum > maxCalories) {
    maxCalories = sum;
  }
});

console.log(maxCalories);
