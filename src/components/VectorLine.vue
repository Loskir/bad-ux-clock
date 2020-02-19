<template>
  <line
    :x1="normalizeX(vector.start.x)"
    :y1="normalizeY(vector.start.y)"
    :x2="normalizeX(vector.end.x)"
    :y2="normalizeY(vector.end.y)"/>
</template>

<script>
  export default {
    name: 'VectorLine',
    props: {
      vector: Object,
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