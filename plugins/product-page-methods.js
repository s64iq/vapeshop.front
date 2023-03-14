import Vue from 'vue'

Vue.mixin({
  methods: {
    setSelectorRadius() {
      let count = 0
      for (let j = 0; j < this.Data.url.toString().split(';').length; j++) {
        if(this.Data.url.toString().split(';')[j] != null && this.Data.url.toString().split(';')[j] != '') {
          count++
        }
      }
      this.photoSelectorRadius = count * -150 + 750
    },

    changeImage(url) {
      document.getElementById('gallery-product-photo').setAttribute('src',url)
    },

    nextImage() {
      if(this.photoSelectorRadius < this.currentPhotoSelectorPosition) {
        this.currentPhotoSelectorPosition -= 150
        document.getElementById('gallery-product-photo-selector').setAttribute('style','transform:' + `translateX(${this.currentPhotoSelectorPosition}px)`)
      }
    },

    previousImage() {
      if(this.currentPhotoSelectorPosition != 0) {
        this.currentPhotoSelectorPosition += 150
        document.getElementById('gallery-product-photo-selector').setAttribute('style','transform:' + `translateX(${this.currentPhotoSelectorPosition}px)`)
      }
    },

    featuresIsEmpty() {
      if(this.Data.xark == null && this.Data.comp == null) {
        return true
      }
      if (!(this.Data.xark == null && this.Data.comp == null)) {
        return false
      }
    },
  }
})
