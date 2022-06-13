/*
 * @Author: Gavin Chan
 * @Date: 2022-05-20 16:03:56
 * @LastEditors: Gavin
 * @LastEditTime: 2022-05-31 14:31:37
 * @FilePath: \legao\packages\editor\.umirc.ts
 * @Descriptions: todo
 */
import path from 'path';
import { defineConfig } from 'umi';
const { ModuleFederationPlugin } = require('webpack').container;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/LoadingCp',
  },
  dva: {
    immer: true,
  },
  // devtool: 'source-map',
  antd: {},
  title: '乐高-可视化搭建系统',
  // exportStatic: {},
  base: '/',
  publicPath: '/',
  outputPath: 'dist',
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/home',
        },
        {
          path: '/editor',
          component: '../pages/editor',
        },
        {
          path: '/ide',
          component: '../pages/ide',
        },
        {
          path: '/help',
          component: '../pages/help',
        },
        {
          path: '/login',
          component: '../pages/login',
        },
        {
          path: '/mobileTip',
          component: '../pages/mobileTip',
        },
      ],
    },
  ],
  theme: {
    'primary-color': '#049ae1',
    // "btn-primary-bg": "#2F54EB"
  },
  extraBabelPlugins: [['import', { libraryName: 'zarm', style: true }]],
  // sass: {},
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
  fastRefresh: {},
  webpack5: {},
  plugins: ['./src/plugins/umi-msfu-plugin.ts'],
  chainWebpack(memo) {
    memo.plugin('mf').use(ModuleFederationPlugin, [
      {
        name: 'dooringEditor',
        remotes: {
          dooringUI: 'dooringUI@//localhost:8008/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: '17.x' },
          'react-dom': { singleton: true, eager: true, requiredVersion: '17.x' },
        },
      },
    ]);
  },
});
