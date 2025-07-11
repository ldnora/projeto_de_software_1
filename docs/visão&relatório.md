# Documento de Visão do Produto e Relatório de Andamento do Projeto

Documento de Visão do Produto

Projeto: Catálogo Virtual de Plantas do Jardim Botânico da UFSM

Data: 03/06/2025

Versão: 3.0

Dupla: Leandro Dalla Nora e Lorenzo Facco Comunello

## 1. Objetivo do Produto

Desenvolver uma aplicação web que funcione como um catálogo digital das plantas presentes no Jardim Botânico da UFSM, proporcionando uma experiência interativa, acessível e educativa para visitantes e colaboradores, com informações confiáveis, imagens com descrição e recursos de acessibilidade.

## 2. Stakeholders

- **Equipe de Desenvolvimento:** Implementação da solução
- **Colaboradores do Jardim Botânico:** Inserção e manutenção dos dados
- **Visitantes do Jardim:** Usuários finais que acessam o catálogo
- **Professores e Pesquisadores da UFSM:** Orientação, uso científico e validação das informações

## 3. Características Principais

Visualização de plantas com:

- Nome científico e popular
- Descrição textual confiável
- Interface administrativa para que colaboradores possam adicionar, editar ou excluir plantas
- Aplicação responsiva (usável em celular ou computador)
- Estrutura pensada para futura conversão em PWA (uso offline)

## 4. Tecnologias

- Frontend: Next, Chakra UI, HTML
- Backend: Node.js com Strapi
- Banco de Dados: PostgreSQL

## 5. Requisitos Funcionais (RF)

- **RF01:** Exibir lista de plantas com filtros por nome, família, etc.
- **RF02:** Permitir acesso individual à página de cada planta
- **RF03:** Exibir imagem com descrição textual acessível
- **RF04:** Reproduzir áudio da descrição (TTS)
- **RF05:** Gerar QR Code da URL da planta
- **RF06:** Permitir login de funcionários para edição
- **RF07:** Permitir cadastro, edição e exclusão de plantas via CMS (Strapi)
- **RF08:** Manter o histórico de edições e autoria dos dados do acervo

## 6. Requisitos Não Funcionais (RNF)

- **RNF01:** A aplicação deve ser responsiva
- **RNF02:** O backend deve suportar múltiplos acessos simultâneos
- **RNF03:** A aplicação deve carregar rapidamente mesmo em redes móveis
- **RNF04:** O sistema deve permitir futura extensão para PWA

## 7. Critérios de Sucesso

- Funcionários conseguindo cadastrar novas plantas sem auxílio técnico
- Visitantes satisfeitos com a clareza e acessibilidade das informações
- Infraestrutura simples e sustentável para manutenção a longo prazo

## Andamento do Projeto

### Etapas Concluídas

#### Checkpoint 1

Definição da ideia do projeto
Definição das tecnologias utilizadas
Elaboração do documento de visão do produto

#### Checkpoint 2

Modelagem do banco de dados
Implementação do painel administrativo, a qual permite inserir novas plantas ao acervo de forma automática
Implementação de um protótipo do frontend, com um template que utiliza slugs para criar as páginas de forma automática

#### Checkpoint 3 

Desenvolvimento de uma feature que possibilita criar o QR Code de cada animal cadastrado no acervo do Jardim Botânico, a partir da sua url, o qual é armazenado no banco de dados.
O protótipo criado no checkpoint anterior foi refatorado. Antes, era composto por uma página sem nenhuma estilização do conteúdo. Atualmente, o frontend é composto por uma página home, sobre nós, uma página a qual lista uma imagem e o nome científico de todas as espécies cadastradas no banco de dados, além de uma página dedicada a cada uma dessas espécies contendo todas as informações cadastradas. Também consta o rodapé e o cabeçalho da página web.
Ao cadastar uma nova espécie no catálogo do Jardim Botâncio, é criado de forma automática uma nova página para a espécie recém cadastrada, a qual contém todas as informações disponíveis no bando de dados, e é criado automaticamente um novo card com a imagem e o nome científico na página que contém todos as espécies do acerdo.

#### Checkpoint 4 

Foi feito uma alteração no banco de dados, sendo removido o campo `qrcode`, sendo substituído por uma página própria para a geração dos qrcodes;
As funcionalidades anteriores da catalogação de novas espécies ao banco de dados foram mantidas, sendo que as páginas foram atualizadas, com um frontend mais amigável, bonito e clean para que o usuário possa navegar pelo site;
A página "Home" e "Sobre nós" foram atualizadas, em termos de conteúdo, mas foram refatoradas com o uso de zonas dinâmicas ao invés de blocos estáticos que anteriormente eram usados. Com as zonas dinâmicas, os administradores do site do Jardim Botânico podem adicionar conteúdos de texto (no formato markdown) e imagem como bem preferirem, podendo ser intercalados ou não, com o uso de campos de texto e imagens pré-definidos, os quais são reindenizados corretamente no frontend. Esta mesma abordagem foi aplicada a nova página "Regras" que foi criada;
Os componentes do cabeçalho, liks do cabeçalho e rodapé foram refatorados com um novo layout, cores e estilos, tornando-os mais amigáveis aos usuários do site do JB.