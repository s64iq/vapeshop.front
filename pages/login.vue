<template>
  <div>
    <div class="login-page-container">
      <h1 class="login-page-title">Sign in</h1>
      <p class="login-page-title-info">Please fill in this form to authenticate.</p>
      <hr>

      <label class="login-page-username" for="username"><b>Name</b></label>
      <input class="login-page-username-input" type="text" placeholder="Enter Name" name="username" id="username" required>

      <label class="login-page-password" for="psw"><b>Password</b></label>
      <input class="login-page-password-input" type="password" placeholder="Enter Password" name="psw" id="psw" required>
      <hr>

      <div class="login-page-notification-modal" v-if="showModal !== false">
        <div>
          {{notification}}
        </div>
      </div>

      <button class="login-page-signin-btn" type="submit" @click="userLogin()">Sign in</button>

      <div class="login-page-signup-modal">
        <p>Don't have an account? <a @click="$router.push('/register')" style="cursor: pointer">Register</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      user: {
        id: 0,
        username: '',
        email: '',
        roles: {
          id: 0,
          name: ''
        }
      },
      showModal : false,
      notification : ''
    }
  },
  methods: {
    async userLogin() {
      this.setUserData()
      await this.$auth.loginWith('local', { data: this.login })
        .then(response => {
          this.$auth.setRefreshToken('local', response.data.refreshToken)
          this.$auth.setToken('local', 'Bearer ' + response.data.token)
          console.info('OK: Sign in was successful!')
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error: Sign in failed! Problem: ' + error.response.data.message)
          this.openNotificationModal()
          this.notification = error.response.data.message
        })
    },

    setUserData() {
      this.login.username = document.querySelector('#username').value
      this.login.password = document.querySelector('#psw').value
    },

    openNotificationModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.notification = []
    },

  },

  mounted() {

  }
}
</script>

<style>
* {
  box-sizing: border-box
}
.login-page-container {
  margin: auto;
  width: 400px;
  padding: 16px;
}
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
.login-page-signin-btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
.login-page-signin-btn:hover {
  opacity:1;
}
a {
  color: dodgerblue;
}
.login-page-signup-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  width: 368px;
  height: 47px;
  text-align: center;
}
.login-page-notification-modal {
  background-color: #ffb5b2;
  border: 2px solid #ff6363;
  border-radius: 4px;
}
</style>
