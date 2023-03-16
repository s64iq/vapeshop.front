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
              <div class="profile-notification-modal" v-if="passwordNotificationModal !== false">
                <div class="profile-notification-modal-text" v-for="(item,index) in notification.split(';')">
                  {{item}}
                </div>
              </div>
            </div>
          </div>
        </modal>
      </div>
    </main>

    <default_footer/>
  </div>
</template>

<script>
import style from '/assets/css/profile-page.module.css';
import Default_header from "./global/header/default_header";
import Default_footer from "./global/footer/default_footer";
export default {
  components: {Default_footer, Default_header},
  middleware: 'auth',

  data() {
    return {
      Data: [],
      passwordNotificationModal: false,
      notification: ''
    }
  },

  async mounted() {
    await this.fetchUser()
  },

  computed: {
    styles() {
      return style
    }
  }
}
</script>
