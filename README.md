# ClyvoVet Mobile 🐾

ClyvoVet é um aplicativo mobile desenvolvido em React Native com Expo como parte do **Challenge FIAP 2026**, em parceria com a **CLYVO VET** — uma solução que transforma a gestão de clínicas veterinárias através de um sistema centralizado de consultas, pacientes e saúde preventiva.

---

## 🐕 O problema e como atacamos ele

Clínicas veterinárias perdem até **40% da receita** de vacinas e protocolos anuais porque a rotina agitada do dia a dia faz com que consultas preventivas fiquem em segundo plano. Os animais acabam chegando ao veterinário apenas em emergências — sem histórico clínico consistente, o diagnóstico chega tarde e o tratamento fica comprometido.

O resultado disso é baixa recorrência, pouca fidelização e um LTV extremamente baixo para a clínica.

O ClyvoVet resolve isso centralizando o histórico clínico de cada paciente, automatizando o engajamento com os responsáveis e dando ao veterinário dados que ele nunca teve em mãos — de forma simples e rápida.

---

## ✨ O que o app faz

- Exibe as consultas mais recentes em um carrossel na tela inicial
- Permite criar, editar, remover e filtrar consultas por data e status
- Mantém a ficha completa de cada paciente (animal + responsável)
- Mostra o histórico de consultas de cada animal com acesso direto aos detalhes
- Exibe um gráfico de desempenho com a distribuição de consultas por status
- Integra um **Controle Sanitário** para monitoramento de surtos e alertas preventivos por região
- Salva todos os dados localmente
- Mantém a sessão do usuário ativa entre os usos do app

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação com sessão salva — ao reabrir o app, o usuário já entra direto |
| **Home** | Carrossel com as consultas mais recentes e Controle Sanitário com monitoramento de surtos por região |
| **Consultas** | Listagem completa com busca, filtro por data e status, e criação de novas consultas |
| **Detalhe da Consulta** | Dados completos da consulta, animal e responsável — com opções de editar e remover |
| **Pacientes** | Listagem de todos os pacientes com busca por nome do animal ou responsável |
| **Ficha do Paciente** | Dados completos do animal e responsável, histórico de consultas e acesso ao WhatsApp |
| **Conta** | Perfil do veterinário, gráfico de desempenho por status e logout |

---

## 👥 Integrantes

| Nome | RM |
|------|-----|
| Eduardo Batista Locaspi | RM561713 |
| Leticia Santiago e Silva | RM565799 |
| Liana Lyumi Morista Fujisima | RM565698 |
| Victor Alves Lopes | RM561833 |

---

## 🚀 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/AntonioCarvalhoFIAP/challenge-1-victoralves10.git

# Instale as dependências
npm install

# Instale as dependências nativas
npx expo install

# Inicie o projeto
npx expo start
```

**Credenciais de acesso:**
- Email: `teste@email.com`
- Senha: `123456`

---

## 🛠️ Tecnologias

- React Native + Expo
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage
- react-native-calendars
- react-native-chart-kit
- Ionicons (@expo/vector-icons)

---

## 📁 Estrutura do projeto

```
src/
├── components/        # Componentes reutilizáveis (cards, inputs)
├── controllers/       # Lógica de negócio
├── global/            # Paleta de cores
├── models/            # Interfaces TypeScript
├── navigation/        # Configuração de rotas
├── screens/           # Telas do app
└── storage/           # Acesso ao AsyncStorage
```
