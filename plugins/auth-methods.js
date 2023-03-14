import Vue from 'vue'

Vue.mixin({
  methods: {
    isAuthorized() {
      if(this.$auth.loggedIn) {
        this.$router.push('/')
      }
    },

    logout() {
      this.removePriceFiltersInLocalStorage()
      this.$auth.reset();
      this.$router.push("/login");
      window.location.reload();
    },

    async updateToken() {
      try {
        await fetch('http://localhost:8085/api/auth/refreshtoken', {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            'refreshToken': this.$auth.getRefreshToken('local')
          })
        }).then(async response => {
          await response.json()
            .then(async token => {
              this.$auth.setToken('local', 'Bearer ' + token.accessToken)
              console.info('OK: Fetch access token was successful. Trying fetch user!')
              await this.fetchUser()
            })
        })
      } catch (e) {
        console.error('Error: Failed fetch access token! Problem: Refresh token was expired. Logout!')
        this.logout()
      }
    },

    async fetchUser() {
      try {
        await fetch('http://localhost:8085/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': this.$auth.getToken('local'),
            "Content-type": "application/json",
          }
        }).then(async response => {
          await response.json()
            .then(async response => {
              let user = {
                'id': response.id,
                'username': response.username,
                'email': response.email,
                'role': response.roles[0].name
              }
              this.$auth.setUser(user)
              console.info('OK: Fetch user data was successful!')
            })
        })
      } catch (e) {
        console.error('Error: Failed fetch user! Problem: Access token was expired. Trying fetch access token!')
        await this.updateToken()
      }
    }
  }
})
