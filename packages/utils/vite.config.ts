import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true, // 自动在 package.json 中插入 types 字段
      // 可选：自定义输出目录
      // outputDir: 'dist/types'
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts', // 入口文件
      name: 'Utils', // UMD 格式时的全局变量名
      fileName: (format) => `utils.${format}.js`, // 输出文件名，根据格式自动生成
    },
    rollupOptions: {
      // 如果你的工具库有外部依赖（例如 lodash），可以通过 external 排除
      external: [],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: 'utils.es.js',
          sourcemap: false,
        },
        {
          format: 'umd',
          name: 'Utils',
          dir: 'dist',
          entryFileNames: 'utils.umd.js',
          sourcemap: false,
          globals: {},
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: 'utils.cjs.js',
          sourcemap: false,
        },
      ],
    },
  },
})
