# Arquitetura

Modo integrado, conforme solution-contract.md. Svelte 5 consome feTS + Ajv standalone na mesma origem. SSR contém conteúdo, metadados e navegação; o bundle próprio monta depois da hidratação.

Ligamentos discretos tela, sarja de período quatro e cetim de período cinco. Matriz binária e SVG vetorial reais.

API HTTP de mesma origem.

service.mjs: domínio e exportação. input-schema.mjs: restrições canônicas. validator.mjs: validação da stack. api.mjs: protocolo/router. store.mjs: D1, tokens, CAS, TTL e cotas. transport.mjs: bytes/UTF-8, origem, erros mascarados e cabeçalhos.

AJV gera validadores ESM standalone em pretest/prebuild. Nenhum eval/new Function é necessário para validar entradas no Worker. Os arquivos gerados são ignorados e recriados a partir do schema versionado.
