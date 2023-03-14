<template>
  <div class="container">
    <default_header/>

    <div class="product-page-product-title">
      <div class="product-page-title-product-name">
        {{Data.name}}
      </div>
    </div>

    <main class="product-page-main">
      <div class="product-page-main-product-block"
           v-if="Data.url != null && Data.url.toString().split('.')[2] === productNameInUrlFormat">

        <div class="product-page-main-product-info">
          <div class="product-page-main-product-gallery">
            <div class="gallery-main-product-photo">
              <img id="gallery-product-photo"
                   v-bind:src="Data.url.toString().split(';')[0]">
            </div>
            <div id="gallery-product-photo-selector">
              <img class="gallery-product-photo-selector-photo-mini"
                   v-for="(item, index) in Data.url.toString().split(';')"
                   v-bind:src="item"
                   v-if="item != null && item != ''"
                   @click="changeImage(item)">
            </div>

            <div class="gallery-product-photo-selector-buttons">
              <img class="gallery-product-photo-selector-button"
                   src="https://s1.iconbird.com/ico/2014/1/598/w512h5121390846440leftcircular512.png"
                   @click="previousImage">
              <img class="gallery-product-photo-selector-button"
                   src="https://s1.iconbird.com/ico/2014/1/598/w512h5121390846454rightcircular512.png"
                   @click="nextImage">
            </div>
          </div>

        </div>

        <div class="product-page-main-product-sidebar">
          <div class="product-page-main-sidebar-price">
            {{Data.price + " ₽"}}
          </div>

          <div class="product-page-main-sidebar-button-buy"
               @click="addProduct()">
            Купить
          </div>

          <modal name="err">
            <div class="product-page-main-order-modal">
              Товар уже в корзине
            </div>
          </modal>

          <modal name="add">
            <div class="product-page-main-order-modal">
              Товар добавлен в корзину
            </div>
          </modal>
        </div>
      </div>

      <div class="product-page-main-product-features-block" v-if="featuresIsEmpty() === false">
        <div class="product-page-main-product-features-text"
             v-if="Data.url != null && Data.url.toString().split('.')[2] === productNameInUrlFormat">

          <div class="product-page-main-product-features-xark-panel" v-if="Data.xark != null && Data.xark != ''">
            <h4>Характеристики:</h4>
            <li class="product-page-main-product-features-info-text" v-for="(item, index) in Data.xark.split(';')"
                v-if="item != ''">
              {{item}}
            </li>
          </div>

          <div class="product-page-main-product-features-comp-panel" v-if="Data.comp != null && Data.comp != ''">
            <h4>Комплектация:</h4>
            <li class="product-page-main-product-features-info-text" v-for="(item, index) in Data.comp.split(';')"
                v-if="item != ''">
              {{item}}
            </li>
          </div>
        </div>
      </div>
    </main>

    <footer/>
  </div>
</template>

<script>
import style from '/assets/css/product-page.module.css';
import footer from '/assets/css/global/footer.module.css';
import Default_header from "../../global/header/default_header";
export default {
  components: {Default_header},
  middleware: 'auth',
  data() {
    return {
      Data: [],
      productType: this.$router.currentRoute.fullPath.split('/')[2],
      productNameInUrlFormat: this.$route.params['componentname'],
      currentPhotoSelectorPosition: 0,
      photoSelectorRadius: 0,
      dropdownMenu: false
    }
  },

  async mounted() {
    await this.fetchUser()
    await this.getProductDataForProductPage()
    this.setSelectorRadius()
  },

  computed: {
    styles() {
      return [style, footer]
    }
  }
}
</script>
