<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Email"
          placeholder="seller@thimbly.io"
          :rules="rules.isRequired"
          v-model="email"
          :disabled="disabled"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {isRequired, isInt} from "@/plugins/validation.js"
  export default {
    computed: {
      email: {
        get() {
          if (this.$store.state.user.email) {
            this.disabled = true
          }
          return this.$store.state.user.email
        },
        set(value) {
          var payload = {
            email: value,
          }
          this.$store.commit("SET_USER", payload)
        },
      },
    },
    data() {
      return {
        rules: {isRequired, isInt},
        disabled: false,
      }
    },
  }
</script>

<style lang="scss" scoped></style>
