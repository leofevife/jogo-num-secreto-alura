//querySelector pra escolher que estrutura eu quero selecionar. document é onde vou acessar
// let titulo = document.querySelector('h1');
//innerHTML é o comando pra mudar 
// titulo.innerHTML = 'jogo do número secreto';
// sem criar a variavel fica assim: document.querySelector('h1').innerHTML = 'jogo do número secreto';  
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10:';


// Aqui eu to em dúvida do pq não funfa por o nome da variavel dentro dos parenteses. E pq funfa o nome das variaveis serem o msm

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;
exibirMensagemInicial();

function mudarTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute () {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        mudarTextoTela('h1', 'Parabéns, você acertou!');
        let PalavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Usou ${tentativas} ${PalavraTentativa}`;
        mudarTextoTela('p', mensagemTentativas);
        // aqui em baixo é pra pegar pelo ID
        document.getElementById('reiniciar').removeAttribute('disabled');

    }

    else {
        mudarTextoTela('h1', 'EROU!');
        if (numeroSecreto > chute) {
            mudarTextoTela('p', 'O número secreto é maior!');
        }
        else {
            mudarTextoTela('p', 'O número secreto é menor!');
        }
    
        tentativas++;
        limparCampo();
}
}

mudarTextoTela('h1', 'Jogo do número secreto');
mudarTextoTela('p', 'Escolha um número de 1 a 10:');

// o RETURN permite eu invocar algo para fora da função. Posso usar mais de um RETURN, mas só um pode ser executado! tipo, usar um IF/ELSE, só um deles vai ser executado
function gerarNumAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumAleatorio();
            }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
        }

// o INCLUDES verifica se o elemento ja esta na lista

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial() {
    mudarTextoTela('h1', 'Jogo do número secreto');
    mudarTextoTela('p', 'Escolha um número de 1 a 10:');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //aqui em baixa a gente colocou o atributo de volta com o setAttribute, com um parametro depois da virgula, true or false, habilitado ou desabilitado
    document.getElementById('reiniciar').setAttribute('disabled', true);
}



