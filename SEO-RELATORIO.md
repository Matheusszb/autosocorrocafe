# Auto Socorro Café — auditoria e implementação SEO

Data: 17/11/2026. Escopo: código preparado no checkout local. O estado da publicação deve ser conferido no histórico de deploy da Vercel.

## Estado inicial verificado

- Site estático em HTML, CSS e JavaScript, com build que copia os arquivos para `public/`; hospedagem configurada para Vercel.
- A home online correspondia ao `index.html` inicial do checkout (hash SHA-256 idêntico no momento da auditoria). `https://autosocorrocafe.com.br/` redirecionava com HTTP 308 para `www`; home, `robots.txt` e `sitemap.xml` respondiam HTTP 200.
- Uma única página concentrava seis serviços. Os cartões de serviço não tinham links para páginas específicas.
- Title e H1 da home eram genéricos. Faltava canonical. O sitemap usava `<loc>/</loc>`, uma URL relativa.
- O JSON-LD inicial usava um tipo não verificado e listava três telefones. A titularidade dos números foi confirmada pelo proprietário nesta conversa.
- O mapa anterior pesquisava somente o nome da empresa; o link curto de rotas redirecionava para uma pesquisa genérica do Google, sem evidência de uma ficha específica.
- As imagens secundárias não declaravam dimensões nem carregamento adiado.

## Prioridades

| Nível | Problema | Tratamento |
| --- | --- | --- |
| P0 | Sitemap com URL relativa e dados comerciais sem confirmação | URLs absolutas; dados da empresa confirmados pelo proprietário. |
| P1 | Sem páginas de serviço, canonical e foco local na home | Seis páginas criadas; metadados e conteúdo com base em Timóteo. |
| P1 | Mapa sem endereço específico | Consulta e mapa com endereço confirmado; substituir pelo link da ficha oficial quando fornecido. |
| P2 | Imagens secundárias carregadas cedo e sem dimensões | `loading="lazy"`, dimensões, prioridade da imagem principal e preconnect de fontes. |
| P2 | Menu móvel sem estado acessível | `aria-expanded` e fechamento ao selecionar um link. |

## Arquivos e páginas

Arquivos de origem modificados: `index.html`, `style.css`, `script.js`, `build.js`, `package.json`, `robots.txt`, `sitemap.xml`, `config/business.js`. `verify.js` foi adicionado. O build atualizou as cópias em `public/`.

Páginas adicionadas: `/guincho-24-horas/`, `/reboque-pesado/`, `/reboque-extra-pesado/`, `/reboque-mega-pesado/`, `/destombamento/`, `/reboque-de-veiculos/`. Cada página contém descrição própria, situações de uso, informações para orçamento, perguntas frequentes, contato e links relacionados. Não foram criadas URLs para cidades externas.

## Mapa de intenção de busca

| Intenção | Consultas principais | Página |
| --- | --- | --- |
| Emergencial local | guincho 24 horas em Timóteo; auto socorro em Timóteo | Home e `/guincho-24-horas/` |
| Remoção pesada | reboque pesado em Timóteo; guincho para caminhão | `/reboque-pesado/` |
| Demanda de maior porte | reboque extra pesado | `/reboque-extra-pesado/` |
| Pedido especial | reboque mega pesado | `/reboque-mega-pesado/` |
| Recuperação de tombamento | destombamento de caminhão em Timóteo | `/destombamento/` |
| Remoção geral | reboque de veículos | `/reboque-de-veiculos/` |
| Outras cidades e rodovias | Ainda sem lista operacional fornecida | Nenhuma página criada |

Não foram usados volumes de busca estimados. A priorização por impressões, cliques, CTR e posição depende de acesso ao Search Console.

## Reforço incremental para “guincho em Timóteo”

- A home passou a ser a URL principal para a intenção ampla “guincho em Timóteo”; o title e o H1 explicitam a cidade e mantêm auto socorro 24 horas e reboque pesado. A description preserva extra pesado, mega pesado e destombamento.
- Foi adicionada uma seção curta na home com base confirmada, serviços anunciados, informações para pedir guincho, avaliação de veículos e processo de orçamento. Ela aponta para páginas de guincho 24 horas, reboque pesado e destombamento.
- `/guincho-24-horas/` mantém o foco no atendimento emergencial e nas dúvidas de quem precisa solicitar esse serviço. As demais páginas continuam voltadas a suas modalidades. Nenhuma URL foi removida ou alterada.
- Canonical, sitemap, robots.txt, `@id` da empresa e os relacionamentos entre `LocalBusiness`, `Service`, `WebPage` e breadcrumbs foram preservados. A única área declarada em `areaServed` continua sendo Timóteo, pois outras cidades não foram informadas.
- A navegação, a estrutura visual, as fotografias, as animações e os CTAs existentes foram mantidos. A nova seção segue a tipografia, cores, espaçamentos e padrões de link do site.

## Metadados implementados

| URL | Title | Meta description |
| --- | --- | --- |
| `/` | Guincho em Timóteo MG 24h e Reboque Pesado \| Auto Socorro Café | Guincho em Timóteo, MG, com atendimento 24 horas. Reboque pesado, extra pesado, mega pesado e destombamento. Solicite atendimento ao Auto Socorro Café. |
| `/guincho-24-horas/` | Guincho 24 Horas em Timóteo \| Auto Socorro Café | Guincho 24 horas com base em Timóteo (MG). Informe localização, veículo e ocorrência ao Auto Socorro Café para verificar disponibilidade. |
| `/reboque-pesado/` | Reboque Pesado em Timóteo \| Auto Socorro Café | Reboque pesado com base em Timóteo (MG). Envie os dados do caminhão e da ocorrência para avaliação e orçamento pelo Auto Socorro Café. |
| `/reboque-extra-pesado/` | Reboque Extra Pesado em Timóteo \| Auto Socorro Café | Solicite avaliação de reboque extra pesado em Timóteo (MG). Entenda os dados necessários para planejar a remoção de veículos de maior porte. |
| `/reboque-mega-pesado/` | Reboque Mega Pesado em Timóteo \| Auto Socorro Café | Reboque mega pesado com base em Timóteo (MG). Pedidos especiais passam por avaliação técnica de veículo, acesso e recursos disponíveis. |
| `/destombamento/` | Destombamento de Caminhões em Timóteo \| Auto Socorro Café | Destombamento de caminhões com base em Timóteo (MG). Envie fotos, localização e dados da ocorrência para avaliação técnica. |
| `/reboque-de-veiculos/` | Reboque de Veículos em Timóteo \| Auto Socorro Café | Reboque de veículos com base em Timóteo (MG). Informe coleta, destino e condição do veículo para verificar o atendimento. |

Todas as páginas têm canonical e Open Graph próprios. A home tem `LocalBusiness`, `WebSite` e `WebPage`; as páginas de serviço têm `LocalBusiness`, `Service`, `WebPage` e `BreadcrumbList`. O `@id` da empresa é compartilhado. Endereço, cidade-base, três telefones e atendimento presencial 24 horas foram confirmados pelo proprietário. Não foram adicionados avaliações, classificação por estrelas, tonelagem ou cobertura não confirmada. O tipo `LocalBusiness` foi usado com endereço, conforme a [documentação do Google](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Conversão e desempenho

- WhatsApp e ligação principal continuam visíveis; os dois números adicionais aparecem como contatos da empresa na home. Mensagens de WhatsApp variam conforme o serviço. A codificação dos acentos nos links das seis páginas internas foi corrigida.
- Imagens secundárias têm `loading="lazy"`, atributos de largura/altura e alt descritivo conforme a foto. A imagem principal tem prioridade de carregamento. O script é adiado; fontes têm preconnect.
- O mapa usa o endereço confirmado e carrega de forma adiada. A consulta ao endereço no Google Maps retornou HTTP 200 em GET; o link da ficha oficial ainda será fornecido pelo proprietário.
- Não foi obtida medição de Core Web Vitals: a API pública do PageSpeed Insights respondeu HTTP 429. Não há comparação numérica antes/depois.

## Validação executada

- `npm run build`: passou.
- `npm test`: passou. O verificador cobre sete páginas, title e description exclusivos, canonical, um H1, JSON-LD parseável e seus relacionamentos, codificação das mensagens de WhatsApp, dados comerciais confirmados, links locais e sitemap.
- `sitemap.xml`: XML lido com sucesso e sete URLs.
- Prévia local final: home, as seis páginas de serviço, `sitemap.xml` e `robots.txt` responderam HTTP 200.
- A inspeção visual pelo controle do navegador não foi concluída: a tentativa inicial não conseguiu determinar a URL atual no Windows, e a nova tentativa encontrou o host de acesso ao navegador indisponível. Não há aprovação visual mobile declarada.
- Rich Results Test e Schema Markup Validator não foram executados. A validação de sintaxe do JSON-LD não comprova elegibilidade a resultados enriquecidos.

## Concorrência: levantamento inicial

Uma busca pública por Timóteo encontrou listagens de [S.O.S do Pelé](https://www.waze.com/live-map/directions/br/mg/s.o.s-do-pele-servicos-de-guincho-leves-e-pesados-assist-24-horas?to=place.ChIJqX_rRNVWpQARkLhN_3TzGrk), [Auto Socorro Duarte](https://www.locaisdobrasil.com.br/encontre/servico-de-reboque/timoteo-mg/auto-socorro-duarte-guincho-24-horas/6810f777f3d231beda7bf405) e [Santa Maria Auto Socorro](https://cnpj.biz/23833734000157). Essas fontes não permitem comparar com segurança páginas oficiais, estrutura de conteúdo, posicionamento ou autoridade. A análise competitiva profunda continua pendente; não foi inferida classificação de busca nem volume.

## Pendências e ações externas

1. Receber a lista exata de outras cidades e rodovias cobertas. Avaliar conteúdo local próprio somente depois disso.
2. O link `share.google/PEJ62Mzc43bhHi8Wb` abriu como pesquisa genérica, sem ficha do Maps verificável. Por escolha do proprietário, permanecerá a busca pelo endereço confirmado até que haja um link direto da ficha.
3. Confirmar se o CNPJ e razão social informados no briefing pertencem ao mesmo estabelecimento antes de publicá-los. Eles não foram inseridos.
4. Executar inspeção visual desktop/mobile e PageSpeed antes da publicação. Depois, testar JSON-LD no Schema Markup Validator e recursos elegíveis no Rich Results Test.
5. Após publicar, enviar o sitemap ao Google Search Console e Bing Webmaster Tools; conferir nome, endereço, categoria, fotos, serviços e horários no Perfil da Empresa no Google. Não houve alteração direta nesses serviços.
6. Conectar Search Console e GA4, se disponíveis, para registrar consultas, páginas, cliques em telefone/WhatsApp e solicitações qualificadas. OpenSEO e Windsor.ai foram sugeridos como integrações opcionais; não estão conectados.

## Acompanhamento

- **30 dias:** verificar indexação das sete URLs, rastreamento, erros 404 e contatos recebidos por serviço.
- **60 dias:** comparar impressões, cliques, CTR e consultas locais; revisar textos conforme dúvidas reais de clientes.
- **90 dias:** comparar solicitações qualificadas e contratos por origem; decidir se páginas para outras cidades agregam informação própria e se a estratégia precisa de ajustes.
