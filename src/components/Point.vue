<template>
  <circle class="center" r="3" :cx="normalizeX(point.x)" :cy="normalizeY(point.y)"/>
</template>

<script>
  export default {
    name: 'Point',
    props: {
      point: Object,
    },
    data: () => ({
      clockRadius: 500,
      secondRadius: 300,
      minuteRadius: 200,
      hourRadius: 100,
    }),
    methods: {
      normalizeX(x) {
        return this.clockRadius+x
      },
      normalizeY(y) {
        return this.clockRadius-y
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>