# Clyvo ELLV 🐾

Clyvo ELLV é o app mobile desenvolvido em React Native com Expo como parte do **Challenge FIAP 2026**, em parceria com a **CLYVO VET** — uma solução que centraliza a gestão de consultas e pacientes de clínicas veterinárias.

---

## 🐕 O problema e como atacamos ele

Clínicas veterinárias perdem receita de vacinas e protocolos anuais porque a rotina agitada do dia a dia faz com que consultas preventivas fiquem em segundo plano. Sem um histórico clínico centralizado, o animal só volta à clínica em emergências — o que atrasa o diagnóstico e prejudica o tratamento.

O Clyvo ELLV ataca isso concentrando em um só lugar o cadastro de pacientes (animal + responsável) e o histórico completo de consultas de cada um, com tudo sincronizado direto com o backend — nada de planilha solta ou papel.

---

## ✨ O que o app faz hoje

- **Login e cadastro reais**, com sessão persistida (o usuário não precisa logar de novo toda vez que abre o app)
- **Home** com carrossel das próximas consultas agendadas
- **Consultas**: listagem com busca por animal, filtro por status (Agendado / Atrasado / Concluído), criação de nova consulta (já cadastrando animal e responsável, se ainda não existirem) e tela de detalhes com edição e remoção
- **Pacientes**: listagem de todos os animais cadastrados com busca por nome do animal ou do responsável, e ficha completa (dados do animal, do responsável e histórico de consultas) com edição e remoção
- **Perfil**: dados do usuário logado, KPIs simples (consultas do mês, agendadas, atrasadas, total de pacientes, taxa de retorno), edição de dados, apagar conta e logout
- **Validação de formulários com Yup** em todas as telas com formulário (login, cadastro, consultas e pacientes)
- **Proteção de rotas**: enquanto o usuário não está autenticado, as telas internas do app nem existem na navegação — não tem como acessá-las por atalho, deep link ou botão de voltar
- Tudo (exceto o token de sessão) vem e volta pra API em tempo real — não há dado mockado ou salvo só localmente

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação real via API, com sessão salva — ao reabrir o app, o usuário já entra direto |
| **Cadastro** | Criação de conta nova, já loga automaticamente depois de cadastrar |
| **Home** | Carrossel com as próximas consultas agendadas |
| **Consultas** | Listagem com busca, filtro por status (Agendado / Atrasado / Concluído) e criação de novas consultas |
| **Detalhe da Consulta** | Dados completos da consulta, do animal e do responsável — com opções de editar e remover |
| **Pacientes** | Listagem de todos os pacientes com busca por nome do animal ou do responsável |
| **Ficha do Paciente** | Dados completos do animal e do responsável, histórico de consultas e atalho para o WhatsApp |
| **Perfil** | Dados do usuário logado, KPIs de consultas/pacientes, edição de perfil, apagar conta e logout |

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

O backend está publicado gratuitamente no **Render**, e o plano gratuito hiberna a API depois de um tempo sem uso. Se o app não conseguir se conectar (erro de "sem conexão" logo no login), é isso.

**Antes de abrir o app**, acesse o Swagger da API e espere de **1 a 3 minutos**:

👉 https://apirest-node-chllng.onrender.com/docs/

Assim que a página do Swagger carregar, a API já está acordada e o app funciona normalmente.

---

## 🔑 Credenciais de teste

```
E-mail: dev@clyvovet.dev
Senha:  dev123456
```

Esse usuário já vem pré-preenchido na tela de login. É totalmente possível criar sua própria conta pelo app (tela de Cadastro) — mas pra facilitar testes e correção, deixamos esse usuário de teste com **pacientes e consultas já cadastrados no banco**, então dá pra avaliar a navegação e as funcionalidades sem precisar montar dado nenhum na mão. 🚀

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS mais recente)
- [Git](https://git-scm.com/downloads)
- App **Expo Go** no celular (o projeto usa **Expo SDK 54**):
  - [Android — Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS — App Store](https://apps.apple.com/app/expo-go/id982107779)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/AntonioCarvalhoFIAP/challenge-1-victoralves10.git

# Entre na pasta do projeto
cd challenge-1-victoralves10

# Instale as dependências
npm install

# Instale as dependências nativas
npx expo install

# Inicie o projeto
npx expo start
```

Com o Expo Go instalado, conecte o celular na **mesma rede Wi-Fi** do computador e escaneie o QR Code exibido no terminal.

> Não esquece do passo "Acorde a API" lá em cima antes de testar — sem isso o login não vai responder.

---

## 🛠️ Tecnologias

- React Native + **Expo SDK 54**
- TypeScript
- React Navigation (Stack + Bottom Tabs), com rotas protegidas por Context de autenticação
- Axios
- TanStack Query (`useQuery` / `useMutation`) para toda a integração com a API
- Yup, para validação dos formulários
- AsyncStorage (usado só para persistir o token de sessão)
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
├── screens/           # Telas do app (só UI)
├── services/          # Chamadas HTTP à API (axios)
├── storage/           # Acesso ao AsyncStorage (token de sessão)
├── utils/             # Funções puras (formatação, toast, validações de baixo nível)
└── validations/       # Schemas do Yup usados pelos formulários
```
