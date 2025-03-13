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

const tree = new Tree([6, 2, 7, 8, 1, 9, 6, 0]);
console.log(tree.array);
tree.prettyPrint(tree.root);
tree.postOrder(console.log);
