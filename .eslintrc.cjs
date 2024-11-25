module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended', 'next/core-web-vitals'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:tailwindcss/recommended',
      ],
      rules: {
        'import/no-relative-packages': 'error',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'function-declaration',
            unnamedComponents: 'arrow-function',
          },
        ],
        '@next/next/no-img-element': 'off',
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              {
                target: './src/features/employee',
                from: './src/features',
                except: ['./employee'],
              },
              {
                target: './src/features/kanban',
                from: './src/features',
                except: ['./kanban'],
              },
              {
                target: './src/features/product',
                from: './src/features',
                except: ['./product'],
              },
              {
                target: './src/features/auth',
                from: './src/features',
                except: ['./auth'],
              },
              // enforce unidirectional codebase:

              // e.g. src/app can import from src/features but not the other way around
              {
                target: './src/features',
                from: './src/app',
              },

              // e.g src/features and src/app can import from these shared modules but not the other way around
              {
                target: [
                  './src/api',
                  './src/components',
                  './src/config',
                  './src/constants',
                  './src/hooks',
                  './src/lib',
                  './src/stores',
                  './src/styles',
                  './src/types',
                  './src/utils',
                ],
                from: ['./src/features', './src/app'],
              },
            ],
          },
        ],
        'import/no-cycle': 'error',
        'react/prop-types': 'off',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': [
          'error',
          { endOfLine: 'auto', usePrettierc: true },
        ],
      },
    },

    // Commenting it because making my developing the app slower
    // {
    //   plugins: ['check-file'],
    //   files: ['src/**/*'],
    //   rules: {
    //     'check-file/filename-naming-convention': [
    //       'error',
    //       {
    //         '**/*.{ts,tsx}': 'KEBAB_CASE',
    //       },
    //       {
    //         ignoreMiddleExtensions: true,
    //       },
    //     ],
    //     'check-file/folder-naming-convention': [
    //       'error',
    //       {
    //         '!(src/app)/**/*': 'KEBAB_CASE',
    //         '!(**/__tests__)/**/*': 'KEBAB_CASE',
    //       },
    //     ],
    //   },
    // },
  ],
};
