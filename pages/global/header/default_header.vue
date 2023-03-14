<template>
  <header>
    <div class="header-top">
      <div class="header-info-panel">
        <div class="header-nav"/>

        <div class="header-auth-panel">
          <div class="header-auth-panel-dropdown">
            <button class="header-auth-panel-dropdown-dropbtn" @click="this.dropdownMenuHandler">
              {{this.$auth.user.username}}
            </button>
            <div class="header-auth-panel-dropdown-content" v-if="dropdownMenu !== false">
              <div class="header-auth-panel-dropdown-content-btn" @click="openUserPage">Профиль</div>
              <div class="header-auth-panel-dropdown-content-btn" @click="logout">Выйти</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-middle">
      <div class="header-logo"/>
      <img class="header-order" src="https://cdn-icons-png.flaticon.com/512/4322/4322403.png" @click="openOrderPage">
    </div>

    <div class="header-bottom">
      <div class="header-category-selector">
        <div class="header-category-selector-button" style="border: 0"
             @click="openMainPage">
          Главная
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;"
             @click="openVapePage">
          Электронные сигареты
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;"
             @click="openLiquidPage">
          Жидкости
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;"
             @click="openModPage">
          Моды
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;"
             @click="openComponentPage">
          Компоненты
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;">
          Контакты
        </div>
        <div class="header-category-selector-button" style="border-bottom: 0;border-top: 0;border-right: 0;">
          О нас
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import header from '/assets/css/global/header.module.css';
export default {
  middleware: 'auth',
  data() {
    return {
      categoryType: this.$router.currentRoute.fullPath.split('/')[2],
      pageId: Number.parseInt(this.$router.currentRoute.fullPath.split('/')[4]),

      dropdownMenu: false
    }
  },

  computed: {
    styles() {
      return [header]
    }
  }
}
</script>
