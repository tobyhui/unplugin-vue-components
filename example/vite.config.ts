import path from 'path'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'

const config: UserConfig = {
  alias: {
    '/~/': path.resolve(__dirname, 'src'),
  },
  plugins: [
    Vue(),
    Markdown(),
    ViteComponents({
      extensions: ['vue', 'md'],
      directoryAsNamespace: true,
      globalNamespaces: ['global'],
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: [
        (name) => {
          if (name === 'MyCustom')
            return '/src/CustomResolved.vue'
        },
        // auto import from ui library Vant
        (name: string) => {
          if (name.startsWith('Van'))
            return { importName: name.slice(3), path: 'vant' }
        },
      ],
    }),
  ],
}

export default config
