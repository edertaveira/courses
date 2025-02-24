# Instruções para o Projeto

## Introdução

API Backend para listar, adicionar, editar e excluir cursos. 

## Requisitos

- Node.js v20.11.1
- TypeScript
- Express.js
- JWT para autenticação
- better‑sqlite3 para acesso ao SQLite
- Docker & Docker Compose
- express-validator para validação de inputs
- Jest & Supertest para testes unitários

## Estrutura

```
.
├── src
│   ├── controllers
│   │   └── authController.ts
│   │   └── coursesController.ts
│   ├── middleware
│   │   └── auth.ts
│   │   └── validation.ts
│   ├── models
│   │   └── course.ts
│   ├── routes
│   │   └── courses.ts
│   ├── services
│   │   └── coursesService.ts
│   ├── db.ts
│   └── index.ts
│   └── swaggerOpotions.ts
├── test
│   └── auth.test.ts
│   └── courses.test.ts
├── .env.example
├── .dockerignore
├── .gitignore
├── jest.config.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Pré-requisitos

- Node.js v20.11.1 ou superior
- Docker & Docker Compose
- Git

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL-do-repositório>
   ```

2. Instale as dependências:
   ```bash
   cd courses
   npm install
   ```

## Variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example. Exemplo:

```
PORT=3000
JWT_SECRET=SuaSenha
USERNAME=seuusername
PASSWORD=suasenha
```

## Execução

1. Compile o projeto:

```bash
npm run build
```

2. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação rodará na porta definida no arquivo .env (padrão 3000).

## Rodando o Docker

```bash
docker-compose up --build
```

Irá construir a imagem Docker e iniciar o container. A aplicação estará disponível na porta 3000.

## API Endpoints

### Autenticação

- POST /login
  - Descrição: Autentica o usuário e retorna um token JWT.
  - Body:
  ```json
  {
    "username": "admin",
    "password": "admin"
  }
  ```
  - Response
  ```json
  {
    "token": "TOKEN"
  }
  ```

### Cursos

Inclua o token JWT no header Authorization com o formato: Bearer <token>.

- POST /courses

  - Descrição: Cria um novo curso.
  - Body:

  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "duration": 10,
    "instructor": "Instructor Name"
  }
  ```

  - Response: Retorna o curso criado com status 201.

- GET /courses

  - Descrição: Retorna a lista de cursos. É possível filtrar por título utilizando o parâmetro de query title.

- GET /courses/:id

  - Descrição: Retorna os detalhes de um curso específico pelo ID.

- PUT /courses/:id

  - Descrição: Atualiza os dados de um curso.
  - Body: Mesma estrutura do POST /courses.

- DELETE /courses/:id
  - Descrição: Remove um curso pelo ID.

## Documentação Swagger

A API conta com documentação interativa via Swagger.  
Após iniciar a aplicação, acesse:

```
http://localhost:3000/docs
```

Essa documentação oferece detalhes sobre todos os endpoints e permite testar as requisições.

## Validação e Testes

- Validação:
  Os endpoints de criação e atualização (POST e PUT) utilizam o express-validator para validar os campos. Caso a validação falhe, a API retorna status 400 com os erros encontrados.
- Testes:
  Os testes foram implementados com Jest e Supertest. Para rodá-los:

```bash
npm run test
```
