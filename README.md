# Projeto de extensão em parceria com o Jardim Botânico

## Como rodar o projeto

Entre na pasta `site-jardim-botanico` e rode o comando `docker compose up --build`. Assim, todos os serviços irão subir.

## Requisições

### Requisição para todos os dados da API

`curl http://localhost:1337/api/planta`

### Requisição para apenas algumas das plantas da API

`curl "http://localhost:1337/api/plantas?filters\[nome_popular\][$eq]=teste"`

`curl "http://localhost:1337/api/plantas?filters\[slug\][$eq]=teste"`
