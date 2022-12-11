const inputText = await Deno.readTextFile("./2022/day7.input");

const lines = inputText.split("\n");

const parseLine = (line: string): string[] => {
  return line.split(" ");
};

interface BaseNode {
  name: string;
  size: number | undefined;
  parent: DirectoryNode | undefined;
}

interface DirectoryNode extends BaseNode {
  type: "directory";
  children: Node[];
}

interface FileNode extends BaseNode {
  type: "file";
  size: number;
}

type Node = DirectoryNode | FileNode;

const findDirectory = (
  name: string,
  root: DirectoryNode
): DirectoryNode | undefined => {
  if (root.name === name) {
    return root;
  }
  const found = root.children.find((child) => child.name === name);
  if (found && found.type === "directory") {
    return found;
  }

  return undefined;
};

const createTree = (lines: string[]): DirectoryNode => {
  const tree: DirectoryNode = {
    name: "/",
    type: "directory",
    size: undefined,
    parent: undefined,
    children: [],
  };

  let currentDir = tree;
  lines.forEach((line) => {
    const parsedLine = parseLine(line);

    if (parsedLine[0] === "$") {
      const [_, command, arg] = parsedLine;
      if (command === "cd") {
        if (arg === "..") {
          if (currentDir.parent) {
            currentDir = currentDir.parent;
          } else {
            console.error("cd to nonexisting parent");
          }
          return;
        }
        const found = findDirectory(arg, currentDir);
        if (found) {
          currentDir = found;
        } else {
          console.error(`Directory not found ${arg}`);
        }
      }

      return;
    }

    const [info, name] = parsedLine;

    if (info === "dir") {
      currentDir.children.push({
        name,
        type: "directory",
        size: undefined,
        parent: currentDir,
        children: [],
      });
      return;
    }

    currentDir.children.push({
      name,
      type: "file",
      size: parseInt(info),
      parent: currentDir,
    });
  });

  return tree;
};

const MAX_DIR_SIZE = 100000;
let sizeSum = 0;

const calculateSizesRecursively = (node: DirectoryNode): number => {
  node.size = 0;
  for (const child of node.children) {
    if (child.type === "directory") {
      const dirSize = calculateSizesRecursively(child);
      if (dirSize < MAX_DIR_SIZE) {
        sizeSum += dirSize;
      }
      node.size += dirSize;
    } else {
      node.size += child.size;
    }
  }

  return node.size;
};

const root = createTree(lines);
const rootSize = calculateSizesRecursively(root);

console.log(root, rootSize, sizeSum);
