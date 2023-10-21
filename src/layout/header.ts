import $ from 'jquery'

$(() => {
  $('body').on('click', '#menu-expand-button', () => {
    const container = $('#menu-expand-container')
    const button = $('#menu-expand-button')

    if (container.is(':hidden')) {
      container.show()
      button.find('[i-fad-h-expand]').hide()
      button.find('[i-iconamoon-close-bold]').show()
    } else {
      container.hide()
      button.find('[i-fad-h-expand]').show()
      button.find('[i-iconamoon-close-bold]').hide()
    }
  })
})
