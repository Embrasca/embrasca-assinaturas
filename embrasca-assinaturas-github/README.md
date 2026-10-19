# Gerador de assinaturas Embrasca

## Publicar
1. Envie a pasta dist e o arquivo vercel.json para a raiz do repositório GitHub (extraia o ZIP antes).
2. Na Vercel, importe o repositório. Framework: Other. Root Directory: raiz. Output Directory: dist. Build Command e Install Command vazios.
3. Clique em Deploy.

Não precisa de banco, dependências npm ou variáveis de ambiente.

## Usar
Preencha nome e contatos, adicione uma foto opcional, ajuste o enquadramento e copie a assinatura para o Outlook.
A foto é processada localmente. Teste um envio: alguns clientes removem imagens embutidas. Se necessário, baixe a foto e a logo pelos botões do gerador e insira pelo editor de assinatura do Outlook. Também é possível fornecer URLs HTTPS públicas para as imagens.

## Arquivos
- dist/index.html: interface
- dist/style.css: visual
- dist/app.js: gerador e exportação
- dist/assets/logo.png: logo original
- vercel.json: publicação estática
