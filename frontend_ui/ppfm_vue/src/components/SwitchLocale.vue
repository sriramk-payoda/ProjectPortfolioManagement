<template>
  <v-row align="center">
    <v-col
      class="d-flex"
      cols="12"
      sm="6"
    >
      <v-select
        :items="langs"
        :label="$t('message.toolbar.language')"
        v-model="$i18n.locale"
        @change="onChangeLang($event)"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SwitchLocale',
  data() {
    return { langs: ['en', 'ar'] }
  },
  methods: {
    onChangeLang(selectedLang) {
      this.$vuetify.rtl = (selectedLang == 'ar');
    }
  }
}
</script>

<style lang="scss">
  .row.align-center {
    margin-top: 5px;

    .d-flex.col-12.col-sm-6 {
      padding: 0;

      .v-input {
        .v-input__slot {
          margin: 0;
        }
      }
    }
  }
</style>