/*
 *  DECLARAÇÃO DE VARIÁVEIS 
 */
const loadingDOM = document.getElementById('loading');
const homeDOM = document.getElementById('home');
const treesDOM = document.getElementById('trees');
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