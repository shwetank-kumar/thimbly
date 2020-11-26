<template>
  <div>
    <h4 class="px-2">Product Details</h4>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-text-field
          class="pb-4"
          outlined
          dense
          hide-details
          label="Title"
          placeholder="Beautiful red wool scarf."
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-textarea
          class="pb-4"
          outlined
          dense
          hide-details
          rows="2"
          label="Description"
          placeholder="Beautiful red wool scarf description."
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="4">
        <v-text-field
          class="pb-4"
          hide-details
          outlined
          dense
          label="Price"
          prefix="$"
          placeholder="19.99"
        ></v-text-field>
      </v-col>
      <v-col class="pa-0 ma-0" cols="4">
        <v-text-field
          class="pb-4"
          hide-details
          outlined
          dense
          label="Qty"
          placeholder="25"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
