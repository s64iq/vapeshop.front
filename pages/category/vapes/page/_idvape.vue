<template>
  <div class="product-category-container">
    <default_header/>

    <main class="product-category-main">
      <div class="product-category-category-header">
        <div class="product-category-category-header-title">
          Вейпы
        </div>
        <div class="product-category-category-header-panel">

        </div>
      </div>
      <div class="product-category-category-block">
        <div class="product-category-sidebar">
          <div class="product-category-sidebar-price-title">
            Цена
          </div>
          <div class="product-category-filter-price-inputs">
            <label class="product-category-filter-price-label">
              <span class="product-category-filter-price-text" style="margin-right: 5px">от</span>

              <input type="number"
                     :min="minProductPrice"
                     :placeholder="minProductPrice"
                     class="product-category-filter-price-input"
                     id="input-1"
                     @change="validateMinPriceChangesOnPanel"
                     @input="validateMinPriceInputOnPanel"
                     :value="minPrice">

              <span class="product-category-filter-price-text">₽</span>
            </label>
            <label class="product-category-filter-price-label">
              <span class="product-category-filter-price-text" style="margin-right: 5px">до</span>

              <input type="number"
                     :max="maxProductPrice"
                     :placeholder="maxProductPrice"
                     class="product-category-filter-price-input"
                     id="input-2"
                     @change="validateMaxPriceChangesOnPanel"
                     @input="validateMaxPriceInputOnPanel"
                     :value="maxPrice">

              <span class="product-category-filter-price-text">₽</span>
            </label>
          </div>

          <div class="product-category-range-slider">
            <input class="product-category-slider"
                   type="range"
                   :min="minProductPrice"
                   :max="maxProductPrice"
                   step="10"
                   v-model.number="minPrice"
                   @click="setPriceFilterInLocalStorage"
                   @input="setRangeOnSlider">

            <input class="product-category-slider"
                   type="range"
                   :min="minProductPrice"
                   :max="maxProductPrice"
                   step="10"
                   v-model.number="maxPrice"
                   @click="setPriceFilterInLocalStorage"
                   @input="setRangeOnSlider">
          </div>
        </div>

        <div class="product-category-catalog">
          <div class="product-category-filter-panel">
            <div class="product-category-filter-panel-text">
              Сортировать:
            </div>
            <div class="product-category-filter-panel-button"
                 @click="setHighToLowFilter">
              Цена выше
            </div>
            <div class="product-category-filter-panel-button"
                 @click="setLowToHighFilter">
              Цена ниже
            </div>
            <div class="product-category-filter-panel-button"
                 @click="clearPriceFilterAndReloadPage">
              Сбросить фильтр
            </div>
          </div>

          <div class="product-category-product-column" v-for="(item, productId) in Data">
            <img class="product-category-product-image"
                 v-bind:src="item.url.toString().split(';')[0]"
                 @click="openProductPage(productId)">
            <div class="product-category-product-name-title"
                 @click="openProductPage(productId)">
              {{item.name}}
            </div>
            <div class="product-category-product-price">{{item.price + ",00 ₽"}}</div>
            <div class="product-category-product-button-buy"
                 @click="openProductPage(productId)">
              Купить
            </div>
          </div>
        </div>
      </div>

      <div class="product-category-paginator-panel">
        <paginate class="product-category-paginator"
                  v-model="pageId"
                  :page-count="pagesCount"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="pageChangeHandler"
                  :prev-text="'Назад'"
                  :next-text="'Далее'"
                  :container-class="'pagination'"
                  :page-class="'page-item'">
        </paginate>
      </div>
    </main>

    <footer class="product-category-footer">

    </footer>
  </div>
</template>

<script>
import style from '/assets/css/product-category.module.css'
import footer from '/assets/css/global/footer.module.css';
import Default_header from "../../../global/header/default_header";

export default {
  components: {Default_header},
  middleware: 'auth',
  data() {
    return {
      Data: [],
      categoryType: this.$router.currentRoute.fullPath.split('/')[2],
      pageId: Number.parseInt(this.$router.currentRoute.fullPath.split('/')[4]),
      pagesCount: 0,
      DataSize: 0,
      minPrice: 0,
      maxPrice: 0,
      minProductPrice: 0,
      maxProductPrice: 0,
      dropdownMenu: false
    }
  },

  async mounted() {
    await this.fetchUser()
    await this.getPriceFilterRange()
    this.setRangeInPriceFilter()
    await this.sendPriceFilter()
    await this.sendCurrentPage()
    await this.getProductsDataForCategory()
    await this.getProductsSize()
    await this.calculatePageCount()
  },

  computed: {
    styles() {
      return [style, footer]
    }
  }
}
</script>
