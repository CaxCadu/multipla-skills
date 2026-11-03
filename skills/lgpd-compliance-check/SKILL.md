---
name: lgpd-compliance-check
description: Faz um diagnóstico inicial de adequação à LGPD (Lei 13.709/2018) para uma empresa, projeto ou processo, mapeando dados pessoais, bases legais, direitos dos titulares e segurança. Use quando o usuário perguntar se está em conformidade com a LGPD, precisar mapear tratamento de dados ou preparar um plano de adequação.
---

# Diagnóstico de conformidade com a LGPD

Conduz uma **verificação inicial** (checklist) de como uma organização trata dados pessoais à luz da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). É uma ferramenta de apoio a advogados, encarregados e gestores; **não é parecer jurídico**. Fontes em `references/sources.md`.

## Quando usar
- "Minha empresa/site/app está de acordo com a LGPD?"
- Mapear que dados pessoais são tratados e para quê.
- Preparar perguntas para um advogado ou para o encarregado (DPO).
- Não use para concluir se houve infração, nem para defender o usuário em processo.

## Fluxo

1. **Contexto.** Pergunte: tipo de organização e porte (a ANPD tem regras e guias específicos para agentes de tratamento de pequeno porte), setor, quem são os titulares (clientes, funcionários, usuários), e se há dados de crianças ou dados sensíveis. Não peça dados pessoais reais, apenas descrições.
2. **Papéis (art. 5º).** Identifique quem é **controlador** (decide sobre o tratamento), **operador** (trata em nome do controlador) e se há **encarregado** indicado.
3. **Mapeie o tratamento.** Para cada atividade (cadastro, cobrança, marketing, RH, site/analytics…), anote: quais dados, de quem, para qual finalidade, onde ficam, com quem são compartilhados, por quanto tempo.
4. **Dados sensíveis.** Marque o que for dado pessoal sensível (por exemplo saúde, biometria, origem racial ou étnica, convicção religiosa, opinião política); exigem atenção redobrada.
5. **Princípios (art. 6º).** Para cada atividade, verifique: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.
6. **Base legal (art. 7º).** Para cada atividade, qual hipótese se aplica? Consentimento; obrigação legal ou regulatória; execução de contrato; exercício regular de direitos; proteção da vida; tutela da saúde; legítimo interesse; proteção do crédito; estudos por órgão de pesquisa; políticas públicas pela administração pública. Sinalize atividades sem base clara. Para consentimento, verifique se pode ser provado e revogado.
7. **Direitos dos titulares (art. 18).** Existe canal e processo para: confirmação do tratamento, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, e revogação do consentimento?
8. **Segurança e incidentes (arts. 46 a 49).** Há medidas administrativas e técnicas básicas, um plano de resposta e quem comunica à ANPD e aos titulares incidentes que possam causar risco ou dano relevante (art. 48)? Para pequenos agentes, use como referência o guia de segurança da ANPD e seu checklist.
9. **Priorize** as lacunas por risco (alto/médio/baixo) e proponha um plano de ação em ordem.

## Formato da resposta

```
## Diagnóstico LGPD: <organização>
**Contexto e papéis:** …
**Mapa de tratamento:** tabela (atividade | dados | titulares | finalidade | base legal | compartilhamento | retenção)
**Lacunas:** tabela (item | artigo/princípio | risco | ação sugerida)
**Plano de ação:** 30 / 60 / 90 dias
**Perguntas para o advogado/encarregado:** …
**Aviso:** apoio informativo, não é parecer jurídico
```

## Limites e aviso
Esta skill oferece orientação geral e um checklist; **não constitui consultoria ou parecer jurídico**, não cria relação advogado-cliente e pode estar desatualizada. A LGPD é alterada e regulamentada pela ANPD ao longo do tempo (o texto consultado já inclui alterações posteriores); sempre confirme a versão vigente da lei e das resoluções e guias da ANPD. Casos concretos, contratos, incidentes de segurança e sanções devem ser avaliados por advogado habilitado ou pelo encarregado. Não cole dados pessoais reais; use descrições ou dados fictícios.
