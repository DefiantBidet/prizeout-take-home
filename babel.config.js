module.exports = {
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        [
            'module-resolver',
            {
                alias: {
                    'Components/*': 'src/components/*',
                    'Modules/*': 'src/modules/*',
                    'Slices/*': 'src/slices/*',
                    'SourceRoot/*': 'src/*',
                    'Testing/*': 'src/testing/*',
                    'Utils/*': 'src/utils/*',
                },
                root: ['./src'],
            },
        ],
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
};
