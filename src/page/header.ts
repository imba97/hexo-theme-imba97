import $ from 'jquery'

$(() => {
  const Menu = {
    container: $('#menu-expand-container'),
    button: $('#menu-expand-button'),
    isShow: false,
    show() {
      this.isShow = true
      this.container.show()
      this.button.find('[i-fad-h-expand]').hide()
      this.button.find('[i-iconamoon-close-bold]').show()
    },
    hide() {
      this.isShow = false
      this.container.hide()
      this.button.find('[i-fad-h-expand]').show()
      this.button.find('[i-iconamoon-close-bold]').hide()
    }
  }

  $('body').on('click', '#menu-expand-button', () => {
    console.log('Menu.isShow', Menu.isShow)
    const a = Menu.container.find('a')

    const hide = () => {
      Menu.hide()
    }

    if (Menu.isShow) {
      Menu.hide()

      a.each((_index, aElement) => {
        aElement.removeEventListener('click', hide)
      })
    } else {
      Menu.show()

      a.each((_index, aElement) => {
        aElement.addEventListener('click', hide, {
          once: true
        })
      })
    }
  })
})
