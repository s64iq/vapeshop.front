<template>
  <div class="container">
    <default_header/>

    <main class="profile-page-main">
      <div class="profile-page-title">
        <div class="profile-page-title-page-name">
          Профиль
        </div>
        <div class="profile-page-title-nav">

        </div>
      </div>

      <div class="profile-page-main-user-profile-block">
        <div>
          {{'id: ' + JSON.stringify(this.$auth.user.id)}}
        </div>

        <div>
          {{'username: ' + JSON.stringify(this.$auth.user.username)}}
        </div>

        <div>
          {{'email: ' + JSON.stringify(this.$auth.user.email)}}
        </div>

        <div>
          {{'role: ' + JSON.stringify(this.$auth.user.role)}}
        </div>

        <button class="open-change-password-model-btn" @click="$modal.show('change-password-model-block')">
          Изменить пароль
        </button>

        <modal name="change-password-model-block">
          <div class="change-password-model">
            <div class="change-password-enter-model">
              <div class="change-password-text">
                Введите новый пароль:
              </div>
              <div class="change-password-input-block">
                <input class="change-password-input">
                <button class="change-password-btn" @click="changePassword">Send</button>
              </div>
              <div class="profile-notification-modal" v-if="invalidPasswordModal !== false">
                <div class="profile-notification-modal-text" v-for="(item,index) in notification.split(';')">
                  {{item}}
                </div>
              </div>
            </div>
          </div>
        </modal>
      </div>
    </main>

    <footer/>
  </div>
</template>

<script>
import style from '/assets/css/profile-page.module.css';
import footer from '/assets/css/global/footer.module.css';
import Default_header from "./global/header/default_header";
export default {
  components: {Default_header},
  middleware: 'auth',
  name: "user",
  data() {
    return {
      Data: [],
      changePasswordModel: false,
      invalidPasswordModal: false,
      notification: ''
    }
  },

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
      this.openNotificationModal()
    },

    openNotificationModal() {
      this.invalidPasswordModal = true;
    }
  },

  async mounted() {
    await this.fetchUser()
  },

  computed: {
    styles() {
      return [style, footer]
    }
  }
}
</script>
