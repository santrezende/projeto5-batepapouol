let nomeUser = document.querySelector(".user");

nomeUser.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        defineUser();
    }
});

let user;
let primeiraTela = document.querySelector(".tela-inicial");
let loading = document.querySelector(".loading");

function defineUser() {
    let botao = document.querySelector(".tela-inicial button");

    function fazerLogIn() {
        primeiraTela.classList.add("escondido");
            setInterval(manterConexao, 5000);
            setInterval(carregaMensagens, 3000);
    }

    user = {
        name: nomeUser.value
    };
    
    loading.classList.remove("escondido");
    botao.classList.add("escondido");
    nomeUser.classList.add("escondido");

    let requestUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);

    function deuRuim() {
        botao.classList.remove("escondido");
        nomeUser.classList.remove("escondido");
        loading.classList.add("escondido");
        nomeUser.value = "";
        nomeUser.placeholder = "Nome já em uso";
    }

    function processarResposta() {
        fazerLogIn();
        carregaMensagens();
    } 

    requestUser.then(processarResposta);
    requestUser.catch(deuRuim);
}

function manterConexao () {
    let responseConexao = 0;
    const requestUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);

        function processarResposta(resposta) {
            responseConexao = resposta;
        }

        function deuRuim (resposta) {
            responseConexao = resposta;
        }

   requestUser.then(processarResposta);
   requestUser.catch(deuRuim);
}

let container = document.querySelector(".container-mensagens");

function carregaMensagens() {
    const requestMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    requestMensagens.then(processarResposta);
    let mensagens;
    let lastMessage;
    function processarResposta(resposta) {
        mensagens = resposta.data;
        for (let index = 0; index < mensagens.length; index++) {
            if(index === 0) {
                container.innerHTML = "";
            }

            function criaMensagemTodos() {
                let div = `<div data-test="message" class="print todos">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> para <span
                    class="texto-destinatario">${mensagens[index].to}: </span><span>${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            
            function criaAviso() {
                let div = `<div data-test="message" class="print aviso">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from} </span><span>${mensagens[index].text}</span>
            </div>`;
                container.innerHTML = container.innerHTML + div;
            }
            
            function criaMensagemPrivada() {
                let div = `<div data-test="message" class="print privado">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> reservadamente para
                <span class="texto-destinatario">${mensagens[index].to}</span><span>: ${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }

            if (mensagens[index].type === "status") {
                criaAviso();
            }
            if (mensagens[index].type === "message") {
                criaMensagemTodos();
            }
            if (mensagens[index].type === "private_message") {
               if (mensagens[index].from === user.name || mensagens[index].to === user.name) {
                criaMensagemPrivada();
               }
            }
            lastMessage = container.lastChild;
        }
        lastMessage.scrollIntoView();
    }
}

let mensagem = document.querySelector(".mensagem");

mensagem.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        enviaMensagem();
    }
});

let type = "message";
let to = "Todos"

function enviaMensagem() {

    let mensagemPost = {
        from: user.name,
        to: to,
        text: mensagem.value,
        type: type
    };

    const requestMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemPost);
    requestMessage.then(processarResposta);
    requestMessage.catch(deuRuim);

    function processarResposta () {
        carregaMensagens();
    }

    function deuRuim () {
        alert('seu usuário não está mais logado na sala, a página será recarregada para realizar novo login');
        window.location.reload();
    }

    mensagem.value = "";
}

const painel = document.querySelector(".segunda-tela");

function abrirSegundaTela() {
    painel.classList.remove("escondido");
    mostrarParticipantes();
}

function mostrarParticipantes() {

    let participantes = 0;

    const requestParticipantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    requestParticipantes.then(processarResposta);
    
    function processarResposta (resposta) {
        participantes = resposta.data;
        
        let printParticipantes = document.querySelector(".lista-participantes");
        printParticipantes.innerHTML = `<li data-test="all" onclick="selecionaDestino(this)">
        <ion-icon name="people"></ion-icon>
        <span>Todos</span>
        <ion-icon data-test="check" class="check escondido" name="checkmark-circle"></ion-icon>
    </li>`;

        for(let index = 0; index < participantes.length; index++) {
            printParticipantes.innerHTML = printParticipantes.innerHTML + `<li data-test="participant" onclick="selecionaDestino(this)">
            <ion-icon name="person-circle"></ion-icon>
            <span>${participantes[index].name}</span>
            <ion-icon data-test="check" class="check escondido" name="checkmark-circle"></ion-icon>
        </li>`;
        }
    setInterval (mostrarParticipantes, 10000);
    }
}

function selecionaDestino(li) {
    apagaCheck();

    let marcadoAgora = li.querySelector(".check");
    marcadoAgora.classList.remove("escondido");
    marcadoAgora.classList.add("marcado");

    let span = li.querySelector("span");
    to = span.textContent;

    alteraDestino();
}

function apagaCheck() {
    let marcadoAnteriormente = document.querySelector(".marcado");
    if(marcadoAnteriormente !== null) {
    marcadoAnteriormente.classList.remove("marcado");
    marcadoAnteriormente.classList.add("escondido");
    }
}

const ioniconP = document.querySelector("#publico");
const ioniconR = document.querySelector("#reservado");

function selecionaReservado() {
    type = "private_message";

    ioniconP.classList.add("escondido");

    ioniconR.classList.remove("escondido");

    alteraDestino();
}

function selecionaPublico() {
    type = "message";

    ioniconR.classList.add("escondido");

    ioniconP.classList.remove("escondido");

    alteraDestino();
}

function volta() {
    const painel = document.querySelector(".segunda-tela");
    painel.classList.add("escondido");
}

function limpaTextoUser() {
    if(nomeUser.value !== "") {
        nomeUser.value = nomeUser.value;
     } else {
        nomeUser.value = "";
     }

    nomeUser.classList.remove("inicial");
    nomeUser.classList.add("escreve-user");
}

function limpaTextoMensagem() {
    if(mensagem.value !== "") {
        mensagem.value = mensagem.value;
     } else {
        mensagem.value = "";
     }
}

let p = document.querySelector("p");

function alteraDestino() {
    let string;
    if(type === "message") {
        string = "publicamente"
    }
    if(type === "private_message") {
        string = "reservadamente";
    }
    p.innerHTML = `Enviando para ${to + " (" + string + ")"}`;
}