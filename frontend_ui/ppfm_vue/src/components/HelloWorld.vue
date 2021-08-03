<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/ministrylogo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('message.greet') }}
        </h1>

        <p class="subheading font-weight-regular">
          {{ $t('message.description.line_1') }}
          <br>{{ $t('message.description.line_2') }}
          <a
            href="https://www.securetech.ae/"
            target="_blank"
          >{{ $t('message.description.link') }}</a>
        </p>
      </v-col>
<!--
      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t('message.links.whats_next.heading') }}
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col> -->
    </v-row>

    <!-- <details-form/> -->
    <project-details-form />
  </v-container>
</template>

<script>
  // import DetailsForm from '../components/DetailsForm.vue'
  import ProjectDetailsForm from '../components/ProjectDetailsForm.vue'

  export default {
    name: 'HelloWorld',

    components: {
      ProjectDetailsForm
      // DetailsForm
    },

    data: function() {
      return {
        whatsNext: [
          {
            text: this.$i18n.t('message.links.whats_next.link_1'),
            href: 'https://vuetifyjs.com/components/api-explorer',
          },
          {
            text: this.$i18n.t('message.links.whats_next.link_2'),
            href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
          },
          {
            text: this.$i18n.t('message.links.whats_next.link_3'),
            href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
          }
        ]
      };
    }
  }
</script>
