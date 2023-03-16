import Vue from 'vue'

Vue.mixin({
  methods: {
    async changePassword() {
      if(document.querySelector('.change-password-input').value !== '') {
        await fetch('http://localhost:8085/api/auth/password', {
          method: 'PUT',
          headers: {
            "Authorization": this.$auth.getToken('local'),
            "Content-type": "application/json",
          },
          body: document.querySelector('.change-password-input').value.toString()
        }).then(async response => {
          if(response.status === 200) {
            await response.json().then(async response => {
              setTimeout(() => {
                window.location.reload();
              }, 5000);
              this.notification = await response.message + " Wait please!"
            })
          }
          if(response.status === 400) {
            await response.json().then(async response => {
              this.notification = await response.message
              console.error('Error: Failed update password! Problem: ' + await response.message)
            })
          }
          if(response.status === 500) {
            console.error('Error: Failed update password! Problem: One of tokens was expired! Trying fetch access token!')
            await this.updateToken()
            await this.changePassword()
          }
        })
      } else {
        this.notification = 'Enter password!'
      }
      this.passwordNotificationModal = true
    }
  }
})
