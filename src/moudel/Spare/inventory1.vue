<template>
  <div class="page">

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "page",
    data() {
      return {

      }
    },
    components: {

    },
    mounted: function () {
      console.log('99')
      localStorage.removeItem('token')
      this.$router.push('/')


    },
  }

</script>

<style scoped>

</style>
