let user = {
    name: prompt('Qual o seu nome?')
};

function fazerLogIn() {
    const requestUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    let response;

    function processarResposta(resposta) {

    }

    function deuRuim(resposta) {
        response = resposta;
        alert('ja tem um user com esse nome, escolhe outro');
        user = {
            name: prompt('Qual o seu nome?')
        };
        fazerLogIn();
    }

    requestUser.then(processarResposta);
    requestUser.catch(deuRuim);
}

let container = document.querySelector(".container-mensagens");

function carregaMensagens() {
    container.innerHTML = "";
    let mensagens;
    function processarResposta(resposta) {
        mensagens = resposta.data;
        for (let index = 0; index < mensagens.length; index++) {

            function criaMensagemTodos() {
                const div = `<div data-test="message" class="print todos">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> para <span
                    class="texto-destinatario">${mensagens[index].to}: </span><span>${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            function criaMensagemTodosLast() {
                const div = `<div data-test="message" class="print todos last">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> para <span
                    class="texto-destinatario">${mensagens[index].to}: </span><span>${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            function criaAviso() {
                const div = `<div data-test="message" class="print aviso">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from} </span><span>${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            function criaAvisoLast() {
                const div = `<div data-test="message" class="print aviso last">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from} </span><span>${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            function criaMensagemPrivada() {
                const div = `<div data-test="message" class="print privado">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> reservadamente para
                <span class="texto-destinatario">${mensagens[index].to}</span><span>: ${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }
            function criaMensagemPrivadaLast() {
                const div = `<div data-test="message" class="print privado last">
                <span class="texto-horario">(${mensagens[index].time})</span> <span class="texto-usuario">${mensagens[index].from}</span> reservadamente para
                <span class="texto-destinatario">${mensagens[index].to}</span><span>: ${mensagens[index].text}</span>
            </div>`;

                container.innerHTML = container.innerHTML + div;
            }

            if (mensagens[index].type === "status" && index === 99) {
                criaAvisoLast();
            } else if (mensagens[index].type === "status" && index !== 99) {
                criaAviso();
            }
            if (mensagens[index].type === "message" && index === 99) {
                criaMensagemTodosLast();
            } else if (mensagens[index].type === "message" && index !== 99) {
                criaMensagemTodos();
            }
            if (mensagens[index].type === "private_message" && index === 99) {
                criaMensagemPrivadaLast();
            } else if (mensagens[index].type === "status" && index !== 99) {
                criaMensagemPrivada();
            }
        }
        const teste = document.querySelector(".last");
        teste.scrollIntoView();
    }

    const requestMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    requestMensagens.then(processarResposta);
}

setInterval(carregaMensagens, 3000);

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