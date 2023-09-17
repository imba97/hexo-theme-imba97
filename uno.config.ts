import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  cli: {
    entry: {
      patterns: ['layout/**/*.ejs'],
      outFile: 'source/css/uno-style.css'
    }
  }
})
