<template>
  <div class="car-list">
    <car-list-item v-for="(item, index) in carList" 
                  :key="index" 
                  :product="item"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CarListItem from './CarListItem'

export default {
  name: "CarList",
  components: {
    CarListItem
  },
  computed: {
    ...mapGetters(['carList'])
  }
}
</script>

<style scoped>
</style>

