<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="PPfM Logo"
          class="shrink mr-2"
          contain
          src="https://photo.szgmc.ae/public/img/ministrylogo.png"
          transition="scale-transition"
          width="40"
        />

        PPfM
        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <switch-locale/>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">{{ $t('message.toolbar.latest_release') }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SwitchLocale from './components/SwitchLocale.vue';

export default {
  name: 'App',

  components: {
    SwitchLocale
  },

  data: () => ({
    //
  }),
};
</script>
