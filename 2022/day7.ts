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

const findSubDirectory = (
  name: string,
  root: DirectoryNode
): DirectoryNode | undefined => {
  const found = root.children.find((child) => child.name === name);
  if (found && found.type === "directory") {
    return found;
  }

  return undefined;
};

type Command = "cd" | "ls";

const handleCommand = (
  command: Command,
  arg: string,
  root: DirectoryNode,
  currentDir: DirectoryNode
): DirectoryNode => {
  if (command !== "cd") {
    return currentDir;
  }

  if (arg === "..") {
    if (currentDir.parent) {
      return currentDir.parent;
    } else {
      console.error("cd to nonexisting parent");
    }
  } else {
    if (arg === "/") {
      return root;
    }
    const found = findSubDirectory(arg, currentDir);
    if (found) {
      return found;
    } else {
      console.error(`Directory not found ${arg}`);
    }
  }

  return currentDir;
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
      currentDir = handleCommand(command as Command, arg, tree, currentDir);
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

const MAX_DIR_SIZE = 10_0000;
const TOTAL_DISK_SIZE = 70_000_000;
const REQUIRED_DISK_SIZE = 30_000_000;
let totalSizeLessThanMax = 0;

const calculateSizesRecursively = (node: DirectoryNode): number => {
  node.size = 0;
  for (const child of node.children) {
    if (child.type === "directory") {
      const dirSize = calculateSizesRecursively(child);
      if (dirSize < MAX_DIR_SIZE) {
        totalSizeLessThanMax += dirSize;
      }
      node.size += dirSize;
    } else {
      node.size += child.size;
    }
  }

  return node.size;
};

const findMinDirectoryAbove = (
  threshold: number,
  root: DirectoryNode
): number => {
  let minSize = Infinity;
  const stack: DirectoryNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node && node.size && node.size >= threshold) {
      if (node.size < minSize) {
        minSize = node.size;
      }
      node.children.forEach((child) => {
        if (child.type === "directory") {
          stack.push(child);
        }
      });
    }
  }

  return minSize;
};

const root = createTree(lines);
const rootSize = calculateSizesRecursively(root);
const unusedDiskSpace = TOTAL_DISK_SIZE - rootSize;
const neededDiskSpace = REQUIRED_DISK_SIZE - unusedDiskSpace;

const minDirectorySize = findMinDirectoryAbove(neededDiskSpace, root);

console.log("Root size:", rootSize);
console.log("Unused disk space:", unusedDiskSpace);
console.log("Needed disk space:", neededDiskSpace);
console.log("Part 1 result:", totalSizeLessThanMax);
console.log("Part 2 result:", minDirectorySize);
