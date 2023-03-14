import Vue from 'vue'

Vue.mixin({
  methods: {
    removePriceFiltersInLocalStorage() {
      localStorage.removeItem("price-filter: low")
      localStorage.removeItem("price-filter: high")
      localStorage.removeItem("price-filter: default")
      localStorage.removeItem("filter-min-price")
      localStorage.removeItem("filter-max-price")
    },

    async clearPriceFilterAndReloadPage() {
      this.removePriceFiltersInLocalStorage()
      this.setPriceFilterDefaultValue()
      await this.sendPriceFilter()
      this.reloadPageOrRedirect()
    },

    async sendPriceFilter() {
      await fetch('http://localhost:8085/filter/', {
        method: 'POST',
        headers: {
          'Authorization': this.$auth.getToken('local'),
          'filter': `${this.minPrice};${this.maxPrice}`
        },
      })
    },

    setPriceFilterInLocalStorage() {
      if(localStorage.getItem("price-filter: high") === null && localStorage.getItem("price-filter: low") === null) {
        localStorage.setItem('price-filter: default','true')
      }
      localStorage.setItem("filter-min-price",this.minPrice);
      localStorage.setItem("filter-max-price",this.maxPrice);
      this.reloadPageOrRedirect()
    },

    async getPriceFilterRange() {
      await fetch('http://localhost:8085/' + this.categoryType + '/price-range/', {
        method: 'GET',
        headers: {
          "Content-type": "text/plain;charset=UTF-8",
          'Authorization': this.$auth.getToken('local')},
      }).then(response => response.text())
        .then(priceRange => {
          this.minProductPrice = Number.parseFloat(priceRange.split(';')[0])
          this.maxProductPrice = Number.parseFloat(priceRange.split(';')[1])
          this.setPriceFilterDefaultValue()
        })
    },

    setPriceFilterDefaultValue() {
      this.minPrice = this.minProductPrice
      this.maxPrice = this.maxProductPrice
    },

    setRangeInPriceFilter() {
      if(localStorage.getItem('filter-min-price') != null && localStorage.getItem('filter-max-price') != null) {
        this.minPrice = localStorage.getItem('filter-min-price')
        this.maxPrice = localStorage.getItem('filter-max-price')
      }
    },

    setRangeOnSlider() {
      if(this.minPrice > this.maxPrice) {
        this.minPrice = this.maxPrice
      }
    },

    validateMinPriceChangesOnPanel() {
      if(this.maxPrice < this.minPrice) {
        this.minPrice = this.maxPrice
      }
      this.setPriceFilterInLocalStorage()
      if(this.minPrice < this.minProductPrice) {
        this.minPrice = this.minProductPrice
      }
    },

    validateMaxPriceChangesOnPanel() {
      if(this.minPrice > this.maxPrice) {
        this.maxPrice = this.minPrice
      }
      this.setPriceFilterInLocalStorage()
      if(this.maxPrice < this.minProductPrice) {
        this.maxPrice = this.minProductPrice
      }
    },

    validateMinPriceInputOnPanel() {
      this.minPrice = document.getElementById('input-1').value
      if(this.minPrice > this.maxProductPrice) {
        this.minPrice = this.maxProductPrice
      }
    },

    validateMaxPriceInputOnPanel() {
      this.maxPrice = document.getElementById('input-2').value
      if(this.maxPrice > this.maxProductPrice) {
        this.maxPrice = this.maxProductPrice
      }
    },

    setHighToLowFilter() {
      localStorage.removeItem("price-filter: low");
      localStorage.removeItem("price-filter: default");
      localStorage.setItem("price-filter: high",'true');
      this.reloadPageOrRedirect()
    },

    setLowToHighFilter() {
      localStorage.removeItem("price-filter: high");
      localStorage.removeItem("price-filter: default");
      localStorage.setItem("price-filter: low",'true');
      this.reloadPageOrRedirect()
    },
  }
})
