const inputText = await Deno.readTextFile("./2022/day3.input");

const rucksacks = inputText.split("\n");

const LOWER_CASE_START = 1;
const UPPER_CASE_START = 27;

const intersectSets = (set1: Set<string>, set2: Set<string>): Set<string> => {
  return new Set([...set1].filter((item) => set2.has(item)));
};

let sum = 0;

for (let r = 0; r < rucksacks.length; r += 3) {
  const firstCompartmentSet = new Set(rucksacks[r]);
  const secondCompartmentSet = new Set(rucksacks[r + 1]);
  const thirdCompartmentSet = new Set(rucksacks[r + 2]);

  const firstAndSecondIntersection = intersectSets(
    firstCompartmentSet,
    secondCompartmentSet
  );
  const allIntersection = intersectSets(
    firstAndSecondIntersection,
    thirdCompartmentSet
  );

  const commonItem: string = allIntersection.values().next().value;

  if (commonItem === commonItem.toLowerCase()) {
    sum += commonItem.charCodeAt(0) - "a".charCodeAt(0) + LOWER_CASE_START;
  } else {
    sum += commonItem.charCodeAt(0) - "A".charCodeAt(0) + UPPER_CASE_START;
  }
}

console.log(sum);
