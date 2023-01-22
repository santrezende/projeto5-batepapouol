let user = {
    name: prompt('Qual o seu nome?')
};

let container = document.querySelector(".container-mensagens");

function fazerLogIn() {

    const requestUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    let response;

    function deuRuim(resposta) {
        response = resposta;
        alert('ja tem um user com esse nome, escolhe outro');
        user = {
            name: prompt('Qual o seu nome?')
        };
        fazerLogIn();
    }

    function processarResposta() {
        alert ('login realizado com sucesso');
        setInterval(manterConexao, 5000);
        setInterval(carregaMensagens, 3000);
    } 

    requestUser.then(processarResposta);
    requestUser.catch(deuRuim);
}

let responseConexao = 0;
function manterConexao () {
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

function enviaMensagem() {
    let mensagem = document.querySelector(".mensagem");
    let mensagemPost = {
        from: user.name,
        to: "Todos",
        text: mensagem.value,
        type: "message"
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

function teste() {
    const painel = document.querySelector(".segunda-tela");
    painel.classList.remove("escondido");
}

function volta() {
    const painel = document.querySelector(".segunda-tela");
    painel.classList.add("escondido");
}

function limpaTexto(caixaDeTexto) {
    const input = caixaDeTexto;
    input.innerHTML = "";
}

fazerLogIn();