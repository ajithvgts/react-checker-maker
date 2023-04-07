import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
// import { readFile } from 'node:fs/promises'
// import path from 'node:path'
import dts from 'vite-plugin-dts'

const App = async (): Promise<UserConfigExport> => {
  // let name = 'replaceme'

  // const data: string = await readFile(path.join(__dirname, 'src', 'index.ts'), {
  //   encoding: 'utf-8',
  // })

  // const s = data.split('\n')

  // for (const x of s.reverse())
  //   if (x.includes('export default')) {
  //     name = x.replace('export default ', '').replace(' ', '')
  //   }

  return defineConfig({
    build: {
      // lib: {
      //   entry: resolve(__dirname, 'src/index.ts'),
      //   name: 'react-checker-maker',
      //   formats: ['es', 'cjs'],
      //   fileName: (format) => `index.${format}.js`,
      // },
      lib: {
        entry: {
          components: resolve(__dirname, 'src/components/index.ts'),
          contracts: resolve(__dirname, 'src/contracts/index.ts'),
          hooks: resolve(__dirname, 'src/hooks/index.ts'),
          root: resolve(__dirname, 'src/index.ts'),
        },
        formats: ['es', 'cjs'],
        name: 'react-checker-maker',
        fileName: (format, entryName) => `${entryName}/index.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDom',
          },
        },
      },
    },
    plugins: [react(), dts({ include: ['src'], insertTypesEntry: true })],
  })
}

export default App
