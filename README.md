# Assinaturas Embrasca

Gerador de assinaturas corporativas em HTML, CSS e JavaScript. Fonte Ubuntu, foto com enquadramento, contatos clicáveis e logo com fundo fixo #444545 na assinatura.

## Acesso
- Endereço institucional: https://embrasca.com.br/assinaturas
- Projeto Vercel: embrasca-assinaturas

## Publicação
A branch main está conectada à Vercel. Framework Other, diretório raiz do repositório, saída dist. Não há instalação, build, banco de dados ou variáveis de ambiente.

O HTML usa a base /assinaturas/ e o vercel.json também atende esse prefixo no projeto independente. O projeto Vercel do site institucional encaminha /assinaturas e /assinaturas/* para este projeto por regras de roteamento no nível do projeto.

## Arquivos
- dist/index.html: formulário e prévia
- dist/style.css: identidade visual
- dist/app.js: geração, enquadramento, cópia e exportação
- dist/assets/: logos e fontes Ubuntu

## Utilização
Preencha os dados, ajuste a foto e copie a assinatura para o Outlook. A foto é processada no navegador. A logo padrão é composta sobre fundo #444545 antes de copiar ou baixar. As fontes e a exibição de imagens no e-mail dependem do aplicativo destinatário.
