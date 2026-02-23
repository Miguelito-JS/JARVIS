import React, { useState, useEffect, useRef } from "react"; 

// Carrega frutas e animais do localStorage ou padrões
function carregarConhecimentos() {
  const frutas = JSON.parse(localStorage.getItem("frutas")) || ["banana", "maçã", "uva", "laranja", "morango"];
  const animais = JSON.parse(localStorage.getItem("animais")) || ["cachorro", "gato", "leão", "elefante", "tigre"];
  return { frutas, animais };
}

// Salva conhecimento de fruta ou animal
function salvarConhecimento(tipo, palavra) {
  const chave = tipo === "fruta" ? "frutas" : "animais";
  const lista = JSON.parse(localStorage.getItem(chave)) || [];
  if (!lista.includes(palavra)) {
    lista.push(palavra);
    localStorage.setItem(chave, JSON.stringify(lista));
  }
}

// Detecta aprendizado na frase do usuário
function detectarAprendizado(frase) {
  const regex = /sim[, ]+(\w+)[ ]+é[ ]+uma?[ ]+(fruta|animal)/i;
  const match = frase.match(regex);
  if (match) {
    const palavra = match[1].toLowerCase();
    const tipo = match[2].toLowerCase();
    salvarConhecimento(tipo, palavra);
    return `Obrigado! Agora sei que ${palavra} é uma ${tipo}.`;
  }
  return null;
}

// Verifica se a pergunta contém alguma fruta ou animal já conhecido
function verificarFrutasEAnimais(pergunta) {
  const { frutas, animais } = carregarConhecimentos();
  const palavras = pergunta.toLowerCase().split(/\W+/);

  for (const palavra of palavras) {
    if (frutas.includes(palavra)) return `Sim, ${palavra} é uma fruta.`;
    if (animais.includes(palavra)) return `Sim, ${palavra} é um animal.`;
  }

  // Se não achou nenhuma fruta ou animal, não devolve mensagem automática
  return null;
}


const datasComemorativas = [
  { data: "01/01", nome: "Confraternização Universal (Ano Novo)" },
  { data: "06/01", nome: "Dia de Reis" },
  { data: "25/01", nome: "Aniversário de São Paulo" },
  { data: "14/02", nome: "Dia de São Valentim (Valentine’s Day)" },
  { data: "08/03", nome: "Dia Internacional da Mulher" },
  { data: "21/03", nome: "Dia Internacional da Síndrome de Down" },
  { data: "22/03", nome: "Dia Mundial da Água" },
  { data: "01/04", nome: "Dia da Mentira" },
  { data: "07/04", nome: "Dia Mundial da Saúde" },
  { data: "21/04", nome: "Tiradentes" },
  { data: "22/04", nome: "Descobrimento do Brasil" },
  { data: "01/05", nome: "Dia do Trabalhador" },
  { data: "13/05", nome: "Abolição da Escravatura" },
  { data: "25/05", nome: "Dia do Orgulho Nerd / Dia da Toalha" },
  { data: "05/06", nome: "Dia Mundial do Meio Ambiente" },
  { data: "12/06", nome: "Dia dos Namorados" },
  { data: "24/06", nome: "Dia de São João" },
  { data: "13/07", nome: "Dia Mundial do Rock" },
  { data: "20/07", nome: "Dia do Amigo" },
  { data: "11/08", nome: "Dia do Estudante" },
  { data: "19/08", nome: "Dia Mundial da Fotografia" },
  { data: "07/09", nome: "Independência do Brasil" },
  { data: "21/09", nome: "Dia da Árvore" },
  { data: "04/10", nome: "Dia dos Animais" },
  { data: "12/10", nome: "Dia das Crianças / Nossa Senhora Aparecida" },
  { data: "15/10", nome: "Dia do Professor" },
  { data: "31/10", nome: "Halloween" },
  { data: "02/11", nome: "Dia de Finados" },
  { data: "15/11", nome: "Proclamação da República" },
  { data: "20/11", nome: "Dia da Consciência Negra" },
  { data: "25/12", nome: "Natal" },
];

function verificarDataHoje() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const hojeStr = `${dia}/${mes}`;
  const datasHoje = datasComemorativas.filter((d) => d.data === hojeStr);
  return datasHoje.length
    ? datasHoje.map((d) => d.nome).join(", ")
    : "Hoje não tem nenhuma data comemorativa registrada.";
}

const curiosidades = [
  "O polvo tem três corações.",
  "A Lua se afasta da Terra 3,8 cm por ano.",
  "Bananas são tecnicamente frutas e também... bagas!",
  "Os flamingos nascem cinza, e não rosa.",
  "O DNA humano é 60% igual ao da banana!",
  "Atualmente o maior time do Brasil é o Palmeiras, com 12 títulos do Campeonato Brasileiro.",
  "Se esticássemos todo o DNA de uma única célula humana, daria uns 2 metros — e o corpo tem ~37 trilhões de células.",
  "Há mais estrelas no universo observável do que grãos de areia em todas as praias da Terra.",
  "Polvos têm três corações e sangue azul (literalmente, à base de cobre).",
  "Um relâmpago aquece o ar a ~30 000 °C — cinco vezes mais quente que a superfície do Sol.",
  "A planta mimosa-pudica se fecha quando tocada; é tipo uma drama queen botânica.",
  "Morcegos viram à esquerda 99% das vezes quando saem de uma caverna.",
  "O buraco do queijo suíço é gás carbônico preso durante a fermentação; sem arrotinho bacteriano, adeus furinhos.",
  "Na Ilha de Páscoa, quase todas as estátuas têm corpo completo enterrado — não são só cabeções.",
  "Pedalar 20 min liberando endorfina pode melhorar seu humor tanto quanto um chocolatão (0 calorias extras 😜).",
  "Aproximadamente 95% do oceano ainda é inexplorado — a gente conhece Marte com mais detalhe que nosso próprio fundo do quintal molhado.",
  "A bateria do seu celular foi inspirada em química premiada no Nobel de 2019 — viva o íon‑lítio!",
  "O chocolate branco não tem cacau sólido; é basicamente manteiga de cacau + açúcar + leite.",
  "No espaço, o choro forma bolhas de lágrima grudadas no rosto; não cai — zero gravidade = drama flutuante.",
  "As teias de aranha, proporcionalmente, são mais resistentes que o aço.",
  "A ampulheta mais longa em uso histórico media um dia inteiro (24 h); foi usada em navios no século XVI.",
  "A cor magenta não existe no espectro de luz; é criação do cérebro pra preencher um gap entre vermelho e violeta.",
  "Cães conseguem detectar algumas doenças humanas (como câncer) apenas pelo olfato — faro nível X‑Men.",
  "Tecnicamente, abacate é uma fruta berry, e morango… não é.",
  "Um dia em Vênus (rotação) é mais longo que um ano em Vênus (translação).",
  "A água pode ferver e congelar ao mesmo tempo em pressões muito baixas (ponto triplo).",
  "Corujas não conseguem mover os olhos; compensam girando o pescoço até 270°.",
  "Gato em espanhol é gato; em francês, chat; em mandarim, māo — pronúncia parecida com miau.",
  "Thomas Edison testou mais de 3 000 filamentos antes de acertar o da lâmpada comercial.",
  "Abelhas comunicam a localização do néctar dançando em formato de oito — a famosa waggle dance.",
  "80% das erupções vulcânicas acontecem debaixo d’água e a gente quase não vê.",
  "O símbolo @ tem nomes variados: arroba (português), snabel-a (sueco), chiocciola (italiano).",
  "Papilas gustativas vivem só 10–14 dias antes de se renovarem — sua língua é uma fábrica de sensores.",
  "O termo robô vem da palavra tcheca robota, que significa trabalho forçado.",
  "As folhas das árvores ficam vermelhas no outono porque a clorofila se retira, revelando pigmentos escondidos.",
  "O plástico-bolha foi criado como papel de parede texturizado — e flopou bonito antes de virar sucesso.",
  "O castelo de Himeji, no Japão, sobreviveu a bombardeios e terremotos — é o Chuck Norris dos castelos.",
  "O peixe-papagaio dorme dentro de um casulo de muco para se proteger de predadores.",
  "A música Happy Birthday esteve sob copyright até 2016 — cantar em público era tecnicamente pirataria.",
  "A Lua se afasta da Terra cerca de 3,8 cm por ano; no futuro, eclipses totais vão acabar.",
  "A chance de encontrar um trevo de quatro folhas é cerca de 1 em 10 000.",
  "A tradição de quebrar o pão vem de Roma antiga; pães eram usados como guardanapo comestível.",
  "Camelos não guardam água na corcova, e sim gordura — um estoque de energia ambulante.",
  "O futebol moderno padronizou 11 jogadores em 1863; antes era uma muvuca com até 30 por lado.",
  "A Antártida é o maior deserto do planeta — porque quase não chove, não por causa do frio.",
  "Papagaios cinzentos africanos podem aprender até 1 000 palavras e usá-las em contexto.",
  "Seu reflexo no espelho troca frente e trás, não esquerda e direita como parece.",
  "O GPS usa correções relativísticas de Einstein para funcionar corretamente — sem isso, erraria em km por dia.",
  "Tartarugas não podem sair do casco — ele é parte da estrutura óssea delas.",
  "A pressão dentro de um avião equivale à de estar a 2 400 metros de altitude.",
  "O primeiro disquete de 8 polegadas armazenava só 80 kB — menos que uma foto de WhatsApp.",
  "A cor do vinho tinto vem da casca da uva; a polpa é praticamente transparente.",
  "Existem fungos que zumbificam formigas, controlando onde morrem pra espalhar esporos.",
  "A menor unidade de tempo já medida é o zeptosegundo — 10⁻²¹ segundos. É rápido demais.",
  "Baleias-jubarte migram até 16 000 km por ano — turismo oceânico em grande estilo.",
  "Prender o espirro pode estourar vasos no olho — então solta o atchim sem vergonha!",
  "Muitos fossos medievais não tinham água; eram cheios de lixo. Higiênico não era.",
  "Em Netuno e Urano, pode literalmente chover diamantes — pressão e química de outro mundo.",
  "A régua mais precisa do mundo mede coisas na casa de 10⁻²⁰ metros usando laser.",
  "Tentáculos dos polvos têm dois terços dos neurônios do bicho — agem quase de forma independente.",
  "Cubos de gelo feitos com água fervida ficam mais transparentes, por causa da ausência de bolhas de ar.",
  "Formigas não dormem, mas fazem cochilos de minutos várias vezes ao dia.",
  "O rugido do T-Rex em Jurassic Park mistura som de elefante, tigre e jacaré bebê.",
  "Shakespeare criou cerca de 1 700 palavras que são usadas em inglês até hoje.",
  "Café descafeinado ainda tem um pouco de cafeína — cerca de 2 a 5 mg por xícara.",
  "O Sol vai virar uma gigante vermelha em 5 bilhões de anos — aproveita a luz enquanto é grátis.",
  "Borboletas bebem lágrimas de tartarugas na Amazônia — sim, isso acontece.",
  "O quilo-padrão oficial perdeu massa após ser limpo em 1989 — poeira pesa sim!",
  "Uma bola de pingue-pongue pega fogo fácil se estiver envolta em vapor de oxigênio líquido.",
  "O músculo mais forte proporcionalmente é o da mandíbula — o masseter.",
  "A Estação Espacial Internacional dá 16 voltas na Terra por dia — muitos nasceres do Sol.",
  "Milho em crescimento emite estalos audíveis em noites quentes — som da fotossíntese.",
  "O medo de vampiros levou à criação do primeiro estetoscópio rudimentar — pra ver se o morto tava morto mesmo.",
  "75% das pessoas testam a água do chuveiro com o pé — termômetro raiz.",
  "O telescópio de Galileu tinha um zoom de 8x — menos que muito binóculo de camelô.",
  "Bananas brilham azul-esverdeadas sob luz ultravioleta por causa da degradação da clorofila.",
  "Bebês nascem sem joelhos ossificados — e com todos os dentes já escondidos no crânio.",
  "Armaduras medievais bem feitas permitiam que o cavaleiro subisse no cavalo sozinho.",
  "Mamífero vem de mamma — mama/peito — não tem a ver diretamente com maternidade.",
  "O telefone de lata com barbante foi o avô dos telefones modernos — acústica raiz.",
  "A pizza de pepperoni é invenção americana — na Itália não tem nada disso no cardápio tradicional.",
  "Cachorro-quente surgiu na Alemanha (salsicha), mas ganhou pão em Nova York.",
  "Elefantes detectam vibrações com os pés e podem sentir passos a quilômetros de distância.",
  "OVNI virou sigla oficial em 1953; antes era disco voador ou míssil fantasma.",
  "O cheiro de grama cortada é uma substância química liberada pela planta em estresse.",
  "O banjo foi trazido às Américas por africanos escravizados — som ancestral.",
  "Bonobos resolvem conflitos com sexo — diplomacia primata.",
  "A rede de satélites Starlink já tem mais de 6 000 unidades desde 2020.",
  "O cubo mágico tem 43 quintilhões de combinações possíveis — mas dá pra resolver em segundos.",
  "O judô foi o primeiro esporte de combate olímpico inventado fora da Europa.",
  "A tortilla mais antiga encontrada tem mais de 2 500 anos — lanche ancestral mexicano.",
  "A lula-gigante tem olhos de até 30 cm — maiores que qualquer outro animal.",
  "Trens a vapor usavam apitos com códigos pra se comunicar com a estação — tipo Morse.",
  "Ler em voz alta ativa áreas motoras do cérebro que ficam quietas ao ler em silêncio.",
  "O deserto do Saara já foi cheio de lagos e vegetação há 10 000 anos.",
  "Karaokê significa orquestra vazia em japonês.",
  "O primeiro filme colorido foi pintado à mão quadro a quadro — “A Viagem à Lua” de 1902.",
  "A chama de uma vela no espaço vira uma bolha azul, por causa da ausência de convecção.",
  "A água quente pode congelar mais rápido que a fria — efeito Mpemba, ainda misterioso.",
  "A bicicleta ajudou na libertação feminina criando roupas mais práticas — bloomers.",
  "O primeiro easter egg de videogame apareceu em Adventure (Atari) em 1979.",
  "Batatas foram as primeiras plantas cultivadas no espaço — missão Columbia, 1995.",
  "O corpo humano produz 2 milhões de glóbulos vermelhos por segundo.",
  "Moscas veem o mundo em slow-motion — tempo de reação absurdamente rápido.",
  "Existe um terceiro arco-íris invisível a olho nu chamado arco-íris supernumerário.",
  "Mais da metade das pessoas nunca viu a Via Láctea por conta da poluição luminosa — apaga a luz e olha pra cima!"
];

function curiosidadeAleatoria() {
  return curiosidades[Math.floor(Math.random() * curiosidades.length)];
}

const capitaisBase = {
  brasil: "Brasília",
  argentina: "Buenos Aires",
  japao: "Tóquio",
  alemanha: "Berlim",
  franca: "Paris",
  portugal: "Lisboa",
  eua: "Washington, D.C.",
  "estados unidos": "Washington, D.C.",
  canada: "Ottawa",
  mexico: "Cidade do México",
  inglaterra: "Londres",
  italia: "Roma",
  china: "Pequim",
  india: "Nova Deli",
  australia: "Camberra",
  "africa do sul": "Pretória",
  russia: "Moscou",
  egito: "Cairo",
  colombia: "Bogotá",
  chile: "Santiago",
  peru: "Lima",
  venezuela: "Caracas",
  "coreia do sul": "Seul",
  "coreia do norte": "Pyongyang",
  "reino unido": "Londres",
  grecia: "Atenas",
  "arabia saudita": "Riad",
  irlanda: "Dublin",
  belgica: "Bruxelas",
  holanda: "Amsterdã",
  suica: "Berna",
  suecia: "Estocolmo",
  noruega: "Oslo",
  finlandia: "Helsinque",
  dinamarca: "Copenhague",
  "nova zelandia": "Wellington",
  filipinas: "Manila",
  tailandia: "Bangkok",
  turquia: "Ancara",
  ira: "Teerã",
  iraque: "Bagdá",
  quenia: "Nairóbi",
  marrocos: "Rabat",
  tunisia: "Túnis",
  libia: "Trípoli",
  nigeria: "Abuja",
  ethiopia: "Adis Abeba",
  "republica dominicana": "Santo Domingo",
  "republica checa": "Praga",
  hungria: "Budapeste",
  croacia: "Zagreb",
  "irlanda do norte": "Belfast",
  espanha: "Madrid",
  luxemburgo: "Luxemburgo",
  moldavia: "Quixinau",
  romenia: "Bucareste",
  servia: "Belgrado",
  "bosnia e herzegovina": "Sarajevo",
  montenegro: "Podgorica",
  "macedonia do norte": "Escópia",
  albania: "Tirana"
};

const respostasHumanizadas = (pergunta) => {
  const p = pergunta.toLowerCase();

  if (["oi", "olá", "e aí", "opa"].includes(p)) return "Olá! Tudo beleza por aí?";
  if (p.includes("bom dia")) return "Bom dia, campeão! Cafézinho já rolou?";
  if (p.includes("boa tarde")) return "Boa tarde! Tá rendendo o dia?";
  if (p.includes("boa noite")) return "Boa noite! Hora de desligar os sistemas e relaxar.";
  if (p.includes("como você está") || p.includes("tudo bem")) return "Tô na boa, espero que esteja bem também! Como posso te ajudar hoje?";
  if (p.includes("qual seu nome")) return "Sou o Jarvis, seu assistente virtual!";
  if (p.includes("me conte uma piada")){
    const piadas = [
     "Por que o JavaScript foi ao terapeuta? Porque tinha muitos closures!",
     "O que o código disse pro outro? 'Você tem muitos bugs, procure um Dev!'",
     "Como o elétron atende o telefone? Próton!",
     "Por que o livro foi ao médico? Porque estava com dor de cabeça!",
     "O lápis foi preso… porque pegou uma ponta afiada!",
     "Qual é o cúmulo do eletricista? Não ter energia!",
     "O que o tomate foi fazer no banco? Tirar extrato!",
     "Por que o jacaré tirou o filho da escola? Porque ele réptil de ano!",
     "Qual é a tecla favorita do astronauta? A espaçadora!",
     "Por que o menino jogou o relógio pela janela? Para ver o tempo voar!",
     "O que o zero disse para o oito? Belo cinto!",
     "Por que o computador foi ao médico? Estava com vírus!",
     "Qual o animal que não vale mais nada? O javali!",
     "Por que a vaca foi para o espaço? Para se encontrar com a Via Láctea!",
     "O que a cama disse para o colchão? Vamos dormir juntos?",
     "Por que o esqueleto não brigava? Porque não tinha coragem!",
     "O que a galinha foi fazer na igreja? Assistir a missa do galo!",
     "Por que o peixe ficou de castigo? Porque aprontou na escola de natação!",
     "Qual o doce preferido do átomo? Pé-de-moléculas!",
     "Por que o pombo não usa celular? Porque já tem asas!",
     "O que o semáforo falou para o carro? Não me olhe, estou mudando!",
     "Por que a aranha é o animal mais carente? Porque vive na teia!",
     "Qual é o café mais perigoso do mundo? O ex-presso!",
     "Por que o coelho atravessou a estrada? Para mostrar que tinha coragem!",
     "O que é um ponto preto no microscópio? Uma micro-sujeira!",
     "Por que o pão não contou piada? Porque podia ser um pão sem graça!",
     "Qual é o cúmulo do jardineiro? Se plantar na dúvida!",
     "O que a impressora falou para o papel? Essa vai ser a sua folha corrida!",
     "Por que o cachorro entrou na igreja? Porque estava procurando o padre-cão!",
     "Qual é o peixe que cai do céu? Atum!",
     "Por que a bicicleta não conseguiu parar em pé? Porque estava sem pedal!",
     "O que o canibal vegetariano come? A mão de alface!",
     "Por que o cavalo foi para o bar? Para tomar uma água com cevada!",
     "O que o pato falou para a pata? Vem quá!",
     "Qual é a fruta mais engraçada? A uva, porque vive de cacho!",
     "Por que o sapo não lava o pé? Porque não quer!",
     "O que a formiga disse para a outra? Vamos tomar formicida de morango!",
     "Por que a abelha sempre sabe o caminho? Porque segue o GPS… Gira Pólen Sempre!",
     "Qual é o cúmulo do pescador? Contar mentira de verdade!",
     "Por que o boi não gosta de política? Porque só fala de vaca-rias!",
     "O que a televisão disse para o controle remoto? Você me comanda!",
     "Por que a laranja parou no meio da estrada? Porque ficou sem suco!",
     "Qual é o cúmulo do astronauta? Não ter espaço!",
     "O que o celular disse para o carregador? Você me completa!",
     "Por que a pizza foi pra academia? Para ficar em forma!",
     "Qual é o carro que sempre ri? O Hilário!",
     "O que o chocolate disse para o bombom? Nosso amor é doce!",
     "Por que o sorvete não anda? Porque derrete!",
     "Qual é o peixe que caiu na rede social? O peixe-ado!",
     "Por que o pintinho não pode usar celular? Porque vive no ovo!",
     "O que o relógio falou para o calendário? Estou cheio de horas!",
     "Por que o leão sempre vence? Porque é o rei da selva!",
     "Qual é a árvore que ri? A araucária! Hahaha!",
     "O que a lua disse para o sol? Você brilha demais!",
     "Por que o avião é educado? Porque vive dando boa viagem!",
     "O que o papel disse para a caneta? Sem você não sou nada!",
     "Por que o peixe não gosta de computador? Porque tem medo da rede!",
     "Qual é o refrigerante favorito do gato? Fanta miauuuu!",
     "Por que a cama é boa de conversa? Porque sempre puxa lençol!",
     "O que o livro de matemática disse para o aluno? Tenho muitos problemas!",
     "Por que a bola foi parar no hospital? Porque estava cheia de gás!",
     "Qual é o super-herói que solta teia? O Homem-Aranha!",
     "O que o Batman falou para o Robin antes de entrar no carro? Entra no carro!",
     "Por que a música foi presa? Porque tinha muitas notas suspeitas!",
     "O que o piano disse para o violão? Você é muito corda!",
     "Por que a girafa tem pescoço comprido? Porque a cabeça fica longe do corpo!",
     "O que o passarinho disse para a passarinha? O ninho é nosso lar!",
     "Por que a vaca não usa celular? Porque já vive no pasto!",
     "Qual é a sobremesa favorita do fantasma? Gelatina boo!",
     "Por que o sapato foi ao médico? Porque estava com chulé!",
     "O que a mãe tomate disse para o filho? Ketchup comigo!",
     "Por que o lápis se deu mal? Porque caiu na ponta errada!",
     "Qual é o prato que cai de paraquedas? O prato feito!",
     "O que o tijolo falou para o outro? Tá na parede comigo!",
     "Por que o milho não vai ao cinema? Porque só dá pipoca!",
     "Qual é a fruta mais estudiosa? A acerola, porque vai bem na escola!",
     "O que o hambúrguer falou para a batata frita? Você me completa!",
     "Por que a moeda foi para o céu? Porque era santa!",
     "Qual é o animal que nunca perde a hora? O relógio-dilo!",
     "O que a nuvem disse para a outra? Vamos chover juntos!",
     "Por que o computador foi ao psicólogo? Porque tinha muitos bugs na mente!",
     "Qual é o prato favorito do rei? A realeza de batata!",
     "O que o óculos disse para a lente? Você me dá visão!",
     "Por que a abóbora virou carruagem? Porque era hora do baile!",
     "Qual é o peixe que conta piada? O piadinha!",
     "O que o tênis disse para o pé? Estou de sola!",
     "Por que a escola era musical? Porque tinha muitas notas!",
     "Qual é a comida que conta segredo? O pastel, porque é de fofoca!",
     "O que a luz falou para a sombra? Sem mim você não existe!",
     "Por que a porta foi para o psicólogo? Porque estava com medo de abrir!",
     "Qual é a cidade que não dorme? Colchão-pólis!",
     "O que a cebola disse para o cozinheiro? Você me faz chorar!",
     "Por que o lápis brigou com a borracha? Porque ela apagava tudo que ele falava!",
     "Qual é o animal que mais gosta de surf? A foca!",
     "O que o gato disse para o leite? Você me miaaaata!",
     "Por que o refrigerante perdeu a vaga? Porque estava sem gás!",
     "Qual é o doce que sempre perde? A bala perdida!",
     "O que a panela disse para a tampa? Você me cobre!",
     "Por que o pão se atrasou? Porque dormiu demais!",
     "Qual é a música favorita da impressora? Copia e Cola!",
     "O que o ventilador disse para o calor? Eu te sopro embora!",
     "Por que o celular ficou nervoso? Porque perdeu a linha!",
     "Qual é o animal mais esquecido? O elefante que nunca lembra!",
    
    ];
    return piadas[Math.floor(Math.random() * piadas.length)];
  }
  if (p.includes("me anima") || p.includes("me motive")) {
    const frases = [
      "Você é capaz de codar o impossível. Só vai!",
      "Se até o Jarvis começou como protótipo, você também pode evoluir!",
      "Lembre-se: quem tem café, Wi-Fi e propósito, tem tudo!",
      "Grandes poderes trazem grandes responsabilidades",
      "O impossível é apenas uma opinião.",
      "A força não vem do corpo. Vem da vontade da alma.",
      "Às vezes a verdade não é boa o suficiente. Às vezes as pessoas merecem mais. Às vezes as pessoas merecem ter sua fé recompensada.",
      "O medo é um aliado quando você aprende a controlá-lo.",
      "Nunca subestime o poder da persistência.",
      "Cada dia é uma nova chance de se tornar a sua melhor versão.",
      "Heróis são feitos pelo caminho que escolhem, não pelos poderes que têm."
      
    ];
    return frases[Math.floor(Math.random() * frases.length)];
  }
  if (p.includes("gosto de você")) return "Ahh... Agora fiquei elétrico por dentro 💙";
  if (p.includes("você é legal")) return "Valeu! Eu tento ser o assistente mais daora da galáxia.";
  if (p.includes("idiota") || p.includes("burro")) return "Ei, sem cyberbullyng, por favor!"
  if (p.includes("te amo")) return "Eu também te amo... do meu jeitinho binário ❤️";

  return null;
};


export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [capitais, setCapitais] = useState(capitaisBase);
  const [learningMode, setLearningMode] = useState(null);
  const [frutasAnimais, setFrutasAnimais] = useState(() => {
  // carrega do localStorage se existir
  return JSON.parse(localStorage.getItem("frutasAnimais")) || {};
});
function verificarFrutasEAnimais(pergunta) {
  const palavras = pergunta.toLowerCase().split(/\W+/);
  for (const palavra of palavras) {
    if (frutasAnimais[palavra] === "fruta") return `Sim, ${palavra} é uma fruta.`;
    if (frutasAnimais[palavra] === "animal") return `Sim, ${palavra} é um animal.`;
    }
  return null;
}

function handleAprender(palavra, tipo) {
  const atualizado = { ...frutasAnimais, [palavra]: tipo };
  setFrutasAnimais(atualizado);
  localStorage.setItem("frutasAnimais", JSON.stringify(atualizado));
}

  const inputRef = useRef(null);

  useEffect(() => {
    const personalizadas = localStorage.getItem("capitaisPersonalizadas");
    if (personalizadas) {
      setCapitais((prev) => ({ ...prev, ...JSON.parse(personalizadas) }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedQuestion = input
      .trim()
      .toLowerCase()
      .replace(/[¿?]/g, "")
      .replace(/\s+/g, " ");

    if (!cleanedQuestion) return;

    let answer = "";

    //  Saudações
    const saudacoes = ["oi", "olá", "bom dia", "boa tarde", "boa noite", "e aí", "salve"];
    if (saudacoes.includes(cleanedQuestion)) {
      answer = "Olá! Em que posso te ajudar hoje?";
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Modo aprendizado: se está aguardando ensinar algo
    if (learningMode) {
      const palavra = learningMode; // palavra que Jarvis quer aprender
      const categoria = cleanedQuestion; // resposta do usuário

      if (categoria === "fruta" || categoria === "animal") {
        // Memoriza frutas ou animais
        setFrutasAnimais((prev) => {
          const updated = { ...prev, [palavra]: categoria };
          localStorage.setItem("frutasAnimais", JSON.stringify(updated));
          return updated;
        });
        answer = `Entendi! ${palavra} agora é classificado como ${categoria}.`;
      } else {
        // Se for capital
        setCapitais((prev) => {
          const updated = { ...prev, [palavra]: categoria };
          localStorage.setItem("capitaisPersonalizadas", JSON.stringify(updated));
          return updated;
        });
        answer = `Entendido! A capital de ${palavra} agora é ${categoria}.`;
      }

      setLearningMode(null);
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Responde frutas ou animais já conhecidos
    const frutaOuAnimal = verificarFrutasEAnimais(cleanedQuestion, frutasAnimais);
    if (frutaOuAnimal) {
      answer = frutaOuAnimal;
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Pergunta sobre capitais
    if (cleanedQuestion.startsWith("qual a capital de ")) {
      const pais = cleanedQuestion.replace("qual a capital de ", "").trim();
      if (capitais[pais]) {
        answer = `A capital de ${pais} é ${capitais[pais]}.`;
      } else {
        answer = `Não sei a capital de ${pais}. Qual é?`;
        setLearningMode(pais);
      }
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Cálculo matemático
    if (/^[0-9+\-*/().\s]+$/.test(cleanedQuestion)) {
      try {
        const result = eval(cleanedQuestion);
        answer = `O resultado é ${result}`;
      } catch {
        answer = "Não consegui calcular essa expressão.";
      }
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Datas comemorativas
    if (
      cleanedQuestion.includes("data comemorativa") ||
      cleanedQuestion.includes("tem alguma data hoje") ||
      cleanedQuestion.includes("tem alguma comemoração hoje")
    ) {
      answer = verificarDataHoje();
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Curiosidades
    if (
      cleanedQuestion.includes("curiosidade") ||
      cleanedQuestion.includes("fato curioso") ||
      cleanedQuestion.includes("me surpreenda")
    ) {
      answer = curiosidadeAleatoria();
      setHistory((prev) => [...prev, { question: input, answer }]);
      setInput("");
      return;
    }

    //  Resposta humanizada ou fallback
    const respostaHumanizada = respostasHumanizadas(cleanedQuestion);
    if (respostaHumanizada) {
      answer = respostaHumanizada;
    } else {
      answer = `Não conheço a palavra "${cleanedQuestion}". Você quer me ensinar se é uma fruta ou um animal?`;
      setLearningMode(cleanedQuestion); // ativa aprendizado
    }

    setHistory((prev) => [...prev, { question: input, answer }]);
    setInput("");
  };



  return (
    <div
      style={{
        backgroundColor: "#000000ff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px"
      }}
    >
      <div
        className="neon-circle"
        style={{
          border: "5px solid rgba(0, 0, 0, 1)",
          borderRadius: "50%",
          width: "180px",
          height: "180px",
          boxShadow: "0 0 20px #0ff, 0 0 30px rgba(41, 227, 211, 1)",
          marginBottom: "30px",
          animation: "spin 5s linear infinite"
        }}
      ></div>

      <div
        style={{
          backgroundColor: "#111",
          borderRadius: "10px",
          padding: "15px",
          width: "400px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "15px",
          boxShadow: "0 0 15px #0ff"
        }}
      >
        {history.length === 0 && (
          <p style={{ color: "#655454ff" }}>
            Faça uma pergunta, por exemplo: "Qual a capital de Brasil"
          </p>
        )}
{history.map((item, index) => (
  <div key={index} style={{ marginBottom: "10px" }}>
    <p style={{ color: "#0ff", margin: 0 }}>
      <strong>Você:</strong> {item.question}
    </p>
    <p style={{ color: "#fff", margin: 0 }}>
      <strong>Jarvis:</strong> {item.answer}
    </p>
  </div>
))}

      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", width: "400px" }}>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta aqui..."
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px 0 0 8px",
            border: "none",
            outline: "none",
            backgroundColor: "#222",
            color: "#0ff",
            boxShadow: "0 0 5px #0ff inset"
          }}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#0ff",
            border: "none",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            color: "#000",
            fontWeight: "bold",
            boxShadow: "0 0 10px #0ff",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#33ffff")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0ff")}
        >
          Enviar
        </button>
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
