/*
 *  DECLARAÇÃO DE VARIÁVEIS (ARMAZENANDO O DOM EM CACHE)
 */
const loadingDOM = document.getElementById('loading');
const homeDOM = document.getElementById('home');
const treesDOM = document.getElementById('trees');
const buttonRedBlack = document.getElementById("button-redblack");
const buttonB = document.getElementById("button-B");
const buttonBplus = document.getElementById("button-Bplus");
const buttonBack = document.getElementById("button-Back");
const treesTitle = document.getElementById("canvas-title");
const treeOrderContainer = document.getElementById("treeOrderContainer");
const treeOrderInput = document.getElementById("treeOrderInput");
const treeOrderButton = document.getElementById("treeOrderButton");
const treeInsertInput = document.getElementById("treeInsertInput");
const treeInsertButton = document.getElementById("treeInsertButton");
const treeRemoveInput = document.getElementById("treeRemoveInput");
const treeRemoveButton = document.getElementById("treeRemoveButton");
const treeSearchInput = document.getElementById("treeSearchInput");
const treeSearchButton = document.getElementById("treeSearchButton");
const canvasBPlus = document.getElementById("canvas-bplus"); 
let currentState = "loading";
let NKEYS = 0;
let btree = null;
/*
 *  LISTENERS
 */
window.addEventListener("load", () => stateMachine("home"));

buttonRedBlack.addEventListener("click", () => stateMachine("tree-redblack"));

buttonB.addEventListener("click", () => stateMachine("tree-b"));

buttonBplus.addEventListener("click", () => stateMachine("tree-bplus"));

buttonBack.addEventListener("click", () => stateMachine("home"));

treeOrderButton.addEventListener("click", () => {
    if(currentState == "tree-b"){
        NKEYS = treeOrderInput.value;
        btree = new BTree();
    }
    
    if(currentState == "tree-bplus") {
        executar("cre", "treeOrderInput");
    }
    treeOrderInput.value = "";
});

treeInsertButton.addEventListener("click", () => {
    if(currentState == "tree-redblack"){

    }

    if(currentState == "tree-b"){
        btree.add(treeInsertInput.value);
    }
    
    if(currentState == "tree-bplus") {
        executar("add", "treeInsertInput");
    }
    treeInsertInput.value = "";
});

treeRemoveButton.addEventListener("click", () => {
    if(currentState == "tree-redblack"){

    }

    if(currentState == "tree-b"){
        btree.remove(treeInsertInput.value);
    }
    
    if(currentState == "tree-bplus") {
        executar("del", "treeRemoveInput");
    }
    treeRemoveInput.value = "";
});

treeSearchButton.addEventListener("click", () => {
    if(currentState == "tree-redblack"){

    }

    if(currentState == "tree-b"){

    }
    
    if(currentState == "tree-bplus") {
        executar("find", "treeSearchInput");
    }
    treeSearchInput.value = "";
});
/*
 *  MAQUINA DE ESTADOS PARA CONTROLAR AS TELAS DA APLICAÇÃO
 */
const stateMachine = (state) => {
    switch (state) {
        case "loading":
            loadingHandler();
            currentState = "loading";
            break;
        case "home":
            homeHandler();
            currentState = "home";
            break;
        case "tree-redblack":
            redblackHandler();
            currentState = "tree-redblack";
            break;
        case "tree-b":
            bHandler();
            currentState = "tree-b";
            break;
        case "tree-bplus":
            bplusHandler();
            currentState = "tree-bplus";
            break;
        default:
            console.error("Estado Inexistente!");
    }
};
/*
 *  FUNCOES UTILIZADAS PELA MAQUINA DE ESTADOS
 */
const removeElement = (element) => {
    element.classList.add("hidden-element");
};

const showElement = (element) => {
    element.classList.remove("hidden-element");
};

const loadingHandler = () => {
    removeElement(homeDOM);
    removeElement(treesDOM);
    showElement(loadingDOM);
};

const homeHandler = () => {
    removeElement(loadingDOM);
    removeElement(treesDOM);
    showElement(homeDOM);
};

const redblackHandler = () => {
    removeElement(homeDOM);
    removeElement(loadingDOM);
    showElement(treesDOM);
    removeElement(treeOrderContainer);
    removeElement(canvasBPlus);
    treesTitle.innerText = "Árvore Vermelho-Preta";
};

const bHandler = () => {
    removeElement(homeDOM);
    removeElement(loadingDOM);
    showElement(treesDOM);
    showElement(treeOrderContainer);
    removeElement(canvasBPlus);
    treesTitle.innerText = "Árvore B";
};

const bplusHandler = () => {
    removeElement(homeDOM);
    removeElement(loadingDOM);
    showElement(treesDOM);
    showElement(treeOrderContainer);
    showElement(canvasBPlus);
    treesTitle.innerText = "Árvore B+";
};
