/**
 * ServGo! — sg-base-path.js
 * ==========================
 * Detecta automaticamente o prefixo de base do GitHub Pages.
 *
 * Problema: GitHub Pages serve o site em:
 *   https://usuario.github.io/nome-do-repo/
 *
 * Caminhos absolutos como /css/estiloServGo.css quebram porque
 * o browser resolve para https://usuario.github.io/css/... (sem o repo).
 *
 * Solução: este script detecta o prefixo (/nome-do-repo) na primeira
 * carga e expõe window.SG_BASE para uso em todo o script.js.
 *
 * Em produção com domínio próprio (sem subpath), SG_BASE = ''.
 *
 * DEVE ser carregado ANTES do script.js em todos os HTMLs.
 */
(function () {
    'use strict';

    /**
     * Detecta o prefixo de base comparando a URL atual com a
     * estrutura de pastas conhecidas do projeto.
     *
     * Exemplos:
     *   https://user.github.io/servgo/paginasSite/login.html
     *     → SG_BASE = '/servgo'
     *
     *   https://user.github.io/servgo/index.html
     *     → SG_BASE = '/servgo'
     *
     *   http://localhost:8080/index.html
     *     → SG_BASE = ''
     */
    function detectarBase() {
        var pathname = window.location.pathname;

        // Segmentos conhecidos que indicam subpasta do projeto
        var marcadores = [
            '/paginasSite/',
            '/paginasPrestador/',
            '/paginasCliente/'
        ];

        for (var i = 0; i < marcadores.length; i++) {
            var idx = pathname.indexOf(marcadores[i]);
            if (idx > 0) {
                // Tudo antes do marcador é o base path
                return pathname.substring(0, idx);
            }
        }

        // Está na raiz (index.html ou /nome-repo/index.html)
        // Remove o nome do arquivo e a última barra do segmento final
        // Ex: /servgo/index.html → /servgo
        // Ex: /index.html        → ''
        var semArquivo = pathname.replace(/\/[^/]*\.html$/, '').replace(/\/$/, '');

        // Se só sobrou '' ou '/', não há subpath
        if (!semArquivo || semArquivo === '/') return '';

        return semArquivo;
    }

    var base = detectarBase();
    window.SG_BASE = base;

    /**
     * sgUrl(caminho) — resolve um caminho absoluto do projeto para a URL correta.
     *
     * Uso no script.js:
     *   window.location.href = sgUrl('/paginasSite/login.html');
     *   // → '/servgo/paginasSite/login.html'  (GitHub Pages)
     *   // → '/paginasSite/login.html'          (servidor local)
     *
     * @param {string} caminho - caminho absoluto começando com /
     * @returns {string}
     */
    window.sgUrl = function (caminho) {
        if (!caminho) return base + '/';
        // Já é absoluto com http: não mexe
        if (caminho.indexOf('http') === 0) return caminho;
        // Garante que começa com /
        if (caminho.charAt(0) !== '/') caminho = '/' + caminho;
        return base + caminho;
    };

    /**
     * sgImgUrl(caminho) — mesmo que sgUrl mas para imagens.
     * Conveniente para uso inline em templates JS.
     */
    window.sgImgUrl = function (caminho) {
        return window.sgUrl(caminho);
    };

})();
