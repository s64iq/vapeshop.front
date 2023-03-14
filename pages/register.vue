<template>
  <div>
    <div class="register-page-container">
      <h1 class="register-page-title">Register</h1>
      <p class="register-page-title-info">Please fill in this form to create an account.</p>
      <hr>

      <label class="register-page-username" for="username"><b>Name</b></label>
      <input class="register-page-username-input" type="text" placeholder="Enter Name" name="username" id="username" autocomplete="off" required>

      <label class="register-page-email" for="email"><b>Email</b></label>
      <input class="register-page-email-input" type="text" placeholder="Enter Email" name="email" id="email" autocomplete="off" required>

      <label class="register-page-password" for="psw"><b>Password</b></label>
      <input class="register-page-password-input" type="password" placeholder="Enter Password" name="psw" id="psw" autocomplete="off" required>
      <hr>

      <div class="register-page-notification-modal" v-if="invalidRegisterDataModal !== false">
        <div v-for="(item,index) in notification.split(';')">
          {{item}}
        </div>
      </div>

      <button class="register-page-signup-btn" type="submit" @click="this.register">Register</button>

      <div class="register-page-signin-modal">
        <p>Already have an account? <a @click="$router.push('/login')" style="cursor: pointer">Sign in</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return {
      userData : {
        username : "",
        email : "",
        password : ""
      },
      invalidRegisterDataModal : false,
      notification : ''
    }
  },
  methods: {
    async register() {
      this.setRegisterData()
      try {
        await axios.post('http://localhost:8085/api/auth/signup', {
          username: this.userData.username,
          email: this.userData.email,
          password: this.userData.password
        }).then(async response => {
          if(response.status === 200) {
            await this.$router.push('/login')
          }
        })
      } catch (e) {
        this.openNotificationModal()
        this.notification = e.response.data.message
      }
    },

    setRegisterData() {
      this.userData.username = document.querySelector('#username').value
      this.userData.email = document.querySelector('#email').value
      this.userData.password = document.querySelector('#psw').value
    },

    openNotificationModal() {
      this.invalidRegisterDataModal = true;
    }
  },

  mounted() {
    /*this.isAuthorized()*/
  }
}
</script>

<style>
/*Register form*/
* {box-sizing: border-box}

/* Add padding to containers */
.register-page-container {
  margin: auto;
  width: 400px;
  padding: 16px;
}

/* Full-width input fields */
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

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.register-page-signup-btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.register-page-signup-btn:hover {
  opacity:1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.register-page-signin-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  width: 368px;
  height: 47px;
  text-align: center;
}

/*Notification modal*/
.register-page-notification-modal {
  background-color: #ffb5b2;
  border: 2px solid #ff6363;
  border-radius: 4px;
}
</style>
