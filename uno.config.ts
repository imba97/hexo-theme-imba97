import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  cli: {
    entry: {
      patterns: ['layout/**/*.ejs', '../../source/**/*'],
      outFile: 'source/css/uno.css'
    }
  }
})
