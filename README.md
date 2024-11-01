# API de Gestão Escolar

Este projeto é uma API para gerenciar alunos, funcionários e turmas de uma escola. A aplicação é desenvolvida em **Node.js** com o framework **Express**, utilizando **Sequelize** para interagir com o banco de dados PostgreSQL e autenticação JWT para proteger rotas específicas. A documentação da API é gerada automaticamente com **Swagger**.

<img src="./public/img/devfive1.png" alt="screenshot do projeto">

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **JWT (JSON Web Token)** para autenticação
- **Swagger** para documentação da API
- **Prisma** (opcional, como ORM adicional)

## Requisitos

- **Node.js** v14 ou superior
- **PostgreSQL** configurado e acessível
- **npm** para gerenciamento de pacotes

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mary0077/escola
cd escola
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
DATABASE_URL=postgres://seu_usuario:senha@localhost:5432/sua_base_de_dados
JWT_SECRET=sua_chave_secreta
```

4. Para aplicar migrações no BD usando o prisma, execute

```bash
npx prisma migrate dev
```

5. Instale as dependências do Swagger:

```bash
npm install swagger-jsdoc swagger-ui-express
```

## Configuração

Para iniciar a aplicação, execute:

```bash
node app.js
```
## Documentação

Para um passo a passo simplificado e direto sobre a configuração e utilização da API, consulte a [documentação da API de Gestão Escolar](https://drive.google.com/file/d/1YkGIwd2oja79-SbcGRBJ8-iZ0BxWyQqk/view?usp=sharing).


### Imagem Docker

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-fivedev/genapiescola-blue)](https://hub.docker.com/repository/docker/fivedev/genapiescola/general)

Você pode encontrar a imagem da API na seguinte URL: [Docker Hub - API Escola](https://hub.docker.com/repository/docker/fivedev/genapiescola/general)
- 
- A documentação da API via Swagger estará em: `http://localhost:3000/api-docs`.

## Tabela de Endpoints

### Endpoints de Alunos

| Método  | Endpoint        | Descrição                                 | Autenticação   |
|---------|-----------------|-------------------------------------------|----------------|
| `GET`   | `/alunos`        | Retorna todos os alunos                   | Não            |
| `POST`  | `/alunos`        | Cria um novo aluno                        | Sim (JWT)      |
| `GET`   | `/alunos/{id}`   | Retorna as informações de um aluno        | Não            |
| `PUT`   | `/alunos/{id}`   | Atualiza as informações de um aluno       | Sim (JWT)      |
| `DELETE`| `/alunos/{id}`   | Remove um aluno                           | Sim (JWT)      |

### Endpoints de Funcionários

| Método  | Endpoint         | Descrição                                 | Autenticação   |
|---------|------------------|-------------------------------------------|----------------|
| `POST`  | `/auth/register` | Cria um novo funcionário                  | Não            |
| `GET`   | `/funcionarios`  | Retorna todos os funcionários             | Sim (JWT)      |
| `POST`  | `/auth/login`    | Autentica um funcionário e retorna o JWT  | Não            |

### Endpoints de Turmas

| Método  | Endpoint        | Descrição                                  | Autenticação   |
|---------|-----------------|--------------------------------------------|----------------|
| `GET`   | `/turmas`        | Retorna todas as turmas                    | Não            |
| `POST`  | `/turmas`        | Cria uma nova turma                        | Sim (JWT)      |
| `GET`   | `/turmas/{id}`   | Retorna as informações de uma turma        | Não            |
| `PUT`   | `/turmas/{id}`   | Atualiza as informações de uma turma       | Sim (JWT)      |
| `DELETE`| `/turmas/{id}`   | Remove uma turma                           | Sim (JWT)      |

### Autenticação JWT

- Para rotas que requerem autenticação JWT, você deve incluir o token no cabeçalho da requisição.
- Exemplo de cabeçalho de autenticação:

```
Authorization: Bearer <seu_token_jwt>
```

## Exemplo de Uso

### Criar um novo aluno

```bash
curl -X POST "http://localhost:3000/alunos" -H "Authorization: Bearer <seu_token>" -H "Content-Type: application/json" -d '{
  "nome": "João Silva",
  "email": "joao.silva@example.com",
  "idade": 16,
  "nota_primeiro_semestre": 8.5,
  "nota_segundo_semestre": 9.0
}'
```

### Autenticar um funcionário

```bash
curl -X POST "http://localhost:3000/login" -H "Content-Type: application/json" -d '{
  "email": "funcionario@example.com",
  "senha": "sua_senha"
}'
```

O retorno será um token JWT que poderá ser usado para acessar rotas protegidas:

```json
{
  "token": "seu_token_jwt"
}
```

## Estrutura de Pastas

A estrutura básica do projeto é a seguinte:

```
/api-gestao-escolar
│
├── /config              # Configurações de banco de dados
│   └── database.js      # Configuração do Sequelize
│
├── /controllers         # Lógica dos controladores
│   ├── alunoController.js
│   ├── funcionarioController.js
│   └── turmaController.js
│
├── /models              # Definições dos modelos Sequelize
│   ├── aluno.js
│   ├── funcionario.js
│   └── turma.js
│
├── /routes              # Definições das rotas
│   ├── alunos.js
│   ├── funcionarios.js
│   └── turmas.js
│
├── /services            # Serviços auxiliares (ex. autenticação)
│   └── authService.js
│
├── /swagger             # Configuração do Swagger para documentação
│   └── swagger.js
│
├── app.js               # Arquivo principal da aplicação
├── .env                 # Variáveis de ambiente
├── package.json         # Gerenciamento de dependências e scripts
└── README.md            # Documentação do projeto
```

## 💻 Demonstração
Para visualizar uma prévia do projeto <a href="https://genapiescola.onrender.com/auth/login/" target="_blank"><b>clique aqui</b></a>

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões, sinta-se à vontade para entrar em contato com a equipe 'Dev.Five'.
