<template>
  <div class="container">
    <default_header/>

    <main class="order-page-main">
      <div class="order-page-title">
        <div class="order-page-title-page-name">
          Корзина
        </div>
        <div class="order-page-title-nav">

        </div>
      </div>

      <div class="order-page-orders-block">
        <div class="order-page-orders-properties">
          <div class="order-page-product-name-property">
            Название
          </div>
          <div class="order-page-product-price-property">
            Цена
          </div>
          <div class="order-page-product-count-property">
            Количество
          </div>
          <div class="order-page-product-sum-property">
            Сумма
          </div>
        </div>

        <div class="order-page-product-column" v-for="(product,index) in Data.orderList">
          <img class="order-page-product-photo" v-bind:src="product.product.url.toString().split(';')[0]" @click="openProductPage(index)">

          <div class="order-page-product-name" @click="openProductPage(index)">
            {{product.product.name}}
          </div>

          <div class="order-page-product-price">
            {{product.product.price + ",00 ₽"}}
          </div>

          <div class="order-page-product-counter">
            <div class="order-page-product-count-minus" @click="productCountMinus(index)">-</div>

            <div class="order-page-product-count">
              {{product.count}}
            </div>

            <div class="order-page-product-count-plus" @click="productCountPlus(index)">+</div>
          </div>

          <div class="order-page-total-product-price">
            {{(product.product.price * product.count) + ",00 ₽"}}
          </div>

          <div class="order-page-delete-product-btn" @click="deleteProduct(index)">Удалить</div>
        </div>

        <div class="order-page-total-products-price">
          {{"Итоговая сумма: " + totalPrice + ",00 ₽"}}
        </div>

      </div>
    </main>

    <default_footer/>
  </div>
</template>

<script>
import style from '/assets/css/order-page.module.css';
import Default_header from "./global/header/default_header";
import Default_footer from "./global/footer/default_footer";
export default {
  components: {Default_footer, Default_header},
  middleware: 'auth',

  data() {
    return {
      Data: [],
      totalPrice: 0
    }
  },

  async mounted() {
    await this.fetchUser()
    await this.getProductsDataForOrderPage()
    await this.calculateTotalPrice()
  },

  computed: {
    styles() {
      return style
    }
  }
}
</script>
