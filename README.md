# 🐶 Dog Gallery

Aplicação em **Vue 3** que consome a [Dog CEO API](https://dog.ceo/dog-api/documentation) para exibir fotos de cachorros: uma foto aleatória na tela inicial e uma galeria filtrada por raça e sub-raça.

## Funcionalidades

- **Início:** foto aleatória com botão "Sortear foto" e loader enquanto a próxima carrega
- **Galeria:** filtro por raça e sub-raça com selects dependentes, contagem de fotos e paginação com "Carregar mais"
- **Filtros na URL:** `/galeria?raca=hound&sub=afghan` mantém a seleção ao recarregar a página ou compartilhar o link
- **Copiar imagem:** copia a foto para a área de transferência, tanto na tela inicial quanto em cada foto da galeria
- Tratamento de carregamento e erro com opção de tentar novamente

## Tecnologias

- [Vue 3](https://vuejs.org/) com Composition API e `<script setup>`
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vite.dev/)
- CSS puro com estilos `scoped` e variáveis CSS

## Estrutura

```
src/
├── assets/          # CSS global (reset e variáveis de cor)
├── components/      # AppHeader, DogGrid, CopyImageButton, LoadingSpinner
├── router/          # rotas / e /galeria
├── services/        # chamadas à Dog CEO API
├── stores/          # store Pinia da foto aleatória
├── utils/           # pré-carregamento e cópia de imagens
└── views/           # HomeView e GalleryView
```

## Conceitos aplicados

| Conceito | Onde |
| --- | --- |
| `ref`, `computed` e `watch` | `GalleryView`: sub-raças da raça escolhida, paginação e nova busca ao mudar o filtro |
| `v-model` em `<select>` | `GalleryView`: selects de raça e sub-raça |
| Props e reaproveitamento de componentes | `DogGrid` e `CopyImageButton`, usados nas duas telas |
| Estado global com Pinia | `stores/randomDog.js`: foto, loading e erro da tela inicial |
| Rotas com query string e lazy loading | `router/index.js` e `GalleryView` |
| Hooks de ciclo de vida | `onMounted` para a carga inicial e `onUnmounted` para limpar o timer |

## Como rodar

Requer Node.js 22.18+ ou 24.12+.

```sh
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Para gerar o build de produção:

```sh
npm run build
npm run preview
```