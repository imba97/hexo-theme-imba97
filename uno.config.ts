import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  content: {
    pipeline: {
      include: [/\.(ejs|html|md)($|\?)/]
    }
  },
  cli: {
    entry: {
      patterns: ['layout/**/*.ejs', '../../source/**/*'],
      outFile: 'source/css/uno.css'
    }
  }
})
