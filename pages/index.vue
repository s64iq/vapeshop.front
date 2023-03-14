<template>
  <div class="container">
    <default_header/>

    <main class="main-page-main">
      <div class="main-page-title">
        <div class="main-page-title-page-name">
          Главная
        </div>
        <div class="main-page-title-nav">

        </div>
      </div>

      <div class="main-page-main-new-event-block">

      </div>
    </main>

    <footer/>
  </div>
</template>

<script>
import style from '/assets/css/main-page.module.css';
import footer from '/assets/css/global/footer.module.css';
import Default_header from "./global/header/default_header";
export default {
  components: {Default_header},
  middleware: 'auth',
  data() {
    return {

    }
  },

  methods: {

  },

  async mounted() {
    await this.fetchUser()
    /*await this.updateToken()*/
  },

  computed: {
    styles() {
      return [style, footer]
    }
  }
}

</script>
