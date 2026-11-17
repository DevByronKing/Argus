import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'android/**',
    'ios/**',
    'playwright-report/**',
    'test-results/**',
    'public/**',
    'scripts/**/*.js',
  ]),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      // Regras estritas do React Compiler (plugin v7) — projeto usa React 19 sem React Compiler habilitado
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
]);

export default eslintConfig;
