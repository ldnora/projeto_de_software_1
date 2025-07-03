# Projeto de extensão em parceria com o Jardim Botânico

## Como rodar o projeto

### Backend (Strapi) 

- Entre na pasta `backend` 
- Rode o comando `docker compose up --build`. Assim, todos os serviços irão subir.

### Frontend 

- Entre na pasta `frontend`
- Rode o comando `npm install; npm run dev`. 

### QR Code 

- Entre na pasta `qrcode-admin`
- Rode o comando `npm install; npm run dev`


## Requisições

### Requisição para todos os dados da API de plantas 

`curl http://localhost:1337/api/plantas`

### Requisição para apenas algumas das plantas da API

`curl "http://localhost:1337/api/plantas?filters\[nome_popular\][$eq]=teste"`

`curl "http://localhost:1337/api/plantas?filters\[slug\][$eq]=teste"`


