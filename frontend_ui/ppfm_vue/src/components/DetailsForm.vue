<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-row class="text-center">
      <v-col cols="12">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="10"
          :label="$t('message.details_form.name')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('message.details_form.email')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="department"
          :items="departments"
          :label="$t('message.details_form.department')"
          required
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          :label="$t('message.details_form.remember_me')"
          type="checkbox"
          required
        ></v-checkbox>
      </v-col>

      <v-col cols="12">
        <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
        >
          {{ $t('message.details_form.buttons.submit') }}
        </v-btn>
        <v-btn @click="clear">
          {{ $t('message.details_form.buttons.clear') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: "DetailsForm",
    data: function () {
      return {
        valid: false,
        name: '',
        nameRules: [
          v => !!v || this.$i18n.t('message.details_form.validation_errors.name.required'),
          v => v.length <= 10 || this.$i18n.t('message.details_form.validation_errors.name.invalid')
        ],
        email: '',
        emailRules: [
          v => !!v || this.$i18n.t('message.details_form.validation_errors.email.required'),
          v => /.+@.+/.test(v) || this.$i18n.t('message.details_form.validation_errors.email.invalid')
        ],
        department: '',
        departments: [
          this.$i18n.t('message.details_form.departments.name_1'),
          this.$i18n.t('message.details_form.departments.name_2'),
          this.$i18n.t('message.details_form.departments.name_3'),
          this.$i18n.t('message.details_form.departments.name_4'),
          this.$i18n.t('message.details_form.departments.name_5')
        ],
        should_remember: false
      };
    },

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>