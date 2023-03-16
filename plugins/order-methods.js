import Vue from 'vue'

Vue.mixin({
  methods: {
    async addProduct() {
      await fetch('http://localhost:8085/order/', {
        method: 'POST',
        headers: {
          'Authorization': this.$auth.getToken('local'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'user': {
            'id': this.$auth.user.id,
            'email': this.$auth.user.email,
            'username': this.$auth.user.username
          },
          'productId': this.Data.id,
          'productType': this.Data.type,
          'count': 1
        })
      }).then(async response => {
        if(response.status === 200) {
          await response.json()
            .then(response => {
              if(JSON.stringify(response) == 'true') {
                this.$modal.show('add');
                console.info('OK: Product was added in order!')
              } else {
                this.$modal.show('err');
                console.info('Failed: This product already added in order!')
              }
            })
        } else {
          console.error('Error: Failed add product! Problem: One of tokens was expired! Trying fetch access token!')
          await this.updateToken()
          await this.addProduct()
        }
      })
    },

    async calculateTotalPrice() {
      for (let i = 0; i < this.Data.orderList.length; i++) {
        this.totalPrice += this.Data.orderList[i].product.price * this.Data.orderList[i].count
      }
    },

    async productCountMinus(index) {
      if(this.Data.orderList[index].count > 1) {
        this.Data.orderList[index].count -= 1
      }
      await this.changeProductCount(index)
    },

    async productCountPlus(index) {
      if(this.Data.orderList[index].count >= 1) {
        this.Data.orderList[index].count += 1
      }
      await this.changeProductCount(index)
    },

    async changeProductCount(index) {
      await fetch('http://localhost:8085/order/', {
        method: 'PUT',
        headers: {
          'Authorization': this.$auth.getToken('local'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'user': {
            'id': this.$auth.user.id,
            'email': this.$auth.user.email,
            'username': this.$auth.user.username
          },
          'productId': this.Data.orderList[index].product.id,
          'productType': this.Data.orderList[index].product.type,
          'count': this.Data.orderList[index].count
        })
      }).then(response => {
        if(response.status !== 200) {
          this.fetchUser()
          this.changeProductCount(index)
        } else {
          window.location.reload();
        }
      })
    },

    async deleteProduct(index) {
      await fetch('http://localhost:8085/order/', {
        method: 'DELETE',
        headers: {
          'Authorization': this.$auth.getToken('local'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'user': {
            'id': this.$auth.user.id,
            'email': this.$auth.user.email,
            'username': this.$auth.user.username
          },
          'productId': this.Data.orderList[index].product.id,
          'productType': this.Data.orderList[index].product.type,
          'count': this.Data.orderList[index].count
        })
      }).then(response => {
        if(response.status !== 200) {
          this.fetchUser()
          this.deleteProduct(index)
        } else {
          window.location.reload();
        }
      })
    },
  }
})
