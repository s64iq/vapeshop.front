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

    <default_footer/>
  </div>
</template>

<script>
import style from '/assets/css/main-page.module.css';
import Default_header from "./global/header/default_header";
import Default_footer from "./global/footer/default_footer";
export default {
  components: {Default_footer, Default_header},
  middleware: 'auth',

  async mounted() {
    await this.fetchUser()
  },

  computed: {
    styles() {
      return style
    }
  }
}
</script>
