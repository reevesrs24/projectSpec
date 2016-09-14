var path = require('path');
var webpack = require('webpack');


module.exports = {

    entry: './resources/views/get-started.blade.php',
    output: {path: __dirname, filename: 'bundle.js'},

    moadule: {
        loaders:[
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015', 'react']
                }



            }
        ]
    },
};