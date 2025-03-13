import Node from "./node.js";

class Tree {
  constructor(array) {
    this.array = this.sortArray(array);
    this.root = this.buildTree(this.array);
  }

  sortArray(array) {
    const arrayWithNoDuplicate = [];
    for (let element of array)
      if (!arrayWithNoDuplicate.includes(element))
        arrayWithNoDuplicate.push(element);
    return arrayWithNoDuplicate.sort();
  }

  buildTree(array) {
    if (array === null || array.length === 0) return null;

    let start = 0;
    let end = array.length;
    let mid = Math.floor((start + end) / 2);

    let rootElement = array[mid];
    let leftElement = this.buildTree(array.slice(start, mid));
    let rightElement = this.buildTree(array.slice(mid + 1));
    const root = new Node(rootElement, leftElement, rightElement);
    return root;
  }

  insert(value) {
    let currentNode = this.root;
    let previousNode;
    let direction;

    while (currentNode) {
      if (value === currentNode.data) return;
      else if (value < currentNode.data)
        [previousNode, currentNode, direction] = [
          currentNode,
          currentNode.left,
          "left",
        ];
      else if (value > currentNode.data)
        [previousNode, currentNode, direction] = [
          currentNode,
          currentNode.right,
          "right",
        ];
    }
    previousNode[direction] = new Node(value);
  }

  delete(value) {
    let currentNode = this.root;
    let previousNode;
    let direction;

    while (currentNode) {
      if (value === currentNode.data) break;
      else if (value < currentNode.data)
        [previousNode, currentNode, direction] = [
          currentNode,
          currentNode.left,
          "left",
        ];
      else if (value > currentNode.data)
        [previousNode, currentNode, direction] = [
          currentNode,
          currentNode.right,
          "right",
        ];
    }
    if (currentNode === null) return;
    previousNode[direction] = currentNode.left || currentNode.right;
    if (currentNode.left !== null) currentNode.left.right = currentNode.right;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.data) return currentNode;
      else if (value < currentNode.data) currentNode = currentNode.left;
      else if (value > currentNode.data) currentNode = currentNode.right;
    }
    return currentNode;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("undefined callback function");
    if (this.root === null) return;

    let currentNode = this.root;
    let levelOrderQueue = [currentNode];
    while (levelOrderQueue.length > 0) {
      currentNode = levelOrderQueue.shift();
      callback(currentNode);
      if (currentNode.left) levelOrderQueue.push(currentNode.left);
      if (currentNode.right) levelOrderQueue.push(currentNode.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("undefined callback function");
    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("undefined callback function");
    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("undefined callback function");
    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    let counter;
    if (node === null) return -1;
    counter = 1 + this.height(node.left);
    counter = Math.max(counter, 1 + this.height(node.right));
    return counter;
  }

  depth(node = this.root, currentNode = this.root) {
    let counter, anotherCounter;
    if (currentNode === null) return NaN;
    if (currentNode === node) return 0;
    counter = 1 + this.depth(node, currentNode.left);
    if (Number.isInteger(counter)) return counter;
    anotherCounter = 1 + this.depth(node, currentNode.right);
    return anotherCounter;
  }

  isBalanced() {
    if (this.root === null) return true;
    let leftSubtreeHeight = this.height(this.root.left) + 1;
    let rightSubtreeHeight = this.height(this.root.right) + 1;
    return Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1;
  }

  rebalance() {
    this.array = [];
    this.inOrder((node) => this.array.push(node.data));
    this.root = this.buildTree(this.array);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const generateRandomNumber = function generateRandomNumberBetween(n, min = 0) {
  return Math.floor(Math.random() * n) + min;
};

const array = [];
const randomNumber = generateRandomNumber(100);
for (let i = 0; i < randomNumber; i++) array.push(generateRandomNumber(100));

const tree = new Tree(array);
tree.prettyPrint(tree.root);
for (let i = 0; i < 20; i++) tree.insert(generateRandomNumber(100, 100));
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());