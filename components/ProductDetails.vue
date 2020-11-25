<template>
  <div>
    <h4 class="px-2">Product Details</h4>
    <v-row class="d-flex mt-4 justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-text-field
          outlined
          dense
          label="Title"
          placeholder="Beautiful red wool scarf."
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-textarea
          outlined
          dense
          rows="3"
          label="Description"
          placeholder="Beautiful red wool scarf description."
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="4">
        <v-text-field
          outlined
          dense
          label="Price"
          prefix="$"
          placeholder="19.99"
        ></v-text-field>
      </v-col>
      <v-col class="pa-0" cols="4">
        <v-text-field
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
