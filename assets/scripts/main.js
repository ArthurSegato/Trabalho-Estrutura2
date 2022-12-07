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
/*
 *  LISTENERS
 */
window.addEventListener("load", () => stateMachine("home"));

buttonRedBlack.addEventListener("click", () => stateMachine("tree-redblack"));

buttonB.addEventListener("click", () => stateMachine("tree-b"));

buttonBplus.addEventListener("click", () => stateMachine("tree-bplus"));

buttonBack.addEventListener("click", () => stateMachine("home"));
/*
 *  MAQUINA DE ESTADOS PARA CONTROLAR AS TELAS DA APLICAÇÃO
 */
const stateMachine = (state) => {
    switch (state) {
        case "loading":
            loadingHandler();
            break;
        case "home":
            homeHandler();
            break;
        case "tree-redblack":
            redblackHandler();
            break;
        case "tree-b":
            bHandler();
            break;
        case "tree-bplus":
            bplusHandler();
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
    treesTitle.innerText = "Árvore Vermelho-Preta";
};

const bHandler = () => {
    removeElement(homeDOM);
    removeElement(loadingDOM);
    showElement(treesDOM);
    treesTitle.innerText = "Árvore B";
};

const bplusHandler = () => {
    removeElement(homeDOM);
    removeElement(loadingDOM);
    showElement(treesDOM);
    treesTitle.innerText = "Árvore B+";
};
