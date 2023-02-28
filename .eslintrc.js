module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  globals: {
    daum: true,
    kakao: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-console': process.env.NODE_ENV === 'prod' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'prod' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        // I를 붙이도록 강제 하는 옵션
        prefix: ['I']
      }
    ]
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  overrides: [
    {
      files: [`src/components/**/*`],
      rules: {
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: [['builtin', 'external'], 'index', 'sibling', 'object', 'type', 'parent', 'internal'],
            pathGroups: [
              {
                pattern: '@/components/**',
                group: 'index'
              },
              {
                pattern: '@/mixin/**',
                group: 'sibling'
              },
              {
                pattern: '@/utils/**',
                group: 'object'
              },
              {
                pattern: '@/types',
                group: 'type'
              },
              {
                pattern: '@/types/**',
                group: 'type'
              },
              {
                pattern: '@/enums',
                group: 'parent'
              },
              {
                pattern: '@/enums/**',
                group: 'parent'
              },
              {
                pattern: '@/store/**',
                group: 'internal'
              }
            ],
            pathGroupsExcludedImportTypes: [
              '@/components/**',
              '@/types',
              '@/types/**',
              '@/mixin/**',
              '@/enums',
              '@/enums/**',
              '@/store/**',
              '@/utils/**'
            ],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            }
          }
        ]
      }
    }
  ]
}
