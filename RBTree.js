let T = {
    "nil": {
        color: "BLACK",
        key: null
    },
    "root":""
}
T.root = T.nil;

RBInsert(T,createNode(41));
preorderPrint(T.root, 0);
console.log("");
RBInsert(T,createNode(38));
preorderPrint(T.root, 0);
console.log("");
RBInsert(T,createNode(31));
preorderPrint(T.root, 0);
console.log("");
RBInsert(T,createNode(12));
preorderPrint(T.root, 0);
console.log("");
RBInsert(T,createNode(19));
preorderPrint(T.root, 0);
console.log("");
RBInsert(T,createNode(8));
preorderPrint(T.root, 0);






function createNode (key) {
    let result = {
        p: T.nil,
        key: key,
        color: "RED",
        left: T.nil,
        right: T.nil
    }
    return result;
}

function RBInsert (T, node) {
    let y = T.nil;
    let x = T.root;
    while (x !== T.nil) {
        y=x;
        if (node.key < x.key) {
            x = x.left;
        } else {
            x = x.right;
        }
    }
    node.p = y;
    if (y === T.nil) {
        T.root = node;
    } else if (node.key < y.key) {
        y.left = node;
    } else {
        y.right = node;
    }
    node.left = T.nil;
    node.right = T.nil;
    node.color = "RED";
    RBInsertFixup(T, node);
}

function RBInsertFixup (T, node) {
    while (node.p.color === "RED") {
        if (node.p === node.p.p.left) {
            let y = node.p.p.right;
            if (y.color === "RED") {
                node.p.color = "BLACK";
                y.color = "BLACK";
                node.p.p.color = "RED";
                node = node.p.p;
            } else if (node === node.p.right) {
                node = node.p;
                LeftRotate(T,node);
            } else {
                node.p.color = "BLACK";
                node.p.p.color = "RED";
                RightRotate(T,node.p.p);
            }
        } else/* if (node.p === node.p.p.right)*/ {
            let y = node.p.p.left;
            if (!y) {
                y=T.nil;
            }
            if (y.color === "RED") {
                node.p.color = "BLACK";
                y.color = "BLACK";
                node.p.p.color = "RED";
                node = node.p.p;
            } else if (node === node.p.left) {
                node = node.p;
                LeftRotate(T,node);
            } else {
                node.p.color = "BLACK";
                node.p.p.color = "RED";
                RightRotate(T,node.p.p);
            }
        }
    }
    T.root.color = "BLACK";
}

function LeftRotate(T,node) {
    let y = node.right;
    node.right = y.left;
    if (y.left !== T.nil) {
        y.left.p = node;
    }
    y.p = node.p;
    if (node.p === T.nil) {
        T.root = y;
    } else if (node === node.p.left) {
        node.p.left = y;
    } else {
        node.p.right = y;
    }
    y.left = node;
    node.p = y;
}

function RightRotate (T, node) {
    let y = node.left;
    node.left = y.right;
    if (y.right !== T.nil) {
        y.right.p = node;
    }
    y.p = node.p;
    if (node.p === T.nil) {
        T.root = y;
    } else if (node === node.p.right) {
        node.p.right = y;
    } else {
        node.p.left = y;
    }
    y.right = node;
    node.p = y;
}


function preorderPrint (node, depth) {
    if (node !== T.nil) {
        console.log(' '.repeat(depth) + node.key + ":" + node.color);
        preorderPrint(node.left, depth+1);
        preorderPrint(node.right, depth+1);
    }
}


