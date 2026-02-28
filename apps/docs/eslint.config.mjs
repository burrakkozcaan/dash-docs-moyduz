import next from '@repo/eslint-config/next.js';

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      '.next/',
      '.source/',
      'out/',
      'next.config.mjs',
      'postcss.config.js',
    ],
  },
  ...next,
  {
    rules: {
      'no-console': 'off',
      // for Fumadocs CLI
      'import/no-relative-packages': 'off',
    },
  },
];
