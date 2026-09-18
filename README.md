# Mheraky · Social Media, Design e Marketing

Site de apresentação. Pederneiras-SP, atendimento remoto.
React + Vite + Tailwind 4 + GSAP/ScrollTrigger + Lenis.

## Rodar

    npm install
    npm run dev          # http://localhost:5183
    npm run verificar    # erro de JS e corte lateral em 3 larguras

## O QUE FALTA, E TRAVA A PÁGINA INTEIRA

**Não há canal de contato.** A bio do perfil não tem link, e a quarta
linha está truncada pelo Instagram num "Análise e…". Sem número, o site
não converte: os botões apontam para o Direct, que é o único canal que dá
para afirmar que existe — e Direct é caixa de entrada de rede social, com
filtro de solicitação e notificação que se perde.

Pedir a ela: **WhatsApp com DDI e DDD, só dígitos** (ex.: 5514999999999).
Preenchendo `MARCA.whatsapp` em `src/dados.js`, os seis botões da página
trocam de uma vez — o destino é calculado num lugar só, na função
`contato()`.

## O feed é reconstruído, e a página diz isso

A descoberta que destravou a seção: **o feed dela não é fotográfico.** As
sete publicações são desenhos tipográficos — frase grande sobre fundo de
uva, serifa e condensada, o monograma no pé. Disso eu tenho tudo o que
importa: as frases, a cartela, a família e o monograma.

Então as cinco peças do carrossel são **recriações das artes dela**, com
as frases originais, e cada legenda traz a palavra "recriação". Passar
reconstrução por peça original seria exatamente o que a seção do preço
acusa duas telas acima.

`src/componentes/Post.jsx` tem uma função por peça. Quando as artes em
arquivo chegarem, cada item de `POSTS` ganha `foto:` e o cartão passa a
mostrar o PNG.

## Depoimentos: a seção está pronta e a lista está vazia

E é decisão, não pendência esquecida. Depoimento é a única peça de um site
de serviço que, inventada, deixa de ser problema estético e vira problema
de verdade: é fala atribuída a uma pessoa com nome. Basta um visitante
procurar o perfil citado e não achar ninguém para a credibilidade da
página inteira cair.

Com um item em `DEPOIMENTOS`, o carrossel liga sozinho e o estado vazio
some. Cada item precisa de `texto`, `nome` e `negocio`; `instagram` é
opcional e vale muito — depoimento com perfil para conferir vale por três
sem.

## Outras coisas a pedir

1. **4 a 6 peças de trabalho**, com nome de quem contratou e autorização.
   Em `TRABALHOS`, cada item ganha `foto:` e o cartão vira a peça; o aviso
   do fim some sozinho quando todos tiverem foto.
2. **O `.svg` do monograma.** O que existe é um PNG de 99px.
3. **As dúvidas que ela de fato recebe.**

## De onde veio o conteúdo

Tudo em `src/dados.js`, do perfil [@mheraky_](https://instagram.com/mheraky_)
lido em 18/09/2026: a bio, a cidade e as frases das sete publicações,
literais.

**Uma correção de grafia, e só uma:** a bio traz "oque ele carrega", numa
palavra. Aqui está "o que". Não é reescrever a voz dela — é a mesma frase,
mesma pontuação, mesmo ritmo. Depoimento de cliente a gente copia com erro
e tudo, porque corrigir vira texto publicitário; erro de digitação na
própria assinatura é outra coisa, e reproduzi-lo em corpo de manchete
constrangeria quem contratou o site.

## A ideia do desenho

**A página é uma revista, não um feed.** A marca dela é uma didone —
serifa reta, contraste altíssimo entre haste e filete —, que é a letra da
capa de revista e da alta-costura. Isso não é acaso: o argumento central
do perfil é "se você não investe na sua marca, por que o cliente
deveria?", e argumento de autoridade tem tipografia própria.

Então a página imita o objeto que a rede social nunca vai ser: margem
larga, filete fino, caixa alta espaçada, muito espaço vazio. O vazio é
argumento — quem tem pressa preenche tudo.

A lavanda é luz, nunca área: aparece em filete, numa palavra da manchete,
no fio que separa. Pintada em bloco viraria lilás de papelaria.

**O monograma é H + Y**, composto com tipo e não traçado. O arquivo que
existe tem 99px, e serifa reta com filete fino é justamente o que o
serrilhado destrói. Monograma é feito de letras, então é remontado com
letras: duas glifas de Bodoni Moda sobrepostas, a mesma família didone do
original. O Y vai atrás e o H na frente — é o que faz o travessão do H
passar por cima da haste do Y, como no original.

**O quiz é ideia dela**, do post fixado do perfil. Num carrossel vira uma
lista que se lê e esquece; numa página, vira uma coisa que a pessoa faz. E
resolve o problema real de uma página de serviço: com quatro opções na
tela, quem não sabe o que precisa não escolhe nenhuma e vai embora.

## Três coisas que custaram depuração

**Duas classes de `position` no mesmo elemento.** O componente da marca
escrevia `relative` na própria casca e concatenava o `className` recebido;
quando a capa passava `absolute`, o elemento ficava com as duas — e nesse
conflito quem decide é a ordem em que as regras saem na folha, não a ordem
no atributo. O monograma acabava dentro do fluxo com 46vw de corpo: 736px
de altura fantasma que empurravam a capa para fora da primeira tela. Agora
a casca é `static` e quem posiciona é um elemento de fora.

**Altura de manchete é corpo × número de linhas.** A frase da capa tem
quatro linhas; no corpo padrão de 6rem elas somavam ~460px e o bloco
passava dos 900px dentro de uma capa de 950 menos as margens.

**O reset mora em `@layer base`.** No Tailwind 4 as camadas de cascata são
reais, e estilo sem camada vence estilo em camada.
