const path = require('path')

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'stimulus-dropdown'
    },
    rollupOptions: {
      external: ['stimulus-use/dist/use-transition', 'stimulus'],
      output: {
        globals: {
          stimulus: 'Stimulus',
          'stimulus-use/dist/use-transition': 'useTransition'
        }
      }
    }
  }
}
