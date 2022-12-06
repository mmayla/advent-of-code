const inputText = await Deno.readTextFile("./2022/day3.input");

const rucksacks = inputText.split("\n");

const LOWER_CASE_START = 1;
const UPPER_CASE_START = 27;

let sum = 0;
rucksacks.forEach((r) => {
  const halfIndex = r.length / 2;
  const firstCompartment = r.slice(0, halfIndex);
  const secondCompartment = r.slice(halfIndex);

  const firstCompartmentSet = new Set(firstCompartment.split(""));
  const secondCompartmentSet = new Set(secondCompartment.split(""));

  const intersection = new Set(
    [...firstCompartmentSet].filter((item) => secondCompartmentSet.has(item))
  );

  const commonItem: string = intersection.values().next().value;

  if (commonItem === commonItem.toLowerCase()) {
    sum += commonItem.charCodeAt(0) - "a".charCodeAt(0) + LOWER_CASE_START;
  } else {
    sum += commonItem.charCodeAt(0) - "A".charCodeAt(0) + UPPER_CASE_START;
  }
});

console.log(sum);
