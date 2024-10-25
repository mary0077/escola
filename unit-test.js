let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5ODQ3MDA2LCJleHAiOjE3Mjk4NTc4MDZ9.LGmaWNb3oWxY3HrnlgJoC-BQTldop2mbmSfswPMReyQ';
let alunoId, turmaId; // IDs a serem atribuídos após criação
const host = 'http://localhost:3000'
const alunoTemplate = {
    nome: "Willian Massao",
    email: "teste"+ Math.floor(Math.random() * 999) + "@gmail.com",
    idade: 23,
    nota_primeiro_semestre: 9,
    nota_segundo_semestre: 9 
};
const funcionarioTemplate = { 
    nome: "Willian Massao",
    email: "teste"+ Math.floor(Math.random() * 999) + "@gmail.com",
    senha: "umasenhabemlegalecriativa", 
    cargo: "Instrutor"
};
const turmaTemplate = {
    nome: "AWS RE/START",
    instrutor: "Thiago_e_Jacqueline"
};

// Função para requisição
async function fetchEndPoint(endpoint, method, body = null) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        }
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(host + endpoint, options);
        const data = await response.json();
        if (!response.ok) {
            console.error(`Erro em ${method} ${endpoint}:`, data);
            return null;
        }
        console.log(`Sucesso em ${method} ${endpoint}:`);
        return data;
    } catch (error) {
        console.error(`Erro na requisição ${method} ${endpoint}:`, error);
        return null;
    }
}

// Função principal de testes em sequência
async function testEndpoints() {
    console.log("Testando rotas...\n");
    // 9. Criar funcionário (POST /funcionarios)
    const funcionario = await fetchEndPoint('/funcionarios', 'POST', funcionarioTemplate);
    
    // 10. Login do funcionário (POST /login)
    const loginResponse = await fetchEndPoint('/auth/login', 'POST', {
        email: funcionarioTemplate.email,
        senha: funcionarioTemplate.senha
    });
    
    token = loginResponse.token
    // Lista funcionarios
    await fetchEndPoint('/funcionarios', 'GET');
        
    // 1. Criar um aluno (POST /alunos)
    const aluno = await fetchEndPoint('/alunos', 'POST', alunoTemplate);
    if (aluno) alunoId = aluno.id;

    // 2. Listar alunos (GET /alunos)
    await fetchEndPoint('/alunos', 'GET');

    // 3. Buscar aluno pelo ID (GET /alunos/{id})
    if (alunoId) await fetchEndPoint(`/alunos/${alunoId}`, 'GET');

    // 4. Atualizar aluno (PUT /alunos/{id})
    if (alunoId) await fetchEndPoint(`/alunos/${alunoId}`, 'PUT', { nome: "Willian M Atualizado" });

    // 5. Criar turma (POST /turmas) com ID do aluno dentro do campo "alunos"
    let turma = await fetchEndPoint('/turmas', 'POST', { 
        ...turmaTemplate, 
        Alunos: [alunoId] // Inclui o ID do aluno no campo "alunos"
    });
    if (turma) turmaId = turma.id;

    // 6. Listar turmas (GET /turmas)
    await fetchEndPoint('/turmas', 'GET');

    // 7. Buscar turma pelo ID (GET /turmas/{id})
    if (turmaId) await fetchEndPoint(`/turmas/${turmaId}`, 'GET');

    // 8. Atualizar turma (PUT /turmas/{id})
    if (turmaId) await fetchEndPoint(`/turmas/${turmaId}`, 'PUT', { nome: "Turma Atualizada" });

    // 11. Listar funcionários (GET /funcionarios)
    await fetchEndPoint('/funcionarios', 'GET');

    // 13. Excluir turma (DELETE /turmas/{id})
    if (turmaId) await fetchEndPoint(`/turmas/${turmaId}`, 'DELETE');
    
    // 12. Excluir aluno (DELETE /alunos/{id})
    if (alunoId) await fetchEndPoint(`/alunos/${alunoId}`, 'DELETE');
    await fetchEndPoint('/funcionarios/'+ funcionario.id, 'DELETE');
    console.log("Rotas testadas...");

    // 13. Regras de negocios
    // 3.a
    console.log("\n\nTestando regras de negocios!!!.");
    console.log("\nAluno com E-mail igual.");
    let alunoRegra = await fetchEndPoint('/alunos', 'POST', alunoTemplate);
    await fetchEndPoint('/alunos', 'POST', alunoTemplate);
    if (alunoRegra.id) await fetchEndPoint(`/alunos/${alunoRegra.id}`, 'DELETE');
    console.log("\nFuncionario com E-mail igual.");
    let funcionarioRegra = await fetchEndPoint('/funcionarios', 'POST', funcionarioTemplate);
    await fetchEndPoint('/funcionarios', 'POST', funcionarioTemplate);
    await fetchEndPoint('/funcionarios/'+ funcionarioRegra.id, 'DELETE');
    // 3.b
    console.log("\n\nSolicitação com autenticação.");
    await fetchEndPoint('/alunos', 'GET');
    console.log("\nSolicitação sem autenticação.");
    let tempToken = token;
    token = ""
    await fetchEndPoint('/alunos', 'GET');
    token = tempToken
    // 3.d
    console.log("\n\nVerificando associação entre Alunos e Turmas");
    alunoRegra = await fetchEndPoint('/alunos', 'POST', alunoTemplate);
    turma = await fetchEndPoint('/turmas', 'POST', { 
        ...turmaTemplate, 
        Alunos: [alunoRegra.id]
    });
    await fetchEndPoint('/turmas', 'POST', { 
        ...turmaTemplate, 
        Alunos: [alunoRegra.id]
    });
    if (turma.id) await fetchEndPoint(`/turmas/${turma.id}`, 'DELETE');
    if (alunoRegra.id) await fetchEndPoint(`/alunos/${alunoRegra.id}`, 'DELETE');
}

// Executa o teste
testEndpoints();
