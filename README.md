# 👟 Digital Store (Drip Store) — E-commerce Frontend

Aplicação web front-end de um e-commerce completo de calçados, moda urbana e acessórios esportivos, desenvolvida em **React** com foco em experiência do usuário, layout responsivo, navegação intuitiva, autenticação com validação e fluxo completo de compra com persistência local.

## 📋 Índice

* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Rotas da Aplicação](#-rotas-da-aplicação)
* [Persistência de Dados (localStorage)](#-persistência-de-dados-localstorage)
* [Pré-requisitos](#-pré-requisitos)
* [Instalação e Configuração Inicial](#-instalação-e-configuração-inicial)
* [Scripts Disponíveis](#-scripts-disponíveis)
* [Responsividade](#-responsividade)
* [Personalização](#-personalização)

## ✨ Funcionalidades

### 🏠 Vitrine e Navegação

* **Página Inicial (`HomePage`)**: Carrossel principal (`Gallery`), coleções em destaque, atalhos de categorias por ícones, produtos em alta e banner de oferta especial.
* **Busca Inteligente**: Campo de pesquisa no cabeçalho com normalização de texto (ignora acentos e maiúsculas/minúsculas).
* **Página de Categorias (`CategoriesPage`)**: Cards interativos com contagem dinâmica de produtos por categoria e filtros rápidos por marca.
* **URLs Amigáveis**: Links de filtros, categorias e marcas utilizam slugs normalizados e sem acentos (ex.: `/produtos?category=esporte-e-lazer`, `/produtos?filter=tenis`).
* **Página 404 (`NotFoundPage`)**: Tratamento para rotas inexistentes com botão de retorno para a página inicial.

### 🛍️ Catálogo e Detalhes do Produto

* **Listagem de Produtos (`ProductListingPage`)**: Grade responsiva de 3 colunas com contador de resultados, ordenação no topo (*mais relevantes*, *menor preço*, *maior preço*) e painel lateral de filtros combinados por **Marca**, **Categoria**, **Gênero** e **Estado** (Novo/Usado).
* **Visualização do Produto (`ProductViewPage`)**: Galeria de imagens com miniaturas, avaliação, preço promocional, seleção de variações (tamanho/cor) e botão de compra.

### 🛒 Carrinho, Checkout e Pedidos

* **Carrinho Persistente (`CartContext`, `CartModal` e `CartPage`)**: Mini-carrinho suspenso no cabeçalho com contador de itens em tempo real e página dedicada com controle de quantidade, cupom de desconto, cálculo de frete (CEP formatado) e persistência automática no `localStorage`.
* **Finalização de Compra (`CheckoutPage`)**:
  * Formulário completo dividido em *Informações Pessoais*, *Entrega* e *Pagamento* (Cartão de Crédito ou Boleto Bancário).
  * **Formatação e validação em tempo real** para **CPF** (`000.000.000-00`), **Celular** (`(00) 00000-0000`), **CEP** (`00000-000`), **E-mail** (minúsculas e sem espaços) e dados do **Cartão** (número, validade `MM/AA` e CVV).
* **Confirmação de Pedido e Meus Pedidos (`OrderSuccessPage`)**:
  * Exibe o resumo detalhado do último pedido finalizado com opção de impressão do recibo.
  * Caso o usuário acesse **Meus Pedidos** sem ter realizado nenhuma compra, exibe a mensagem **"Nenhum pedido encontrado."** com atalho para explorar os produtos.

### 🔐 Autenticação e Rotas Protegidas

* **Cadastro e Validação (`AuthContext`, `RegisterPage` e `LoginPage`)**:
  * Cadastro com Nome, Sobrenome, E-mail formatado/validado, Senha (mínimo 6 caracteres) e confirmação de senha, impedindo e-mails duplicados.
  * Login validado contra as contas registradas no `localStorage`, bloqueando acessos com e-mail ou senha inválidos, além de suporte a login social simulado.
* **Cabeçalho Personalizado**: Mantém o cabeçalho completo em todas as páginas (inclusive Login e Cadastro) e exibe `Olá, {nome}` + botão **Sair** quando o usuário está autenticado.
* **Proteção de Rotas (`PrivateRoute`)**: O acesso a `/meus-pedidos` exige autenticação; usuários não logados são redirecionados para `/login` e retornam automaticamente após entrar na conta.

## 🛠️ Tecnologias Utilizadas

* [**React**](https://react.dev/) — Biblioteca principal para construção da interface.
* [**Vite**](https://vitejs.dev/) — Bundler e servidor de desenvolvimento rápido.
* [**React Router DOM**](https://reactrouter.com/) — Gerenciamento de rotas, parâmetros de URL (`useSearchParams`) e proteção de rotas.
* **React Context API** — Gerenciamento de estado global para Carrinho (`CartContext`) e Autenticação (`AuthContext`).
* **CSS3 (Global CSS)** — Estilização com variáveis CSS (`:root`), CSS Grid, Flexbox e Media Queries.

## 📁 Estrutura do Projeto

```text
ecommerce-frontend/
├── public/
│   ├── favicon.svg              # Ícone da aba do navegador (Digital Store)
│   └── *.jpeg / *.png           # Imagens de banners, coleções e produtos
├── src/
│   ├── assets/                  # Ícones SVG (redes sociais, mini-cart, etc.)
│   ├── components/
│   │   ├── CartModal.jsx        # Dropdown do carrinho no cabeçalho
│   │   ├── FilterGroup.jsx      # Grupo de filtros (checkbox / radio)
│   │   ├── Footer.jsx           # Rodapé institucional e links de categorias
│   │   ├── FooterInfo.jsx       # Colunas de links do rodapé
│   │   ├── Gallery.jsx          # Carrossel de imagens com setas e miniaturas
│   │   ├── Header.jsx           # Cabeçalho com busca, auth, carrinho e nav
│   │   ├── Logo.jsx             # Logotipo Digital Store
│   │   ├── ProductCard.jsx      # Card individual de produto
│   │   ├── ProductListing.jsx   # Grade de exibição de produtos
│   │   └── Section.jsx          # Componente de seção reutilizável
│   ├── contexts/
│   │   ├── AuthContext.jsx      # Cadastro, login validado, logout e localStorage
│   │   └── CartContext.jsx      # Carrinho e último pedido persistidos no localStorage
│   ├── data/
│   │   └── products.js          # Catálogo de produtos mockado
│   ├── pages/
│   │   ├── CartPage.jsx         # Página do carrinho
│   │   ├── CategoriesPage.jsx   # Página de categorias e marcas
│   │   ├── CheckoutPage.jsx     # Página de finalização de compra
│   │   ├── HomePage.jsx         # Página inicial
│   │   ├── Layout.jsx           # Layout padrão (Header + conteúdo + Footer)
│   │   ├── LoginPage.jsx        # Página de login
│   │   ├── NotFoundPage.jsx     # Página 404
│   │   ├── OrderSuccessPage.jsx # Confirmação de compra / Meus Pedidos
│   │   ├── ProductListingPage.jsx # Listagem com filtros e ordenação
│   │   ├── ProductViewPage.jsx  # Detalhes do produto
│   │   └── RegisterPage.jsx     # Página de criação de conta
│   ├── styles/
│   │   └── global.css           # Estilos globais e regras de responsividade
│   ├── App.jsx                  # Configuração de rotas e providers
│   └── main.jsx                 # Ponto de entrada da aplicação
├── index.html                   # HTML raiz com título e favicon
├── package.json                 # Dependências e scripts do projeto
└── README.md                    # Documentação do projeto
```

## 🗺️ Rotas da Aplicação

| Rota | Página | Acesso | Descrição |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Público | Vitrine principal da loja |
| `/produtos` ou `/products` | `ProductListingPage` | Público | Catálogo com busca, filtros e ordenação |
| `/categorias` | `CategoriesPage` | Público | Lista de categorias e marcas |
| `/product/:id` | `ProductViewPage` | Público | Página de detalhes de um produto |
| `/cart` | `CartPage` | Público | Resumo do carrinho de compras |
| `/checkout` | `CheckoutPage` | Público | Formulário de pagamento e entrega |
| `/order-success` | `OrderSuccessPage` | Público | Comprovante de pedido finalizado |
| `/meus-pedidos` | `OrderSuccessPage` | **Privado** | Histórico/resumo de pedidos (exige login) |
| `/login` | `LoginPage` | Público | Acesso à conta do usuário |
| `/register` | `RegisterPage` | Público | Cadastro de nova conta |
| `*` | `NotFoundPage` | Público | Página não encontrada (404) |

## 💾 Persistência de Dados (`localStorage`)

Como esta aplicação é front-end puro, os dados são armazenados no **`localStorage` do navegador** (reiniciar o servidor Vite não apaga esses registros):

| Chave | Conteúdo |
| :--- | :--- |
| `digital_store_users` | Lista de usuários cadastrados (nome, sobrenome, e-mail e senha) |
| `digital_store_user` | Sessão do usuário atualmente autenticado |
| `digital_store_cart` | Itens adicionados ao carrinho de compras |
| `digital_store_last_order` | Dados do último pedido finalizado |

### Como zerar os dados salvos

Para limpar tudo durante os testes, abra o DevTools do navegador (**F12**), vá na aba **Console** e execute:

```js
localStorage.clear();
location.reload();
```

Ou acesse **F12 → Application (Aplicativo) → Local Storage**, selecione o endereço local (`http://localhost:5173`) e clique em **Clear**.

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [**Git**](https://git-scm.com/)
* [**Node.js**](https://nodejs.org/) (versão **18.x** ou superior recomendada)
* **npm** (instalado junto com o Node.js) ou **yarn**

## 🚀 Instalação e Configuração Inicial

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd seu-repositorio
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   O terminal exibirá o endereço local (geralmente `http://localhost:5173`).

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

* `npm run dev` — Inicia a aplicação em modo de desenvolvimento com hot-reload.
* `npm run build` — Gera a versão otimizada para produção na pasta `dist/`.
* `npm run preview` — Sobe um servidor local para visualizar o build de produção.
* `npm run lint` — Executa a verificação de linting no código (caso configurado no projeto).

## 📱 Responsividade

O projeto utiliza um sistema de breakpoints em `src/styles/global.css` para adaptação em diferentes telas:

* **`<= 1100px`**: Grade de produtos ajustada de 3 para 2 colunas.
* **`<= 1024px`**: Grade de categorias ajustada de 4 para 2 colunas.
* **`<= 960px`**: Layouts de listagem, produto, checkout, carrinho, rodapé e autenticação passam para 1 coluna.
* **`<= 600px`**: Cards de produtos e categorias exibidos em 1 coluna para dispositivos móveis.

## 🎨 Personalização

As cores principais da identidade visual estão centralizadas nas variáveis CSS em `src/styles/global.css`:

```css
:root {
  --primary: #C92071;
  --secondary: #B5B6F2;
  --tertiary: #991956;
  --error: #EE4266;
  --success: #52CA76;
  --warning: #F6AA1C;
}
```