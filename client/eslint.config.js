import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: [
    'react-app',
    'react-app/jest'
  ],
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // Add other rules as needed
  }
});
