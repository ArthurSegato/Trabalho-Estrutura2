/*
 *  DECLARAÇÃO DE VARIÁVEIS 
 */
const loadingDOM = document.getElementById('loading');
const homeDOM = document.getElementById('home');
const treesDOM = document.getElementById('trees');
const buttonRedBlack = document.getElementById("button-redblack");
const buttonB = document.getElementById("button-B");
const buttonBplus = document.getElementById("button-Bplus");
const buttonBack = document.getElementById("button-Back");
/*
 *  MAQUINA DE ESTADOS PARA CONTROLAR AS TELAS DA APLICAÇÃO
 */
const stateMachine = (state) => {
    switch (state) {
        case "loading":
            removeElement(homeDOM);
            removeElement(treesDOM);
            showElement(loadingDOM);
            break;
        case "home":
            removeElement(loadingDOM);
            removeElement(treesDOM);
            showElement(homeDOM);
            break;
        case "trees":
            removeElement(homeDOM);
            removeElement(loadingDOM);
            showElement(treesDOM);
            break;
        default:
            console.error("Estado Inexistente!");
    }
};
/*
 *  FUNCOES PARA REMOVER OU ADICIONAR ELEMENTOS NA TELA
 */
const removeElement = ( element ) => {
    element.classList.add("hidden-element");
};

const showElement = ( element ) => {
    element.classList.remove("hidden-element");
};
/*
 *  LISTENERS
 */
window.addEventListener("load", (event) => stateMachine("home"));

buttonRedBlack.addEventListener("click", () => stateMachine("trees"));

buttonB.addEventListener("click", () => stateMachine("trees"));

buttonBplus.addEventListener("click", () => stateMachine("trees"));

buttonBack.addEventListener("click", () => stateMachine("home"));