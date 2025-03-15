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
    return arrayWithNoDuplicate.sort((a, b) => a - b);
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

  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (node.data === value) return node;
    if (value < node.data) node.left = this.insert(value, node.left);
    if (value > node.data) node.right = this.insert(value, node.right);
    return node;
  }

  delete(value, node = this.root) {
    if (node === null) return node;
    if (node.data === value) {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      let currentNode = node.right;
      while (currentNode !== null && currentNode.left !== null)
        currentNode = currentNode.left;
      node.data = currentNode.data;
      this.delete(currentNode.data, node.right);
    }
    if (value < node.data) node.left = this.delete(value, node.left);
    if (value > node.data) node.right = this.delete(value, node.right);
    return node;
  }

  find(value, node = this.root) {
    if (node === null || value === node.data) return node;
    if (value < node.data) return this.find(value, node.left);
    if (value > node.data) return this.find(value, node.right);
  }

  levelOrderRecursive(callback, levelOrderArray = [this.root]) {
    if (levelOrderArray.length === 0) return;
    const node = levelOrderArray.shift();
    if (node.left) levelOrderArray.push(node.left);
    if (node.right) levelOrderArray.push(node.right);
    callback(node);
    this.levelOrderRecursive(callback, levelOrderArray);
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
    if (node === null) return -1;
    let leftHeight = 1 + this.height(node.left);
    let rightHeight = 1 + this.height(node.right);
    return Math.max(leftHeight, rightHeight);
  }

  depth(node = this.root, currentNode = this.root) {
    if (currentNode === null) return NaN;
    if (currentNode === node) return 0;
    let leftDepth = 1 + this.depth(node, currentNode.left);
    if (Number.isInteger(leftDepth)) return leftDepth;
    let rightDepth = 1 + this.depth(node, currentNode.right);
    return rightDepth;
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
for (let i = 0; i < 15; i++) array.push(i);

const tree = new Tree(array);
console.log(tree.depth(tree.root.left.right));
console.log(tree.root.left.right);
tree.prettyPrint(tree.root);
