# Clyvo ELLV 🐾

Aplicativo mobile de gestão veterinária feito em **React Native com Expo**, para o **Challenge FIAP 2026** em parceria com a **Clyvo Vet**.

O app junta num lugar só o cadastro de pacientes (animal + responsável), o histórico de consultas de cada animal e os lembretes das próximas consultas. Tudo é integrado em tempo real a um backend próprio (Node.js + Oracle) publicado na nuvem.

---

## 🎥 Vídeo de apresentação

📺 **[Assista no YouTube](https://youtu.be/KJSErql3FY4)**

---

## 📲 Instalar o app (Firebase App Distribution)

O APK do app está publicado no **Firebase App Distribution**.

1. Abra o convite que chegou no seu e-mail (remetente: Firebase App Distribution).
2. Aceite o convite e baixe o **Clyvo ELLV**.
3. Se o Android pedir, permita a instalação de apps de fontes desconhecidas.

Para conferir a versão instalada, abra **Perfil → ☰ → Sobre o app**. A tela mostra a versão e o **hash do commit** usado para gerar o APK. Esse hash é o mesmo commit deste repositório.

---

## 🔑 Credenciais de teste

```
E-mail: dev@clyvovet.dev
Senha:  dev123456
```

Esse usuário já tem pacientes, consultas e casos de doença cadastrados, para facilitar a avaliação. Também dá para criar uma conta nova na tela de Cadastro.

---

## 🐕 O problema

Clínicas veterinárias perdem receita recorrente (vacinas, protocolos anuais, retornos) porque a rotina empurra as consultas preventivas para segundo plano. Sem um histórico centralizado, o paciente só volta em emergência.

O Clyvo ELLV resolve isso com um cadastro único de pacientes, o histórico completo de cada animal e **lembretes no celular** antes de cada consulta, tudo sincronizado com o backend.

---

## ✨ Funcionalidades

- **Login e cadastro** com sessão salva (não precisa entrar de novo ao abrir o app).
- **Home**: saudação, atalhos, carrossel com as próximas consultas e o painel **Suas regiões**.
- **Suas regiões**: consultas e pacientes por bairro, consultas atrasadas e doenças registradas, com alerta de **possível surto** (mais de 5 casos da mesma doença na região).
- **Consultas**:
  - abas Agendadas / Atrasadas / Concluídas;
  - busca pelo nome do animal (com debounce);
  - nova consulta nos 3 casos: paciente cadastrado, animal novo com responsável cadastrado, ou os dois novos;
  - detalhe com edição, diagnóstico, remoção, videochamada e WhatsApp.
- **Pacientes**: busca por animal ou responsável, ficha completa com histórico, edição e remoção.
- **Perfil**: indicadores do consultório (realizadas no mês, agendadas, atrasadas, pacientes, taxa de retorno), edição de dados, troca de senha, exclusão da conta e logout.
- **Notificações locais**: dois lembretes por consulta (alguns minutos antes e na hora). Tocar na notificação abre a consulta.
- **Tema claro e escuro**: automático (segue o celular) ou escolhido pelo usuário em Perfil → Aparência.
- **Sobre o app**: versão, hash do commit do build, data do build e equipe.

---

## 📱 Telas

| Tela | O que mostra |
|---|---|
| **Login** | Entrada com e-mail e senha |
| **Cadastro** | Criação de conta, já entrando no app |
| **Home** | Atalhos, próximas consultas e o painel Suas regiões |
| **Consultas** | Abas por status, busca e botão de nova consulta |
| **Detalhes da consulta** | Consulta, animal e responsável, com editar e remover |
| **Pacientes** | Lista com busca |
| **Ficha do paciente** | Animal, responsável e histórico de consultas |
| **Perfil** | Indicadores e menu da conta (dados, senha, notificações, aparência, sobre, sair, apagar conta) |
| **Sobre o app** | Versão, commit do build e equipe |

---

## 🔔 Notificações

- O **backend** decide quando avisar e o texto de cada aviso.
- O app agenda dois lembretes locais por consulta agendada: um com antecedência e outro na hora da consulta.
- Ao criar, editar ou remover uma consulta, os lembretes são refeitos.
- O app também sincroniza com o backend ao abrir, ao voltar para a frente e a cada 15 segundos.
- Em **Perfil → Notificações** dá para ligar ou desligar os lembretes e enviar uma notificação de teste.

---

## 🧱 Arquitetura

```
src/
├── components/   # Componentes reutilizáveis (cards, campos, modais, seletores, painel de regiões)
├── context/      # AuthContext: sessão e rotas protegidas
├── hooks/        # Lógica de cada tela (TanStack Query: useQuery / useMutation)
├── models/       # Tipos TypeScript das respostas da API
├── navigation/   # Rotas: Stack + Bottom Tabs, abrindo a consulta ao tocar na notificação
├── screens/      # Telas (só interface)
├── services/     # Chamadas HTTP (axios) e notificações
├── storage/      # Token de sessão (AsyncStorage)
├── theme/        # Paletas clara e escura, contexto de tema e toast
└── utils/        # Máscaras, toast e log
```

---

## 🚀 Rodar o projeto pelo código

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS)
- [Git](https://git-scm.com/downloads)
- App **Expo Go** no celular, compatível com o **Expo SDK 58**

### Passo a passo

```bash
git clone https://github.com/victoralves10/MOBILE-EXPO-CHLLNG.git
cd MOBILE-EXPO-CHLLNG
npm install
npx expo start --clear
```

Escaneie o QR Code do terminal com o Expo Go. O app já usa a API publicada, então não precisa rodar o backend.

### Gerar o APK

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

O perfil `preview` (em `eas.json`) gera um **APK** de distribuição interna, que é o arquivo publicado no Firebase App Distribution.

---

## 🛠️ Tecnologias

- React Native + **Expo SDK 58** + TypeScript
- React Navigation (Native Stack + Bottom Tabs)
- TanStack Query + Axios
- Expo Notifications (notificações locais)
- Expo Linear Gradient, React Native Calendars, DateTimePicker
- AsyncStorage (token, tema e preferência de lembretes)
- EAS Build + Firebase App Distribution

---

## 👥 Integrantes

| RM | Nome | Turma |
|---|---|---|
| RM561713 | Eduardo Batista Locaspi | 2TDSPI |
| RM565799 | Leticia Santiago e Silva | 2TDSPW |
| RM565698 | Liana Lyumi Morisita Fujisima | 2TDSPI |
| RM561833 | Victor Alves Lopes | 2TDSPI |