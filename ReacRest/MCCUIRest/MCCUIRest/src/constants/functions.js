export const toastAnyWhere = {
  show: function (message = '', variant = 'success', autoHideDuration = 5000) {
    if (this.display) {
      this.display.show(message, variant, autoHideDuration)
    }
  }
}
