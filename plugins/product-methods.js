import Vue from 'vue'

Vue.mixin({
  methods: {
    async getProductsDataForCategory() {
      let filterType = ''
      if(localStorage.getItem("price-filter: low") === null &&
        localStorage.getItem("price-filter: high") === null) {
        filterType = 'default'
      }
      if(localStorage.getItem("price-filter: low") === 'true' &&
        localStorage.getItem("price-filter: high") === null) {
        filterType = 'low-high'
      }
      if(localStorage.getItem("price-filter: high") === 'true' &&
        localStorage.getItem("price-filter: low") === null) {
        filterType = 'high-low'
      }
      await fetch('http://localhost:8085/' + this.categoryType + '/' + filterType + '/', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': this.$auth.getToken('local')},
      }).then(response => response.json())
        .then(data => this.Data = data)
    },

    async getProductDataForProductPage() {
      await fetch('http://localhost:8085/' + this.productType + '/product/', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'productName': `${this.productNameInUrlFormat}`,
          'Authorization': this.$auth.getToken('local')},
      }).then(response => response.json())
        .then(data => this.Data = data)
    },

    async getProductsDataForOrderPage() {
      await fetch('http://localhost:8085/order/', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': this.$auth.getToken('local')},
      }).then(response => response.json())
        .then(data => this.Data = data)
    },

    async getProductsSize() {
      await fetch('http://localhost:8085/' + this.categoryType + '/size/', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': this.$auth.getToken('local')},
      }).then(response => response.json())
        .then(data => this.DataSize = data)
    },
  }
})
