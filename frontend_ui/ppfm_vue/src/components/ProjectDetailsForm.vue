<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-row class="text-center">
      <v-col cols="12">
        <v-text-field
          v-model="projectName"
          :rules="projectNameRules"
          :counter="50"
          :label="$t('message.project_details_form.project_name')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="businessUnit"
          :label="$t('message.project_details_form.business_unit')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <div class="mb-6 estimated-date-div">{{ $t('message.project_details_form.estimated_start_picker') }} <code>{{ startDateActivePicker || 'None' }}</code></div>
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              :label="$t('message.project_details_form.estimated_start')"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            :active-picker.sync="startDateActivePicker"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12">
        <div class="mb-6 estimated-date-div">{{ $t('message.project_details_form.estimated_end_picker') }} <code>{{ endDateActivePicker || 'None' }}</code></div>
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              :label="$t('message.project_details_form.estimated_end')"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            :active-picker.sync="endDateActivePicker"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="requestorName"
          :label="$t('message.project_details_form.requestor_name')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="businessPriority"
          :items="businessPriorities"
          :label="$t('message.project_details_form.business_priority')"
          required
        ></v-select>
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
    name: "ProjectDetailsForm",
    data: function () {
      return {
        valid: false,
        projectName: '',
        projectNameRules: [
          v => !!v || this.$i18n.t('message.project_details_form.validation_errors.project_name.required'),
          v => v.length <= 10 || this.$i18n.t('message.project_details_form.validation_errors.project_name.invalid')
        ],
        businessUnit: '',
        startDateActivePicker: null,
        endDateActivePicker: null,
        startDate: null,
        endDate: null,
        startMenu: false,
        endMenu: false,
        requestorName: '',
        businessPriority: '',
        businessPriorities: this.$i18n.t('message.project_details_form.business_priorities')
      };
    },
    watch: {
      startMenu (val) {
        val && setTimeout(() => (this.startDateActivePicker = 'YEAR'))
      },
      endMenu (val) {
        val && setTimeout(() => (this.endDateActivePicker = 'YEAR'))
      },
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.projectName = ''
        this.businessUnit = ''
        this.startDate = null
        this.endDate = null
        this.requestorName = ''
        this.businessPriority = ''
        this.$refs.observer.reset()
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>

<style lang="scss">
  .estimated-date-div {
    align-items: center;
  }
</style>