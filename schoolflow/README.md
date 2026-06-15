# Diário de Treinos

## Sobre o projeto

O **Diário de Treinos** é um aplicativo móvel desenvolvido em React Native (com Expo) que permite ao usuário organizar seus exercícios físicos ao longo da semana. A proposta é simples: escolher um dia da semana, adicionar o exercício planejado, anexar uma foto (do equipamento, do local de treino ou do próprio progresso) e acompanhar o status de cada atividade — em progresso ou completa.

## Motivação

A ideia surgiu da necessidade comum de organizar rotinas de treino de forma visual e acessível. Muitas pessoas que praticam atividade física utilizam anotações em papel, aplicativos genéricos de tarefas ou simplesmente a memória para lembrar o que precisa ser feito em cada dia da semana. Faltava uma ferramenta que unisse, de forma simples:

- Organização por dia da semana, facilitando o planejamento de uma rotina semanal de exercícios;
- Registro visual através de fotos, permitindo documentar o progresso ou identificar equipamentos/locais de treino;
- Persistência local dos dados, garantindo que as informações não se percam ao fechar o aplicativo;
- Uma interface simples e direta, sem distrações, focada no essencial.

O projeto também serviu como aplicação prática de conceitos fundamentais do desenvolvimento mobile com React Native: componentização, gerenciamento de estado com hooks, persistência de dados com SQLite e integração com recursos de hardware do dispositivo (câmera).

## Funcionalidades

- Cadastro de exercícios organizados por dia da semana (Segunda a Domingo);
- Marcação de status (em progresso / completo), com confirmação ao reverter um exercício já concluído;
- Captura de foto pela câmera do dispositivo, anexada ao exercício;
- Exclusão de exercícios;
- Persistência local dos dados utilizando SQLite, garantindo que nada se perca entre sessões.

## Tecnologias utilizadas

- React Native
- Expo
- expo-sqlite (persistência de dados)
- expo-image-picker (acesso à câmera)
- @expo/vector-icons

## Autores

Este projeto foi idealizado e desenvolvido por:

- **Benício Santos Alves**
- **Emanuel Rovani Pacito**