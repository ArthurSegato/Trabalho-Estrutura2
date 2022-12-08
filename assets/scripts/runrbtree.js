import util from 'util';
import { RBTree } from './rbtree.js';


let root = new RBTree(5);
root = root.Add(30);
root = root.Add(20);
root = root.Add(26);
root = root.Add(61);
root = root.Add(43);
root = root.Add(75);
root = root.Add(14);
root = root.Add(59);
root = root.Add(41);
root = root.Add(79);
root = root.Add(9);

console.log('-----------------------');
console.log(`${util.inspect(root, true, null)}.`);
console.log('-----------------------\n\n\n');

root = root.Remove(root, 43);
root = root.Remove(root, 30);

console.log(`${util.inspect(root, true, null)}.`);
console.log('-----------------------\n\n\n');

console.log(root.Find(61))
