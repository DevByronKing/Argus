const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '..', 'src', 'lib', 'questions');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/["']falso_sinonimo["']/g, '"armadilha_semantica"');
  content = content.replace(/["']distrator_semelhanca["']/g, '"conceito_correto_contexto_errado"');
  content = content.replace(/["']troca_de_prazos["']/g, '"distrator_temporal"');
  fs.writeFileSync(p, content);
  console.log('Fixed quotes in:', f);
});
