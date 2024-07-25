const readline = require('readline-sync');

// Função para calcular a média
function calcularMedia(notas) {
    const soma = notas.reduce((a, b) => a + b, 0);
    return soma / notas.length;
}

// Função para cadastrar um aluno
function cadastrarAluno() {
    let aluno = {};

    // Solicita o nome do aluno
    aluno.nome = readline.question('Nome do aluno: ');

    // Cadastro das matérias
    aluno.materias = [];
    let continuarCadastro = true;
    while (continuarCadastro) {
        let materia = {};

        // Solicita o nome da matéria
        materia.nome = readline.question('Nome da matéria: ');

        // Solicita as 3 notas da matéria, com tratamento de erro para entradas inválidas
        materia.notas = [];
        for (let i = 1; i <= 3; i++) {
            let nota;
            while (true) {
                nota = readline.questionFloat(`Nota ${i} de ${materia.nome} (0 a 10): `);
                if (nota >= 0 && nota <= 10) break;
                console.log('Nota inválida. Digite um valor entre 0 e 10.');
            }
            materia.notas.push(nota);
        }

        // Calcula a média da matéria
        materia.media = calcularMedia(materia.notas);

        // Solicita o número de faltas, com tratamento de erro para entradas inválidas
        while (true) {
            materia.faltas = readline.questionInt(`Número de faltas em ${materia.nome}: `);
            if (materia.faltas >= 0) break;
            console.log('Número de faltas inválido. Digite um valor não negativo.');
        }

        // Verifica se o aluno está reprovado por faltas
        materia.reprovadoPorFaltas = materia.faltas > 5;

        aluno.materias.push(materia);

        // Pergunta se deseja cadastrar mais matérias
        continuarCadastro = readline.keyInYNStrict('Deseja cadastrar outra matéria? ');
    }

    return aluno;
}

// Função para exibir os resultados do aluno
function exibirResultados(aluno) {
    console.log(`\nResultados do aluno: ${aluno.nome}`);
    aluno.materias.forEach(materia => {
        console.log(`Matéria: ${materia.nome}`);
        console.log(`Notas: ${materia.notas.join(', ')}`);
        console.log(`Média: ${materia.media.toFixed(2)}`);
        console.log(`Faltas: ${materia.faltas}`);
        if (materia.reprovadoPorFaltas) {
            console.log(`Status: Reprovado por faltas`);
        } else if (materia.media >= 6) {
            console.log(`Status: Aprovado`);
        } else {
            console.log(`Status: Reprovado por notas`);
        }
        console.log('---------------------------');
    });
}

// Função principal para rodar a aplicação
function main() {
    console.log('Bem-vindo ao Sistema de Gestão de Notas!');
    let continuar = true;
    while (continuar) {
        let aluno = cadastrarAluno();
        exibirResultados(aluno);
        continuar = readline.keyInYNStrict('Deseja cadastrar outro aluno? ');
    }
    console.log('Obrigado por usar o Sistema de Gestão de Notas!');
}

main();