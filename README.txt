# Landing page — Olhar em Foco

## Arquivos
- `index.html`: estrutura e conteúdo da página.
- `style.scss`: estilos SCSS editáveis.
- `style.css`: CSS compilado para o navegador.
- `script.js`: menu mobile, validação, máscara de telefone e CTA de inscrição via WhatsApp.

## Como visualizar
Abra `index.html` no navegador. É necessário estar conectado à internet para carregar as fontes e as imagens ilustrativas do Unsplash.

## Configurar o formulário
Abra `script.js` e substitua `5521999999999` pelo número de WhatsApp que receberá as inscrições, com código do país e DDD, somente números.
Exemplo de formato: `5521991234567`.

O formulário valida os campos e abre o WhatsApp com os dados preenchidos. Ele não grava inscrições em banco de dados. Para armazenar os cadastros, será necessário conectar a um serviço/backend (por exemplo, Formspree, Supabase ou seu próprio servidor).

## Personalização antes de publicar
No `index.html`, atualize:
- nome/identidade do curso;
- local, data, horário, duração e investimento;
- informações de contato e política de privacidade.

As fotos da galeria são exemplos ilustrativos de resultados e estilos fotográficos. Troque-as por imagens próprias ou imagens com licença adequada antes da divulgação comercial, se preferir.
