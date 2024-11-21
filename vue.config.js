module.exports = {
    // ... 其他配置 ...
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/, // 一个正则表达式，表示应用这个 loader 的文件类型
                    exclude: /node_modules/, // 排除 node_modules 目录
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'] // 使用 preset-env 预设
                        }
                    }
                },
                // ... 可能还有其他 loaders 配置 ...
            ]
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8001/',
                // target: 'http://182.44.63.154:8766/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 把路径中的 /api 替换成空字符串
                }
            }
        }
    }
};