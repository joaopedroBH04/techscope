# Scripts de utilidade para CI/CD

## Verificar qualidade do código
npm run lint
npm run type-check

## Rodar testes com coverage
npm run test -- --coverage --watchAll=false

## Build de produção
npm run build

## Preview de deploy (local)
npx serve dist -l 3000
