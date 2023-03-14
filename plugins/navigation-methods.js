import Vue from 'vue'

Vue.mixin({
  methods: {
    async sendCurrentPage() {
      await fetch('http://localhost:8085/page/', {
        method: 'POST',
        headers: {
          'Authorization': this.$auth.getToken('local'),
          'page': `${this.pageId}`
        },
      })
    },

    reloadPageOrRedirect() {
      if(this.pageId === 1) {
        window.location.reload()
      } else {
        this.$router.push('/category/' + this.categoryType + '/page/1')
      }
    },

    pageChangeHandler: function(pageNum) {
      if(this.id !== pageNum) {
        this.$router.push('/category/' + this.categoryType + '/page/' + pageNum)
      }
    },

    calculatePageCount() {
      this.pagesCount = Math.ceil(this.DataSize/100)
    },

    openUserPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.$router.currentRoute.fullPath !== '/profile') {
        this.$router.push('/profile')
      } else {
        window.location.reload()
      }
    },

    openOrderPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.$router.currentRoute.fullPath !== '/order') {
        this.$router.push('/order')
      } else {
        window.location.reload()
      }
    },

    openMainPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.$router.currentRoute.fullPath !== '/') {
        this.$router.push('/')
      } else {
        window.location.reload()
      }
    },

    openVapePage() {
      this.removePriceFiltersInLocalStorage()
      if(this.pageId && this.categoryType != null) {
        if(this.categoryType !== 'vapes') {
          this.$router.push('/category/vapes/page/1')
        } else {
          this.reloadPageOrRedirect()
        }
      } else {
        this.$router.push('/category/vapes/page/1')
      }
    },

    openLiquidPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.pageId && this.categoryType != null) {
        if(this.categoryType !== 'liquids') {
          this.$router.push('/category/liquids/page/1')
        } else {
          this.reloadPageOrRedirect()
        }
      } else {
        this.$router.push('/category/liquids/page/1')
      }
    },

    openModPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.pageId && this.categoryType != null) {
        if(this.categoryType !== 'mods') {
          this.$router.push('/category/mods/page/1')
        } else {
          this.reloadPageOrRedirect()
        }
      } else {
        this.$router.push('/category/mods/page/1')
      }
    },

    openComponentPage() {
      this.removePriceFiltersInLocalStorage()
      if(this.pageId && this.categoryType != null) {
        if(this.categoryType !== 'components') {
          this.$router.push('/category/components/page/1')
        } else {
          this.reloadPageOrRedirect()
        }
      } else {
        this.$router.push('/category/components/page/1')
      }
    },

    openProductPage(index) {
      this.removePriceFiltersInLocalStorage()
      if(this.$router.currentRoute.fullPath.split('/')[1] === 'order') {
        this.$router.push('/product/' + this.Data.orderList[index].product.type.name.toLowerCase() + "/" + this.Data.orderList[index].product.url.split('.')[2])
      }
      if(this.$router.currentRoute.fullPath.split('/')[1] === 'category') {
        this.$router.push('/product/' + this.categoryType.slice(0, -1) + '/' + this.Data[index].url.toString().split('.')[2])
      }
    },

    dropdownMenuHandler() {
      if(this.dropdownMenu === true) {
        return this.dropdownMenu = false
      }
      this.dropdownMenu = true
    },
  }
})
