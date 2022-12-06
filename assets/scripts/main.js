const loadingDOM = document.getElementById('loading');
const homeDOM = document.getElementById('home');
const treesDOM = document.getElementById('trees');
/*
 *  MAQUINA DE ESTADOS PARA CONTROLAR EM QUAL PAGINA ESTA A APLICACAO 
 */
const stateMachine = createMachine({
    initialState: "loading",
    loading: {
        actions: {
            onEnter() {
                showElement(loadingDOM);
            },
            onExit() {
                removeElement(loadingDOM);
            }
        }
    },
    home : {
        actions: {
            onEnter() {
                showElement(homeDOM);
            },
            onExit() {
                removeElement(homeDOM);
            }
        }
    },
    tree: {
        actions: {
            onEnter() {
                showElement(treesDOM);
            },
            onExit() {
                removeElement(treesDOM);
            }
        }
    }
});
/*
 *  FUNCOES PARA REMOVER OU ADICIONAR ELEMENTOS NA TELA
 */
const removeElement = ( element ) => {
    element.classList.add("hidden-element");
};

const showElement = ( element ) => {
    element.classList.remove("hidden-element");
};