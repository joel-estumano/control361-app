# Control361 App

### Bem vindo ao projeto Control361 App

### Autores

- [Joel Estumano](https://www.joelestumano.com/)

### Demonstração

- [Demo](https://control361-app-bl7m.vercel.app/) 🚀

Esta iniciativa foi desenvolvida como uma proposta para o desafio de vaga full stack com foco em frontend, utilizando React, TypeScript e Vite, além da biblioteca de componentes [ShadCN UI](https://ui.shadcn.com/docs/installation/vite).

Versão do Node.js: `22.14.0`

O projeto atende aos seguintes requisitos:

Especificações da tela:

- O mapa deve apresentar todos os veiculos simultaneamente e ser atualizada a cada 2 minutos automáticamente.
- A lista deve carregar 20 veiculos e ter um carrossel infinito que carrega mais veiculos sempre que scrolamos até o final da lista.
- Ao clicar em um veiculo da tela, apresentar os detalhes do veiculo.
- Entre os detalhes do veiculo existe um link que abre o google maps nas coordenadas do veiculo.
- Filtro pela placa do veiculo e pelo numero de frota.

Devendo ser desenvolvido com:

- JS, React e NestJS
- TypeScript
- Testes com Jest / React Testing Libery
- React Query para gerenciamento de requisições
- Estilização com TailwindCSS
- Formulários com React Hook Form e validação com Zod
- Conhecimento em processos de CI/CD

### Corte Figma

![Figma](https://joel-estumano.github.io/public/img/apps/teste-control361-figma.png)

### Clonando o Repositório e Rodando o Projet 🛠️

Usando o terminal:

- Clone o repositório usando o seguinte comando:

```
git clone https://github.com/joel-estumano/control361-app.git
```

- No diretório do projeto instale as dependências:

```
npm install
```

### Variáveis de Ambiente

❗ Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env` 

- *Copie e cole o arquivo `.env.example`, renomeie para `.env` e preencha com as informações necessárias.*

#### URL base da API utilizada na aplicação

`VITE_API_URL`=https://develop-back-rota.rota361.com.br

#### 🔑 Token de autenticação para acessar a API

`VITE_API_TOKEN`

#### 🔑 Chave de API do Google Maps

`VITE_GOOGLE_MAPS_API`

[Saiba como obter uma chave de API do Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br) 🗺️

#### ⏱️Tempo de atualização automática (em segundos). Exemplo: 60 para 1 minuto.

`VITE_TIME_IN_SECONDS_FOR_AUTOMATIC_UPDATE`

Execute o projeto

```
 npm run dev
```

A aplicação estará acessível em: http://localhost:5173/ 💻

### Docker 🐋

Antes de iniciar, certifique-se de que você tem:
- Docker instalado [Informações e download aqui](https://www.docker.com/get-started/).
- Docker Compose configurado corretamente.
- Arquivo `.env` devidamente preenchido com as variáveis de ambiente necessárias.

Execute:
```
docker-compose up --build -d
```
Após iniciar, a aplicação estará acessível em: http://localhost:5173/ 💻

### Documentação da API

API da Rota para rastreamento de veículos e gerenciamento de dados relacionados a viagens, alertas, motoristas, etc.

[Documentação da API](https://develop-back-rota.rota361.com.br/recruitment)🛢️
