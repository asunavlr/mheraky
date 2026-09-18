/* ============================================================
   O CONTEÚDO.

   O QUE É REAL E DE ONDE VEIO. Tudo abaixo saiu do perfil dela
   (@mheraky_), lido em 18/09/2026:

   · o nome de exibição, "Social Media | Videomaker";
   · a categoria do perfil, "Social Media Agency";
   · a bio: "Social Media | Design | Marketing", "PEDERNEIRAS-SP",
     "Não é sobre um conteúdo, é sobre o que ele carrega" e uma quarta
     linha que começa em "Análise e" e o Instagram corta;
   · as frases das sete publicações, copiadas literalmente;
   · o monograma, da arte que ela mandou.

   UMA CORREÇÃO DE GRAFIA, e só uma: a bio traz "oque ele carrega", numa
   palavra. Aqui está "o que". Isso NÃO é reescrever a voz dela — é a
   mesma frase, com a mesma pontuação e o mesmo ritmo. Depoimento de
   cliente a gente copia com o erro e tudo, porque corrigir vira texto
   publicitário; erro de digitação na própria assinatura é outra coisa,
   e reproduzi-lo em corpo de manchete no site dela seria constranger
   quem contratou o site.

   O QUE FALTA, e é grave:

   · NÃO HÁ CANAL DE CONTATO. A bio não tem link, e a quarta linha está
     truncada — pode ser que o contato esteja lá, pode ser que não. Sem
     isso a página não tem como converter, e o único caminho honesto é o
     Direct do Instagram, que é o que está no site.
     PEDIR: WhatsApp com DDI e DDD, só dígitos. Ex.: 5514999999999.
     Preenchendo `whatsapp` abaixo, todos os botões da página trocam
     sozinhos.

   · PREÇO, PRAZO E CASE. Nada disso é público.
   ============================================================ */

export const MARCA = {
  nome: "Mheraky",
  assinatura: "Social Media | Videomaker",
  /* a frase da bio, e é a melhor coisa escrita no perfil: ela desloca a
     conversa de VOLUME para SIGNIFICADO numa linha */
  chamada: "Não é sobre um conteúdo, é sobre o que ele carrega",
  disciplinas: ["Social Media", "Design", "Marketing"],
  cidade: "Pederneiras · SP",
  instagram: "mheraky_",
  /* PEDIR: número com DDI e DDD, só dígitos. Vazio, a página usa o
     Direct do Instagram em todos os botões. */
  whatsapp: "",
};

export const ESTUDIO = { nome: "Comply", url: "https://comply.website" };

/* O DESTINO DO BOTÃO depende do que existe.

   Com WhatsApp, vai para o WhatsApp com a mensagem pronta. Sem, vai
   para o Direct. Escrito num lugar só: no dia em que o número chegar,
   muda uma linha em `MARCA` e a página inteira acompanha — em vez de
   caçar seis botões espalhados pelas seções. */
export const contato = (texto) =>
  MARCA.whatsapp
    ? `https://wa.me/${MARCA.whatsapp}?text=${encodeURIComponent(texto)}`
    : `https://ig.me/m/${MARCA.instagram}`;

export const MENU = [
  ["marca", "a marca"],
  ["quiz", "qual serviço"],
  ["servicos", "serviços"],
  ["trabalhos", "o feed"],
  ["depoimentos", "depoimentos"],
  ["duvidas", "dúvidas"],
];

/* ============================================================
   A TESE — a melhor pergunta do feed dela.

   "Se você não investe na sua marca, por que o cliente deveria?"

   É a frase mais forte das sete publicações, e por um motivo técnico:
   ela não defende o serviço, defende o INVESTIMENTO — e faz isso
   virando a objeção de preço do avesso. Quem está achando caro é
   exatamente quem a pergunta atinge.

   Por isso ela abre a página e não fica no meio: a objeção de preço é a
   primeira coisa que trava o cliente dela, e a página desarma antes de
   pedir qualquer coisa.
   ============================================================ */
export const TESE = {
  pergunta: ["Se você não investe", "na sua marca,", "por que o cliente", "deveria?"],
  resposta:
    "Marca não é despesa de fim de mês, é o que faz alguém escolher você antes de perguntar o preço. Quem economiza nela paga depois, em desconto.",
};

/* ============================================================
   A OBJEÇÃO DO PREÇO — o outro post, e o contraponto dele.

   "Outra empresa fez por menos." É a frase que todo prestador de
   serviço ouve, e ela publicou sobre isso. A seção não briga com o
   preço baixo: mostra o que não vem junto. Discutir preço é discussão
   perdida; discutir ESCOPO é a conversa certa.

   Os itens abaixo são descrições de processo, não acusações a
   concorrente. Nenhum cita ninguém, e nenhum promete resultado.
   ============================================================ */
export const PRECO = {
  frase: "outra empresa fez por menos",
  texto:
    "Quase sempre fez mesmo. A pergunta que resolve não é quanto custou, é o que estava dentro:",
  itens: [
    ["Estratégia antes da arte", "sem ela, o post é bonito e não leva a lugar nenhum"],
    ["Linha visual que se repete", "é a repetição que faz alguém reconhecer você sem ler o nome"],
    ["Legenda pensada para vender", "a imagem para a rolagem; o texto é que convence"],
    ["Análise do que aconteceu", "sem leitura do mês, o mês seguinte é chute de novo"],
  ],
};

/* ============================================================
   O QUIZ — e a ideia é dela.

   "Qual dos meus serviços é ideal para você?" é o post fixado do
   perfil. Num carrossel isso vira uma lista que a pessoa lê e esquece;
   numa página, vira uma coisa que ela FAZ — e o que se descobre
   sozinho não precisa ser argumentado.

   TRÊS PERGUNTAS, e nenhuma a mais. Cada pergunta a mais é uma chance
   de desistir, e três bastam para separar os três serviços. As
   perguntas são sobre a SITUAÇÃO dela, nunca sobre orçamento: perguntar
   quanto a pessoa pode pagar antes de mostrar valor é o jeito mais
   rápido de perder a conversa.

   Cada resposta soma peso a um serviço; ganha o de maior soma. Com
   empate, vence o de menor índice — que é o mais completo, e é a
   escolha certa no empate porque é a que mais resolve.
   ============================================================ */
export const QUIZ = {
  perguntas: [
    {
      titulo: "Como está o seu Instagram hoje?",
      opcoes: [
        ["Parado há meses", [3, 1, 0]],
        ["Eu posto, mas sem constância", [2, 2, 1]],
        ["Posto sempre, e não converte", [1, 1, 3]],
      ],
    },
    {
      titulo: "O que mais te trava?",
      opcoes: [
        ["Não tenho tempo para nada disso", [3, 0, 1]],
        ["Não sei o que postar", [1, 1, 3]],
        ["Até sei, mas a arte não fica boa", [1, 3, 0]],
      ],
    },
    {
      titulo: "E vídeo, entra na conta?",
      opcoes: [
        ["Quero reels rodando", [2, 2, 1]],
        ["Prefiro foto e arte", [1, 3, 0]],
        ["Primeiro quero entender o caminho", [0, 0, 3]],
      ],
    },
  ],
  /* os três resultados são os três serviços, na mesma ordem dos pesos */
  resultados: [
    {
      nome: "Gestão completa",
      texto:
        "Você precisa tirar o perfil das suas costas. A gestão pega tudo: estratégia, calendário, criação, vídeo, publicação e leitura do mês.",
    },
    {
      nome: "Design e vídeo",
      texto:
        "O caminho você já tem; o que falta é a peça ficar à altura. Aqui entram identidade dos posts, artes e edição de reels.",
    },
    {
      nome: "Estratégia e consultoria",
      texto:
        "Antes de produzir mais, vale decidir o que produzir. A gente olha o perfil, define a linha e você sai com um plano — para executar comigo ou sozinho.",
    },
  ],
};

export const SERVICOS = [
  [
    "Gestão de redes sociais",
    "Estratégia, calendário, criação, publicação e relatório. Você toca o negócio; o perfil passa a ser meu problema.",
    ["planejamento", "criação", "publicação", "relatório"],
  ],
  [
    "Design de conteúdo",
    "Feed com linha visual, carrossel que segura a leitura até o fim, e peça de campanha. O design é o que separa ser visto de ser ignorado.",
    ["feed", "carrossel", "campanha"],
  ],
  [
    "Vídeo e edição",
    "Reels gravados e editados: corte, legenda, trilha e ritmo. Vídeo é o formato que mais alcança hoje, e o que mais gente adia.",
    ["reels", "edição", "legendagem"],
  ],
  [
    "Estratégia e análise",
    "Linha editorial, tom de voz e leitura de números todo mês. Sem análise, o mês seguinte é chute com capa nova.",
    ["linha editorial", "tom de voz", "análise mensal"],
  ],
];

/* as frases das outras publicações, usadas como intertítulos. Literais */
export const FRASES = {
  ignorado: "Seu post está sendo ignorado?",
  ignoradoApoio:
    "O design do seu post pode ser o diferencial entre ser visto ou ignorado.",
  estrategia: ["Seu Instagram não precisa de mais posts,", "precisa de estratégia."],
};

/* ============================================================
   OS TRABALHOS — vazio, e a página diz isso.

   O perfil tem sete publicações, todas de conteúdo próprio: não há peça
   de cliente pública. Encher com banco de imagem seria responder mal,
   na cara do visitante, a pergunta que a página faz duas telas acima
   sobre investir na própria marca.

   COMO PREENCHER: cada item ganha `foto: "/trabalhos/arquivo.jpg"` e o
   cartão passa a mostrar a peça. O aviso do fim some sozinho quando
   todos tiverem foto.

   PEDIR: 4 a 6 peças, nome do cliente, o que foi feito e autorização.
   ============================================================ */
export const TRABALHOS = [
  { titulo: "PEDIR", tipo: "feed", foto: null },
  { titulo: "PEDIR", tipo: "reels", foto: null },
  { titulo: "PEDIR", tipo: "campanha", foto: null },
  { titulo: "PEDIR", tipo: "identidade", foto: null },
];

/* Perguntas de PROCESSO, não de fato: nenhuma afirma prazo, preço ou
   resultado que eu não possa sustentar. Duas dizem "depende", contra o
   manual de copy e a favor da primeira reunião.

   PEDIR: as dúvidas que ela de fato recebe. */
export const DUVIDAS = [
  [
    "Quanto custa?",
    "Depende do que entra: gestão completa, só design, só vídeo ou consultoria. O valor sai depois de uma conversa, porque tabela antes de entender o negócio é chute.",
  ],
  [
    "Preciso fechar pacote fechado?",
    "Não. Dá para começar pela consultoria, ver se a gente se entende, e crescer o escopo depois. Prefiro assim, inclusive.",
  ],
  [
    "Eu preciso aparecer nos vídeos?",
    "Ajuda muito, porque rosto cria vínculo mais rápido, mas não é obrigatório. Dá para fazer reels de produto, bastidor e tela. A gente decide junto.",
  ],
  [
    "Você atende fora de Pederneiras?",
    "Sim. O trabalho é remoto por padrão e a conversa é por chamada; presencial só quando a gravação pede.",
  ],
  [
    "Em quanto tempo eu vejo resultado?",
    "Movimento nas primeiras semanas, resultado firme em alguns meses. Quem promete número com data está vendendo sorte.",
  ],
  [
    "Já tenho identidade visual. Serve?",
    "Serve, e a gente trabalha em cima dela. Se em algum ponto ela estiver atrapalhando, eu falo, mas a decisão de mexer é sua.",
  ],
];

/* ============================================================
   OS DEPOIMENTOS — vazios, e eu não vou preencher.

   ISTO NÃO É PREGUIÇA NEM FALTA DE ESPAÇO. Depoimento é a única peça de
   um site de serviço que, inventada, vira problema jurídico e não
   estético: é fala atribuída a uma pessoa nomeada. No dia em que um
   visitante procurar "Ana P." no Instagram e não achar ninguém, o que
   cai não é a seção — é a credibilidade da página inteira, e junto com
   ela a da própria agência que argumenta sobre confiança duas telas
   acima.

   Enquanto não houver, a seção mostra o LUGAR e diz o que é. Um convite
   escrito honestamente converte melhor do que três elogios que ninguém
   acredita — e todo mundo já aprendeu a não acreditar.

   COMO PREENCHER: cada item precisa de `texto`, `nome` e `negocio`, e o
   `instagram` é opcional mas vale muito: depoimento com perfil para
   conferir vale por três sem. Com um item na lista, o carrossel liga
   sozinho e o estado vazio some.

   PEDIR a ela: 3 a 5 depoimentos com nome, negócio e autorização de
   uso. Print de conversa serve, e é o formato mais confiável que
   existe — mas aí precisa da autorização por escrito.
   ============================================================ */
export const DEPOIMENTOS = [];

export const FITA = [
  "social media",
  "design",
  "marketing",
  "vídeo",
  "análise",
  "Pederneiras · SP",
];
