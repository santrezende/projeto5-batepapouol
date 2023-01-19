function teste() {
    const painel = document.querySelector(".segunda-tela");
    painel.classList.remove("escondido");
}

function volta() {
    const painel = document.querySelector(".segunda-tela");
    painel.classList.add("escondido");
}

function limpaTexto() {
    const input = document.querySelector("textarea");
    input.innerHTML = "";
}

const container = document.querySelector(".container-mensagens");

function criarElementos(tag, classe) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    return (elemento);
}

function criaMensagemTodos() {
    const div = `<div class="print todos">
    <span class="texto-horario">(09:21:45)</span> <span class="texto-usuario">João</span> para <span
        class="texto-destinatario">Todos</span><span>: Bom dia</span>
</div>`;

    container.innerHTML = container.innerHTML + div;
}

function criaAviso() {
    const div = `<div class="print aviso">
    <span class="texto-horario">(09:21:45)</span> <span class="texto-usuario">João</span> entra na sala...
</div>`;

    container.innerHTML = container.innerHTML + div;
}

function criaMensagemPrivada() {
    const div = `<div class="print privado">
    <span class="texto-horario">(09:21:45)</span> <span class="texto-usuario">João</span> reservadamente para
    <span class="texto-destinatario">Maria</span><span>: Oi gatinha quer tc? d</span>
</div>`;

    container.innerHTML = container.innerHTML + div;
}