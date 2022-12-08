export class RBTree {
    constructor(data, isRed) {
        if (!data || typeof data !== 'number') throw new Error('RBT requires an integer value to create a node');

        this.data = data;
        this.isRed = isRed ? true : false;
        this.leftNode = null;
        this.rightNode = null;
    }

    Add(data) {
        const node = this.Insert(this, data);
        if (!!node)
            node.isRed = false;

        return node;
    }

    Insert(node, data) {
        if (node === null) {
            const newNode = new RBTree(data, true);
            return newNode;
        }

        if (data === node.data) {
            throw new Error('Data already registered');
        } else {
            if (data < node.data)
                node.leftNode = this.Insert(node.leftNode, data);
            else
                node.rightNode = this.Insert(node.rightNode, data);
        }

        if (this.#NodeColorIsRed(node.rightNode) && !this.#NodeColorIsRed(node.leftNode))
            node = this.#LeftRotate(node);

        if (this.#NodeColorIsRed(node.leftNode) && this.#NodeColorIsRed(node.leftNode.leftNode))
            node = this.#RightRotate(node);

        if (this.#NodeColorIsRed(node.leftNode) && this.#NodeColorIsRed(node.rightNode))
            this.#UpdateNodeColor(node);

        return node;
    }

    Remove(node, data) {
        if (this.Find(data)) {
            node = this.#Rmv(node, data);

            if (!!node)
                node.isRed = false;

            return node;
        }
    }

    #Rmv(node, data) {
        if (data < node.data) {
            if (!this.#NodeColorIsRed(node.leftNode) && !this.#NodeColorIsRed(node.leftNode.leftNode))
                node = this.#Move2Left(node);

            node.leftNode = this.#Rmv(node.leftNode, data);
        } else {
            if (this.#NodeColorIsRed(node.leftNode))
                node = this.#RightRotate(node);

            if (data === node.data && node.rightNode === null)
                return null;

            if (!this.#NodeColorIsRed(node.rightNode) && !this.#NodeColorIsRed(node.rightNode.leftNode))
                node = this.#Move2Right(node);

            if (data === node.data) {
                const smaller = this.#GetSmallerNode(node.rightNode);
                node.data = smaller.data;
                node.rightNode = this.#RemoveSmaller(node.rightNode);
            } else
                node.rightNode = this.#Rmv(node.rightNode, data);
        }

        return this.#CheckProperties(node);
    }

    Find(data) {
        let root = this;

        while (root != null) {
            if (data == root.data)
                return root;

            if (data > root.data)
                root = root.rightNode;
            else
                root = root.leftNode;
        }

        return false;
    }

    #GetSmallerNode(node) {
        let currentNode = node;
        let currentLeftNode = node.leftNode;

        while (currentLeftNode !== null) {
            currentNode = currentLeftNode;
            currentLeftNode = currentLeftNode.leftNode;
        }

        return currentNode;
    }

    #RemoveSmaller(node) {
        if (node.leftNode === null)
            return null;

        if (!this.#NodeColorIsRed(node.leftNode) && !this.#NodeColorIsRed(node.leftNode.leftNode))
            node = this.#Move2Left(node);

        node.leftNode = this.#RemoveSmaller(node.leftNode);
        return this.#CheckProperties(node);
    }

    Print(tab = '', test = '>') {
        console.log(tab + test + this.data);
        console.log(tab + test + this.isRed ? 'VERMELHO' : 'RED');
        console.log(tab + '-----------------------');

        if (this.leftNode != null) {
            console.log(tab + 'LeftNode');
            this.leftNode.Print('\t' + tab, test + '>');
        }

        if (this.rightNode != null) {
            console.log(tab + 'RightNode');
            this.rightNode.Print('\t' + tab, test + '>');
        }
    }

    #NodeColorIsRed(node) {
        if (!node)
            return false;

        return node.isRed;
    }

    #UpdateNodeColor(node) {
        node.isRed = !node.isRed;

        if (node.leftNode !== null)
            node.leftNode.isRed = !node.leftNode.isRed;

        if (node.rightNode !== null)
            node.rightNode.isRed = !node.rightNode.isRed;
    }

    #LeftRotate(node) {
        const newCurrentRoot = node.rightNode;

        node.rightNode = newCurrentRoot.leftNode;

        newCurrentRoot.leftNode = node;
        newCurrentRoot.isRed = node.isRed;

        node.isRed = true;

        return newCurrentRoot;
    }

    #RightRotate(node) {
        const newCurrentRoot = node.leftNode;

        node.leftNode = newCurrentRoot.rightNode;

        newCurrentRoot.rightNode = node;
        newCurrentRoot.isRed = node.isRed;

        node.isRed = true;

        return newCurrentRoot;
    }

    #Move2Left(node) {
        this.#UpdateNodeColor(node);

        if (this.#NodeColorIsRed(node.rightNode.leftNode)) {
            node.rightNode = this.#RightRotate(node.rightNode);
            node = this.#LeftRotate(node);

            this.#UpdateNodeColor(node);
        }

        return node;
    }

    #Move2Right(node) {
        this.#UpdateNodeColor(node);

        if (this.#NodeColorIsRed(node.leftNode.leftNode)) {
            node = this.#RightRotate(node);

            this.#UpdateNodeColor(node);
        }

        return node;
    }

    #CheckProperties(node) {
        if (this.#NodeColorIsRed(node.rightNode))
            node = this.#LeftRotate(node);

        if (
            node.leftNode !== null
            && this.#NodeColorIsRed(node.leftNode)
            && this.#NodeColorIsRed(node.leftNode.leftNode)
        ) {
            node = this.#RightRotate(node);
        }

        if (this.#NodeColorIsRed(node.leftNode) && this.#NodeColorIsRed(node.rightNode))
            this.#UpdateNodeColor(node);

        return node;
    }
}
