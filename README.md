# Clyvo ELLV 🐾

Aplicativo mobile de gestão veterinária desenvolvido em **React Native com Expo**, como parte do **Challenge FIAP 2026** em parceria com a **Clyvo Vet**. A proposta centraliza o cadastro de pacientes e o histórico clínico de cada animal, integrado em tempo real a um backend próprio.

---

## 🎥 Vídeo de apresentação

📺 [Assista no YouTube](COLE_AQUI_O_LINK_DO_VIDEO)

---

## 🐕 O problema

Clínicas veterinárias costumam perder receita recorrente — vacinas, protocolos anuais, retornos — porque a rotina do dia a dia empurra as consultas preventivas pra segundo plano. Sem um histórico clínico centralizado, o paciente só volta à clínica em situação de emergência, o que atrasa diagnósticos e compromete o tratamento.

O Clyvo ELLV resolve isso reunindo, em um único lugar, o cadastro de cada paciente (animal + responsável) e o histórico completo de suas consultas, sincronizado diretamente com o backend — sem planilhas soltas, sem papel, sem dado perdido.

---

## ✨ Funcionalidades

- **Autenticação real**, com sessão persistida — o usuário não precisa logar novamente a cada vez que abre o app
- **Home** com carrossel das próximas consultas agendadas
- **Consultas** — listagem com busca por animal, filtro por status (Agendado / Atrasado / Concluído), criação de nova consulta (cadastrando automaticamente animal e responsável, caso ainda não existam) e detalhe com edição e remoção
- **Pacientes** — listagem de todos os animais cadastrados, com busca por nome do animal ou do responsável, e ficha completa com edição e remoção
- **Perfil** — dados do usuário logado, indicadores de uso (consultas do mês, agendadas, atrasadas, total de pacientes, taxa de retorno), edição de conta, exclusão de conta e logout
- **Validação de formulários** com Yup em todas as telas que possuem entrada de dados
- **Rotas protegidas** — enquanto o usuário não está autenticado, as telas internas do app sequer existem na árvore de navegação
- Integração completa com a API — nenhum dado é mockado ou mantido apenas em memória local (à exceção do token de sessão)

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação via API, com persistência de sessão |
| **Cadastro** | Criação de conta nova, com login automático em seguida |
| **Home** | Carrossel com as próximas consultas agendadas |
| **Consultas** | Listagem com busca, filtro por status e criação de novas consultas |
| **Detalhe da Consulta** | Dados completos da consulta, do animal e do responsável, com edição e remoção |
| **Pacientes** | Listagem de todos os pacientes, com busca por animal ou responsável |
| **Ficha do Paciente** | Dados completos do animal e do responsável, histórico de consultas e atalho para WhatsApp |
| **Perfil** | Dados do usuário, indicadores de uso, edição de conta, exclusão de conta e logout |

---

## 👥 Integrantes

| RM | Nome | Turma |
|---|---|---|
| RM561713 | Eduardo Batista Locaspi | 2TDSPI |
| RM565799 | Leticia Santiago e Silva | 2TDSPW |
| RM565698 | Liana Lyumi Morisita Fujisima | 2TDSPI |
| RM561833 | Victor Alves Lopes | 2TDSPI |

---

## ⚠️ Antes de rodar: acorde a API

O backend está publicado no **Render**, cujo plano gratuito hiberna a aplicação após um período de inatividade. Se o app não conseguir se conectar (erro de "sem conexão" logo no login), é esse o motivo.

**Antes de abrir o app**, acesse o Swagger da API e aguarde de **1 a 3 minutos**:

👉 https://apirest-node-chllng.onrender.com/docs/

Assim que a página carregar por completo, a API está ativa e o app funciona normalmente.

---

## 🔑 Credenciais de teste

```
E-mail: dev@clyvovet.dev
Senha:  dev123456
```

Esse é um usuário já pré-pronto, para facilitar testes e correções. Mas é totalmente possível criar o seu próprio usuário na tela de Cadastro. Esse usuário de teste já tem dados cadastrados, para facilitar a visualização. 🚀

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS mais recente)
- [Git](https://git-scm.com/downloads)
- App **Expo Go** no celular (o projeto usa **Expo SDK 54**):
  - [Android — Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS — App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Caso o Expo Go da loja já esteja numa versão mais nova (SDK incompatível), baixe a versão certa direto do site oficial: [Expo Go SDK 54 (Android)](https://expo.dev/go?sdkVersion=54&platform=android&device=true)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/victoralves10/MOBILE-EXPO-CHLLNG.git

# Entre na pasta do projeto
cd MOBILE-EXPO-CHLLNG

# Instale as dependências
npm install

# Instale as dependências nativas
npx expo install

# Inicie o projeto (--clear limpa o cache do Metro, evita problemas de build antigo)
npx expo start --clear
```

Com o Expo Go instalado, conecte o celular na **mesma rede Wi-Fi** do computador e escaneie o QR Code exibido no terminal.

> Não esqueça do passo "Acorde a API" logo acima antes de testar — sem isso, o login não vai responder.

---

## 🛠️ Tecnologias

- React Native + **Expo SDK 54**
- TypeScript
- React Navigation (Stack + Bottom Tabs), com rotas protegidas por Context de autenticação
- Axios
- TanStack Query (`useQuery` / `useMutation`) para toda a integração com a API
- Yup, para validação dos formulários
- AsyncStorage (usado apenas para persistir o token de sessão)
- Ionicons (`@expo/vector-icons`)

---

## 📁 Estrutura do projeto

```
src/
├── components/        # Componentes reutilizáveis (cards, inputs, modais, filtros)
├── context/           # AuthContext — estado global de autenticação e proteção de rotas
├── controllers/       # Lógica de negócio (orquestra os services)
├── global/            # Paleta de cores
├── hooks/             # Lógica de cada tela, com TanStack Query
├── models/            # Interfaces TypeScript dos dados da API
├── navigation/        # Configuração de rotas (públicas x protegidas)
├── screens/           # Telas do app (somente UI)
├── services/          # Chamadas HTTP à API (axios)
├── storage/           # Acesso ao AsyncStorage (token de sessão)
├── utils/             # Funções puras (formatação, toast, validações de baixo nível)
└── validations/       # Schemas do Yup usados pelos formulários
```