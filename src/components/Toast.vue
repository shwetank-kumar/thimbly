<template>

<v-snackbar
    v-model="toast.show"
>
    {{ toast.message }}

    
    <v-btn
        color="blue"
        text
        @click="toast.show = false"
    >
        Close
    </v-btn>
</v-snackbar>

</template>

<script>
import {mapGetters, mapMutations} from "vuex"
export default {
    name:'Toast',
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters({toast: "GET_TOAST"}),
    },
    mounted(){
      console.log("mounted")
      console.log(this.toast)
    }
}
</script>
