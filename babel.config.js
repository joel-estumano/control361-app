// export default {
//     presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }],],
// };

export default {
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 2, targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    plugins: [
        function () {
            return {
                visitor: {
                    MetaProperty(path) {
                        path.replaceWithSourceString('process');
                    },
                },
            };
        },
    ],
};
