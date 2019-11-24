const path = require('path');

module.exports = {
    mode: 'none', // Tip! compile in 'production' mode before publish

    // Tip! Just delete not using files, but main.ts is required
    entry: {
        index: './src/app.ts',
        'miro-plugin': './src/miro-plugin/index.ts'
        //'bottom-panel': './src/bottom-panel.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.theme$/i,
                use: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        extensions: ['.tsx', '.ts', '.js','.css']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};