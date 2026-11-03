---
name: irpf-organizer
description: Organiza documentos e informações para a Declaração de Ajuste Anual do IRPF no Brasil, verifica se há obrigatoriedade de declarar e compara de forma geral o desconto simplificado com as deduções legais. Use quando o usuário precisar se preparar para declarar o Imposto de Renda de pessoa física ou juntar os comprovantes do ano.
---

# Organizador do IRPF

Ajuda a **organizar a documentação** e as informações para a Declaração de Ajuste Anual (DAA) do Imposto de Renda da Pessoa Física, com base no "Perguntas e Respostas" oficial da Receita Federal. É apoio de organização, **não cálculo oficial nem consultoria tributária**. Fontes em `references/sources.md`.

## Quando usar
- "Preciso declarar o Imposto de Renda este ano?"
- "Que documentos eu junto para o IRPF?"
- "Vale mais o desconto simplificado ou as deduções?"
- Não use para planejamento tributário agressivo, nem para decidir como tratar casos complexos (ganho de capital, atividade rural, exterior, espólio) sem um contador.

## Importante: ano-base
Os limites e prazos mudam a cada exercício. Pergunte sempre o **exercício** (ano da declaração) e o **ano-calendário** (ano dos rendimentos), e confirme os valores no "Perguntas e Respostas" do ano e no site da Receita. Os valores abaixo são do **exercício 2026 (ano-calendário 2025)**, como exemplo.

## Fluxo

1. **Ano e perfil.** Pergunte exercício/ano-calendário, residência fiscal no Brasil, se tem dependentes, e as principais fontes de renda (salário, aposentadoria, aluguéis, autônomo, investimentos).
2. **Obrigatoriedade.** Verifique contra os critérios do ano. Exercício 2026: está obrigado quem, no ano-calendário de 2025, por exemplo:
   - recebeu rendimentos tributáveis acima de R$ 35.584,00;
   - recebeu rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte acima de R$ 200.000,00;
   - teve ganho de capital sujeito a imposto;
   - vendeu em bolsa acima de R$ 40.000,00 no total (ou teve ganho líquido sujeito a imposto);
   - tinha, em 31/12, bens e direitos acima de R$ 800.000,00;
   - e outros casos (atividade rural, residência no Brasil, exterior, etc.).
   Idade e doença grave **não** dispensam nem obrigam por si só. Se algum critério se aplicar, ou houver dúvida, trate como obrigado e confirme no P&R.
3. **Reúna os documentos do ano-calendário:**
   - informes de rendimentos de cada fonte pagadora (empregador, INSS/previdência, bancos e corretoras);
   - comprovantes de **pagamentos efetuados** a pessoas físicas e jurídicas que entram na declaração (pensão alimentícia, aluguéis, instrução, profissionais autônomos como médicos, dentistas, psicólogos, advogados, etc.);
   - **doações** efetuadas;
   - dados de **dependentes** (inclusive CPF);
   - bens, direitos e dívidas em 31/12 (imóveis, veículos, contas, investimentos, empréstimos);
   - declaração do ano anterior e recibo.
   Toda despesa informada deve poder ser comprovada por documento adequado.
4. **Desconto simplificado x deduções legais.** O desconto simplificado substitui todas as deduções e corresponde a 20% dos rendimentos tributáveis, limitado a R$ 16.754,34 (exercício 2026), sem necessidade de comprovação. Ajude o usuário a **comparar** de forma geral (total de deduções comprovadas versus o desconto), lembrando que, depois do prazo, não se pode mudar a forma de tributação. A decisão e o cálculo final são feitos no programa da Receita.

   **Deduções legais mais comuns** (exercício 2026), para somar o que o usuário consegue comprovar:
   - **Dependentes:** R$ 2.275,08 por dependente (dependentes precisam de CPF).
   - **Contribuição à previdência oficial** descontada do próprio contribuinte, e contribuições a previdência complementar/Fapi (esta limitada a 12% dos rendimentos tributáveis).
   - **Pensão alimentícia** paga em dinheiro por decisão judicial, acordo homologado ou escritura pública.
   - **Despesas médicas** do contribuinte e dependentes: pagamentos a médicos, dentistas, psicólogos, fisioterapeutas, fonoaudiólogos, terapeutas ocupacionais, hospitais, exames, e planos de saúde. Devem ser informadas na ficha "Pagamentos Efetuados" e comprovadas por documento fiscal ou equivalente com nome, CPF/CNPJ do prestador, data e quem pagou (o Recibo Receita Saúde também vale). Não são dedutíveis despesas ressarcidas por seguro ou reembolso.
   - **Despesas com instrução:** mensalidades e anuidades de educação infantil, fundamental, médio, superior e técnica, com limite anual de R$ 3.561,50 por pessoa; uniforme, transporte, material escolar e computador **não** entram.
   - Despesas escrituradas em livro-caixa, quando permitidas (casos de autônomos; encaminhe a um contador).
5. **Fichas obrigatórias mesmo no simplificado.** "Pagamentos Efetuados" e "Doações Efetuadas" devem ser preenchidas em qualquer modalidade; a omissão sujeita a multa de 20% do valor não declarado.
6. **Prazo e multa.** Exercício 2026: 23 de março a 29 de maio de 2026, até 23h59min59s (Brasília). Entrega fora do prazo gera multa (mínimo de R$ 165,74 no exercício 2026; 1% a 20% do imposto devido, quando houver). Confirme as datas do ano corrente.
7. **Checklist final** e lista de dúvidas para o contador.

## Formato da resposta

```
## Organizador IRPF: exercício <ano> (ano-calendário <ano-1>)
**Obrigatoriedade:** sim / não / confirmar (critérios que se aplicam)
**Documentos por categoria:** tabela (categoria | documento | já tenho? | observação)
**Simplificado x deduções:** comparação geral + o que falta comprovar
**Prazos:** datas confirmadas no P&R do ano
**Pendências e perguntas ao contador:** …
**Aviso:** apoio de organização, não é cálculo oficial
```

## Limites e aviso
Esta skill organiza informações e não substitui a orientação de um contador ou da Receita Federal; **não é consultoria tributária** e não calcula o imposto oficial. Regras, limites e prazos mudam todo ano: confirme sempre no "Perguntas e Respostas" do exercício e nos canais oficiais antes de declarar. Casos com ganho de capital, atividade rural, investimentos no exterior, espólio ou saída definitiva do país exigem profissional habilitado. Não compartilhe senhas, CPF completo, números de conta ou código de acesso gov.br; use descrições ou valores aproximados.
