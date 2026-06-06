# ServGo! — Marketplace de Serviços

Plataforma web para conexão entre clientes e prestadores de serviços.

## Como usar no GitHub Pages

1. Faça upload de todos os arquivos para um repositório GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch `main` e pasta `/ (root)`
5. Clique em **Save**
6. Acesse via: `https://seu-usuario.github.io/nome-do-repositorio/`

## Estrutura de pastas

```
/
├── index.html              ← Home pública
├── 404.html                ← Tratamento de rotas (GitHub Pages)
├── .nojekyll               ← Desativa processamento Jekyll
├── css/
│   └── estiloServGo.css
├── js/
│   ├── sg-base-path.js     ← Detector de caminho base (carregar ANTES do script.js)
│   └── script.js
├── img/
│   ├── pedreiro.png
│   ├── pintor.png
│   ├── eletricista.png
│   ├── Fundo_Portal.png
│   └── Post_Destaque.png
├── paginasSite/            ← Páginas públicas + admin
├── paginasPrestador/       ← Área do prestador
└── paginasCliente/         ← Área do cliente
```

## Tecnologias

- HTML5, CSS3, Bootstrap 5, Bootstrap Icons
- JavaScript vanilla (localStorage como banco de dados simulado)
- GitHub Pages (hospedagem estática)
