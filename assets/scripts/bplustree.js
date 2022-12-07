/*
Nesse arquivo estão a criação dos atributos e métodos das
Árvores, Folhas e Nós

Além de suas funcionalidades:
Inserção, Remoção, Buscas

E tambem alguns ajustes como
a divisão e junção dos nós e outras funções

*/


// ========== Data structures ==========

leaf = function () {
	this.keyval = [];
	this.recnum = [];
	this.prevLf = null;
	this.nextLf = null;
};

node = function () {
	this.keyval = [];
	this.nodptr = [];
};

tree = function (order) {
	this.root = new leaf();
	this.maxkey = order - 1;
	this.minkyl = Math.floor(order / 2);
	this.minkyn = Math.floor(this.maxkey / 2);
	this.leaf = null;
	this.item = -1;
	this.keyval = '';
	this.recnum = -1;
	this.length = 0;
	this.found = false;
};


// === Métodos === //

// Retorna se objeto é uma folha ou não
leaf.prototype.isLeaf = function () { return true; };

// Retorna o valor se existir
leaf.prototype.getItem = function (key, near) {
	var vals = this.keyval;
	if (near) {
		for (var i = 0, len = vals.length; i < len; i++) {
			if (key <= vals[i]) return i;
		}
	} else {
		for (var i = 0, len = vals.length; i < len; i++) {
			if (key === vals[i]) return i;
		}
	}
	return -1;
};

// Método para adicionar chaves na arvore
leaf.prototype.addKey = function (key, rec) {
	var vals = this.keyval;
	var itm = vals.length;
	for (var i = 0, len = itm; i < len; i++) {
		if (key === vals[i]) {
			itm = -1;
			break;
		}
		if (key <= vals[i]) {
			itm = i;
			break;
		}
	}
	if (itm != -1) {
		for (var i = vals.length; i > itm; i--) {
			vals[i] = vals[i - 1];
			this.recnum[i] = this.recnum[i - 1];
		}
		vals[itm] = key;
		this.recnum[itm] = rec;
	}
	return itm;
};

// Método para dividir uma folha ao meio
leaf.prototype.split = function () {
	var mov = Math.floor(this.keyval.length / 2);
	var newL = new leaf();
	for (var i = mov - 1; i >= 0; i--) {
		newL.keyval[i] = this.keyval.pop();
		newL.recnum[i] = this.recnum.pop();
	}
	newL.prevLf = this;
	newL.nextLf = this.nextLf;
	if (this.nextLf !== null) this.nextLf.prevLf = newL;
	this.nextLf = newL;
	return newL;
};

//Método para juntar valores em uma folha
leaf.prototype.merge = function (frNod, paNod, frKey) {
	for (var i = 0, len = frNod.keyval.length; i < len; i++) {
		this.keyval.push(frNod.keyval[i]);
		this.recnum.push(frNod.recnum[i]);
	}
	this.nextLf = frNod.nextLf;
	if (frNod.nextLf !== null) frNod.nextLf.prevLf = this;
	frNod.prevLf = null;
	frNod.nextLf = null;
	var itm = paNod.keyval.length - 1;
	for (var i = itm; i >= 0; i--) {
		if (paNod.keyval[i] == frKey) {
			itm = i;
			break;
		}
	}
	for (var i = itm, len = paNod.keyval.length - 1; i < len; i++) {
		paNod.keyval[i] = paNod.keyval[i + 1];
		paNod.nodptr[i + 1] = paNod.nodptr[i + 2];
	}
	paNod.keyval.pop();
	paNod.nodptr.pop();
};

//Métodos referentes ao NÓ
// Retorna se o nó é ou não uma folha
node.prototype.isLeaf = function () { return false; };

node.prototype.getItem = function (key) {
	var vals = this.keyval;
	for (var i = 0, len = vals.length; i < len; i++) {
		if (key < vals[i]) return i;
	}
	return vals.length;
};

// Adiciona uma chave ao nó
node.prototype.addKey = function (key, ptrL, ptrR) {
	var vals = this.keyval;
	var itm = vals.length;
	for (var i = 0, len = vals.length; i < len; i++) {
		if (key <= vals[i]) {
			itm = i;
			break;
		}
	}
	for (var i = vals.length; i > itm; i--) {
		vals[i] = vals[i - 1];
		this.nodptr[i + 1] = this.nodptr[i];
	}
	vals[itm] = key;
	this.nodptr[itm] = ptrL;
	this.nodptr[itm + 1] = ptrR;
};

// Separa um nó
node.prototype.split = function () {
	var mov = Math.ceil(this.keyval.length / 2) - 1;
	var newN = new node();
	newN.nodptr[mov] = this.nodptr.pop();
	for (var i = mov - 1; i >= 0; i--) {
		newN.keyval[i] = this.keyval.pop();
		newN.nodptr[i] = this.nodptr.pop();
	}
	return newN;
};

// Junta um nó
node.prototype.merge = function (frNod, paNod, paItm) {
	var del = paNod.keyval[paItm];
	this.keyval.push(del);
	for (var i = 0, len = frNod.keyval.length; i < len; i++) {
		this.keyval.push(frNod.keyval[i]);
		this.nodptr.push(frNod.nodptr[i]);
	}
	this.nodptr.push(frNod.nodptr[frNod.nodptr.length - 1]);
	for (var i = paItm, len = paNod.keyval.length - 1; i < len; i++) {
		paNod.keyval[i] = paNod.keyval[i + 1];
		paNod.nodptr[i + 1] = paNod.nodptr[i + 2];
	}
	paNod.keyval.pop();
	paNod.nodptr.pop();
	return del;
};


// Métodos referentes a arvore
tree.prototype.insert = function (key, rec) {
	var stack = [];
	this.leaf = this.root;
	while (!this.leaf.isLeaf()) {
		stack.push(this.leaf);
		this.item = this.leaf.getItem(key);
		this.leaf = this.leaf.nodptr[this.item];
	}
	this.item = this.leaf.addKey(key, rec);
	this.keyval = key;
	if (this.item === -1) {
		this.found = true;
		this.item = this.leaf.getItem(key, false);
		this.recnum = this.leaf.recnum[this.item];
	} else {
		this.found = false;
		this.recnum = rec;
		this.length++;
		if (this.leaf.keyval.length > this.maxkey) {
			var pL = this.leaf;
			var pR = this.leaf.split();
			var ky = pR.keyval[0];
			this.item = this.leaf.getItem(key, false);
			if (this.item === -1) {
				this.leaf = this.leaf.nextLf;
				this.item = this.leaf.getItem(key, false);
			}
			while (true) {
				if (stack.length === 0) {
					var newN = new node();
					newN.keyval[0] = ky;
					newN.nodptr[0] = pL;
					newN.nodptr[1] = pR;
					this.root = newN;
					break;
				}
				var nod = stack.pop();
				nod.addKey(ky, pL, pR);
				if (nod.keyval.length <= this.maxkey) break;
				pL = nod;
				pR = nod.split();
				ky = nod.keyval.pop();
			}
		}
	}
	return (!this.found);
};

// Remove um valor da árvore utilizando a função abaixo
tree.prototype.remove = function (key) {
	if (typeof key == 'undefined') {
		if (this.item === -1) {
			this.found = false;
			return false;
		}
		key = this.leaf.keyval[this.item];
	}
	this._del(key); //Chama a função abaixo para remover
	if (!this.found) {
		this.item = -1;
		this.keyval = '';
		this.recnum = -1;
	} else {
		this.seek(key, true);
		this.found = true;
	}
	return (this.found);
};

// Procura um valor na árvore
tree.prototype.seek = function (key, near) {
	if (typeof near != 'boolean') near = false;
	this.leaf = this.root;
	while (!this.leaf.isLeaf()) {
		this.item = this.leaf.getItem(key);
		this.leaf = this.leaf.nodptr[this.item];
	}
	this.item = this.leaf.getItem(key, near);
	if (near && this.item == -1 && this.leaf.nextLf !== null) {
		this.leaf = this.leaf.nextLf;
		this.item = 0;
	}
	if (this.item === -1) {
		this.keyval = '';
		this.found = false;
		this.recnum = -1;
	} else {
		this.found = (this.leaf.keyval[this.item] === key);
		this.keyval = this.leaf.keyval[this.item];
		this.recnum = this.leaf.recnum[this.item];
	}
};


// Método de remoção
tree.prototype._del = function (key) {
	var stack = [];
	var parNod = null;
	var parPtr = -1;
	this.leaf = this.root;
	while (!this.leaf.isLeaf()) {
		stack.push(this.leaf);
		parNod = this.leaf;
		parPtr = this.leaf.getItem(key);
		this.leaf = this.leaf.nodptr[parPtr];
	}
	this.item = this.leaf.getItem(key, false);

	// Caso o valor não esteja na árvore, apenas retorna
	if (this.item === -1) {
		this.found = false;
		return;
	}
	this.found = true;

	// Remove a chave da folha
	for (var i = this.item, len = this.leaf.keyval.length - 1; i < len; i++) {
		this.leaf.keyval[i] = this.leaf.keyval[i + 1];
		this.leaf.recnum[i] = this.leaf.recnum[i + 1];
	}
	this.leaf.keyval.pop();
	this.leaf.recnum.pop();
	this.length--;

	// Se não quebrar nenhuma regra, retorna
	if (this.leaf == this.root) return;
	if (this.leaf.keyval.length >= this.minkyl) {
		if (this.item === 0) this._fixNodes(stack, key, this.leaf.keyval[0]);
		return;
	}
	var delKey;

	// Pega do irmã da esquerda, se possivel
	var sibL = (parPtr === 0) ? null : parNod.nodptr[parPtr - 1];
	if (sibL !== null && sibL.keyval.length > this.minkyl) {
		delKey = (this.item === 0) ? key : this.leaf.keyval[0];
		for (var i = this.leaf.keyval.length; i > 0; i--) {
			this.leaf.keyval[i] = this.leaf.keyval[i - 1];
			this.leaf.recnum[i] = this.leaf.recnum[i - 1];
		}
		this.leaf.keyval[0] = sibL.keyval.pop();
		this.leaf.recnum[0] = sibL.recnum.pop();
		this._fixNodes(stack, delKey, this.leaf.keyval[0]);
		return;
	}

	// Pega do irmã da direita, se possivel
	var sibR = (parPtr == parNod.keyval.length) ? null : parNod.nodptr[parPtr + 1];
	if (sibR !== null && sibR.keyval.length > this.minkyl) {
		this.leaf.keyval.push(sibR.keyval.shift());
		this.leaf.recnum.push(sibR.recnum.shift());
		if (this.item === 0) this._fixNodes(stack, key, this.leaf.keyval[0]);
		this._fixNodes(stack, this.leaf.keyval[this.leaf.keyval.length - 1], sibR.keyval[0]);
		return;
	}

	// Junta para fazer uma folha só
	if (sibL !== null) {
		delKey = (this.item === 0) ? key : this.leaf.keyval[0];
		sibL.merge(this.leaf, parNod, delKey);
		this.leaf = sibL;
	} else {
		delKey = sibR.keyval[0];
		this.leaf.merge(sibR, parNod, delKey);
		if (this.item === 0) this._fixNodes(stack, key, this.leaf.keyval[0]);
	}

	if (stack.length === 1 && parNod.keyval.length === 0) {
		this.root = this.leaf;
		return;
	}

	var curNod = stack.pop();
	var parItm;

	// Atualiza todos os nós
	while (curNod.keyval.length < this.minkyn && stack.length > 0) {

		parNod = stack.pop();
		parItm = parNod.getItem(delKey);

		// Pega do irmã da direita, se possivel
		sibR = (parItm == parNod.keyval.length) ? null : parNod.nodptr[parItm + 1];
		if (sibR !== null && sibR.keyval.length > this.minkyn) {
			curNod.keyval.push(parNod.keyval[parItm]);
			parNod.keyval[parItm] = sibR.keyval.shift();
			curNod.nodptr.push(sibR.nodptr.shift());
			break;
		}

		// Pega do irmã da esquerda, se possivel
		sibL = (parItm === 0) ? null : parNod.nodptr[parItm - 1];
		if (sibL !== null && sibL.keyval.length > this.minkyn) {
			for (var i = curNod.keyval.length; i > 0; i--) {
				curNod.keyval[i] = curNod.keyval[i - 1];
			}
			for (var i = curNod.nodptr.length; i > 0; i--) {
				curNod.nodptr[i] = curNod.nodptr[i - 1];
			}
			curNod.keyval[0] = parNod.keyval[parItm - 1];
			parNod.keyval[parItm - 1] = sibL.keyval.pop();
			curNod.nodptr[0] = sibL.nodptr.pop();
			break;
		}

		// Junta para fazer um Nó
		if (sibL !== null) {
			delKey = sibL.merge(curNod, parNod, parItm - 1);
			curNod = sibL;
		} else if (sibR !== null) {
			delKey = curNod.merge(sibR, parNod, parItm);
		}

		// Próximo nivel
		if (stack.length === 0 && parNod.keyval.length === 0) {
			this.root = curNod;
			break;
		}
		curNod = parNod;
	}
};

// Atualiza os nós
tree.prototype._fixNodes = function (stk, frKey, toKey) {
	var vals, lvl = stk.length, mor = true;
	do {
		lvl--;
		vals = stk[lvl].keyval;
		for (var i = vals.length - 1; i >= 0; i--) {
			if (vals[i] == frKey) {
				vals[i] = toKey;
				mor = false;
				break;
			}
		}
	} while (mor && lvl > 0);
};

// Configurações do HTML
var myTree = null;
var hist = [];

//apagar depois
opcao = function (op) {
	var txt, dis = false, num = '';
	switch (op) {
		case 'cre':
			txt = 'Ordem';
			break;
		case 'add':
			txt = 'Valor';
			break;
		case 'del':
			txt = 'Valor';
			break;
		case 'find':
			txt = 'Valor';
			break;
	}
	ge$('labl').innerHTML = txt;
	ge$('num').value = num;
	ge$('num').disabled = dis;
	if (dis) ge$('btn').focus();
	else endCursor(ge$('num'));
}

verificaErro = function (op, treeExec) {
	num = document.getElementById(treeExec).value

	num = parseInt(num, 10);
	if (isNaN(num)) num = 0; //nao precisa

	var txt = '';
	if (myTree !== null) txt = myTree.show('toCanvas');
	ge$('toMsg').innerHTML = txt;

	txt = '';
	if (treeExec == "treeInsert" && myTree === null) {
		txt = 'Erro: Você precisa construir a árvore primeiro.';
	} else
		if (treeExec == "treeOrder" && num < 3) {
			txt = 'Erro: A ordem deve ser no mínimo 3.';
		} else
			if (treeExec == "treeInsert" && num <= 0) {
				txt = 'Erro: O numero precisa ser maior que 0.';
			} else
				if (treeExec == "treeRemove" && myTree === null) {
					txt = 'Erro: Não é possivel remover o valor.'
				}
	if (txt.length > 0) op = 'error';

	return op, txt;
}

executar = function (op, treeExec) {
	num = document.getElementById(treeExec).value
	op, txt = verificaErro(op, treeExec)

	switch (op) {
		case 'error':
			break;
		case 'cre':
			myTree = new tree(num);
			hist = [];
			hist[0] = 'myTree = new tree(' + num + ');';
			break;
		case 'add':
			myTree.insert(num, num);
			hist.push('myTree.insert(' + num + ',' + num + ');');
			foc = 'num';
			//ge$('num').value = '';
			break;
		case 'del':
			if (num == 0) {
				myTree.remove();
				hist.push('myTree.remove();');
			} else {
				myTree.remove(num);
				hist.push('myTree.remove(' + num + ');');
			}
			foc = 'num';
			//ge$('num').value = '';
			break;
		case 'find':
			myTree.seek(num);
			hist.push('myTree.seek(' + num + ');');
			foc = 'num';
			break;
	}

	if (myTree !== null) {
		if (txt.length == 0) txt = myTree.show('toCanvas');
		else myTree.showoff('toCanvas');
	}
	ge$('toMsg').innerHTML = txt;
}

commas = function (x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

/* 
Essa função faz com que ao selecionar um valor no input e apertar ENTER
o botão de confirmar é automaticamente selecionado
*/
enterToTab = function (obj, e) {
	var e = (typeof event != 'undefined') ? window.event : e;	// IE : Mozilla 
	if (e.keyCode == 13) {
		var q;
		var ele = document.forms[0].elements;
		for (var i = 0, len = ele.length; i < len; i++) {
			q = (i == ele.length - 1) ? 0 : i + 1;
			if (obj == ele[i]) {
				break;
			}
		}
		return false;
	}
}

// Pega o valor contido nos campos HTML
function ge$(d) {
	var x = document.getElementById(d);
	if (!x) {
		var y = document.getElementsByName(d);
		if (y.length > 0) x = y[0];
	}
	return x;
}

function endCursor(el) {
	el.focus();
	if (el.setSelectionRange) {
		var endPos = el.value.length;
		el.setSelectionRange(endPos, endPos);
	}
}

function debug(txt) { window.console && console.log(txt); }
