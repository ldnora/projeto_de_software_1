# Documento de Visão do Produto e Relatório de Andamento do Projeto

Documento de Visão do Produto

Projeto: Catálogo Virtual de Plantas do Jardim Botânico da UFSM

Data: 13/05/2025

Versão: 2.0

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

- Frontend: Next, Tailwind CSS, HTML
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

- Definição da ideia do projeto
- Definição das tecnologias utilizadas
- Elaboração do documento de visão do produto

#### Checkpoint2

- Modelagem do banco de dados
- Implementação do painel administrativo, a qual permite inserir novas plantas ao acervo de forma automática
- Implementação de um protótipo do frontend, com um template que utiliza de slugs para criar as páginas de forma automática