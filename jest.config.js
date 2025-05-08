export default {
    preset: 'ts-jest',

    // Define o ambiente de teste como "jsdom", permitindo testar componentes React que interagem com o DOM.
    testEnvironment: 'jsdom',

    // Configuração de transformação para arquivos TypeScript e TSX, garantindo que Jest use o compilador `ts-jest`
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Aplica a transformação `ts-jest` em arquivos TypeScript/TSX.
    },

    // Mapeia módulos para evitar erros ao importar arquivos CSS/SVG no Jest.
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Permite que testes ignorem estilos CSS.
        '^.+\\.svg$': 'jest-transformer-svg', // Garante que arquivos SVG possam ser manipulados nos testes.
        '^@/(.*)$': '<rootDir>/src/$1', // Define alias `@/` para simplificar importações dentro dos testes.
    },

    // Define arquivos de configuração a serem carregados após o ambiente de teste ser preparado.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Permite adicionar configurações globais para testes.
};
