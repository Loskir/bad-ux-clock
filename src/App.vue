<template>
  <div id="app" :class="darkTheme ? 'black' : 'default'">
    <div class="svg-wrapper">
      <svg class="svg" viewBox="-10 -10 1020 1020">
        <VectorLine v-for="i in 12" :key="i" class="notch" :vector="getNotchVector((i-1)/12 * 2*Math.PI)"/>

        <text class="text" v-for="(n, i) in numbers" :x="getTextPosition(i).normalize().x" :y="getTextPosition(i).normalize().y"
              text-anchor="middle" alignment-baseline="central">
          {{n}}
        </text>

        <VectorLine class="arrow second-arrow" :vector="new Vector(new Point(0, 0), this.secondPoint)"/>
        <VectorLine class="arrow minute-arrow" :vector="new Vector(new Point(0, 0), this.minutePoint)"/>
        <VectorLine class="arrow hour-arrow" :vector="new Vector(new Point(0, 0), this.hourPoint)"/>
        <circle class="center" r="7" cx="500" cy="500"/>
      </svg>
    </div>
    <footer class="footer">
      <span>Made by @GooRoo</span>
      <span><a href="https://github.com/GooRoo/pendulum-clock" target="_blank">GitHub</a></span>
    </footer>

    <div class="theme-switcher">
      <label>
        <input type="checkbox" v-model="darkTheme"/>
        <div class="checkbox__content">
          <div class="checkbox__content-inner">
            <svg class="checkbox__content-inner-svg" v-if="darkTheme" viewBox="0 0 312.812 312.812">
              <path d="M305.2,178.159c-3.2-0.8-6.4,0-9.2,2c-10.4,8.8-22.4,16-35.6,20.8c-12.4,4.8-26,7.2-40.4,7.2c-32.4,0-62-13.2-83.2-34.4
                c-21.2-21.2-34.4-50.8-34.4-83.2c0-13.6,2.4-26.8,6.4-38.8c4.4-12.8,10.8-24.4,19.2-34.4c3.6-4.4,2.8-10.8-1.6-14.4
                c-2.8-2-6-2.8-9.2-2c-34,9.2-63.6,29.6-84.8,56.8c-20.4,26.8-32.4,60-32.4,96c0,43.6,17.6,83.2,46.4,112s68,46.4,112,46.4
                c36.8,0,70.8-12.8,98-34c27.6-21.6,47.6-52.4,56-87.6C314,184.959,310.8,179.359,305.2,178.159z"/>
            </svg>
            <svg class="checkbox__content-inner-svg" v-else viewBox="0 0 45.16 45.16">
                <path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312 S28.816,11.269,22.58,11.269z"/>
                <path d="M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207 v3.531C24.787,6.956,23.798,7.944,22.58,7.944z"/>
                <path d="M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208 v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z"/>
                <path d="M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0 c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z"/>
                <path d="M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121 c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z"/>
                <path d="M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206 h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z"/>
                <path d="M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206 h3.531C6.956,24.786,7.944,23.799,7.944,22.58z"/>
                <path d="M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0 l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z"/>
                <path d="M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0 c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z"/>
              </svg>

          </div>
        </div>
        Toggle
      </label>
    </div>
  </div>
</template>

<script>
  import VectorLine from '@/components/VectorLine.vue'
  import PointCircle from '@/components/Point.vue'

  const clockRadius = 500

  class Point {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
    add(point) {
      return new Point(this.x + point.x, this.y + point.y)
    }
    normalize() {
      return new Point(clockRadius + this.x, clockRadius - this.y)
    }
  }

  class Vector {
    constructor(start, end) {
      this.start = start
      this.end = end
    }
  }

  export default {
    name: 'app',
    components: {
      VectorLine,
      PointCircle,
    },
    data() {
      return {
        clockRadius,
        secondRadius: 380,
        minuteRadius: 370,
        hourRadius: 230,
        centerRadius: 100,
        pointLength: 100,
        slowAnimationDuration: 2000,
        fastAnimationDuration: 500,

        notchOuter: 470,
        notchInner: 420,
        numbersRadius: 500,

        ms: 0,

        darkTheme: false,

        Point,
        Vector,

        numbers: Array.from({length: 30}, (_, i) => i * 2)
          .concat(Array.from({length: 30}, (_, i) => 59 - i * 2)),

        secondAngle: 0,
        minuteAngle: 0,
        hourAngle: 0,
      }
    },
    methods: {
      startInterval() {
        this.updateTime()
      },
      updateTime() {
        const date = new Date()
        this.ms = Date.now() % 86400000 - date.getTimezoneOffset() * 60000

        setTimeout(() => this.updateTime(), 1000 - date.getMilliseconds())
      },
      normalizePosition(pos) {
        let c = this.clockRadius
        return [c + pos[0], c - pos[1]]
      },

      getNotchVector(angle) {
        const ri = this.notchInner
        const ro = this.notchOuter
        return new Vector(
          new Point(ri * Math.sin(angle), ri * Math.cos(angle)),
          new Point(ro * Math.sin(angle), ro * Math.cos(angle)),
        )
      },
      getTextPosition(index) {
        const angle = index/60 * 2*Math.PI
        const r = this.numbersRadius
        return new Point(r * Math.sin(angle), r * Math.cos(angle))
      },

      updateSecondAngle(v) {
        const pi2 = (Math.PI * 2)
        const secondAngleNormalized = (this.secondAngle % pi2 + pi2) % pi2
        const fullTurns = Math.floor(this.secondAngle / pi2)
        if (secondAngleNormalized - v > Math.PI) {
          this.secondAngle = (fullTurns + 1) * pi2 + v
        }
        else if (v - secondAngleNormalized > Math.PI) {
          this.secondAngle = (fullTurns - 1) * pi2 + v
        }
        else {
          this.secondAngle = fullTurns * pi2 + v
        }
      },
      updateMinuteAngle(v) {
        const pi2 = (Math.PI * 2)
        const minuteAngleNormalized = (this.minuteAngle % pi2 + pi2) % pi2
        const fullTurns = Math.floor(this.minuteAngle / pi2)
        if (minuteAngleNormalized - v > Math.PI) {
          this.minuteAngle = (fullTurns + 1) * pi2 + v
        }
        else if (v - minuteAngleNormalized > Math.PI) {
          this.minuteAngle = (fullTurns - 1) * pi2 + v
        }
        else {
          this.minuteAngle = fullTurns * pi2 + v
        }
      },
      updateHourAngle(v) {
        const pi2 = (Math.PI * 2)
        const hourAngleNormalized = (this.hourAngle % pi2 + pi2) % pi2
        const fullTurns = Math.floor(this.hourAngle / pi2)
        if (hourAngleNormalized - v > Math.PI) {
          this.hourAngle = (fullTurns + 1) * pi2 + v
        }
        else if (v - hourAngleNormalized > Math.PI) {
          this.hourAngle = (fullTurns - 1) * pi2 + v
        }
        else {
          this.hourAngle = fullTurns * pi2 + v
        }
      },
    },
    computed: {
      second() {
        return Math.floor(this.ms / 1000 % 60)
      },
      minute() {
        return Math.floor(this.ms / 60000 % 60)
      },
      hour() {
        return Math.floor(this.ms / 3600000 % 24)
      },
      realSecondAngle() {
        return this.numberToIndex[this.second] / 30 * Math.PI
      },
      realMinuteAngle() {
        return this.numberToIndex[this.minute] / 30 * Math.PI
      },
      realHourAngle() {
        return this.numberToIndex[this.hour] / 30 * Math.PI
      },
      secondPoint() {
        let a = this.secondAngleT
        let r = this.secondRadius
        return new Point(r * Math.sin(a), r * Math.cos(a))
      },
      minutePoint() {
        let a = this.minuteAngleT
        let r = this.minuteRadius
        return new Point(r * Math.sin(a), r * Math.cos(a))
      },
      hourPoint() {
        let a = this.hourAngleT
        let r = this.hourRadius
        return new Point(r * Math.sin(a), r * Math.cos(a))
      },
      centerPosition() {
        let c = this.clockRadius
        return [c, c]
      },

      numberToIndex() {
        let o = {}

        this.numbers.forEach((number, i) => {
          o[number] = i
        })

        return o
      },
    },
    tweened: {
      secondAngleT: {
        get() {
          return this.secondAngle
        },
        duration() {
          return 400;
        },
        easing(t) {
          return t * (2 - t);
        }
      },
      minuteAngleT: {
        get() {
          return this.minuteAngle
        },
        duration() {
          return 400;
        },
        easing(t) {
          return t * (2 - t);
        }
      },
      hourAngleT: {
        get() {
          return this.hourAngle
        },
        duration() {
          return 400;
        },
        easing(t) {
          return t * (2 - t);
        }
      }
    },
    watch: {
      realSecondAngle(v) {
        this.updateSecondAngle(v)
      },
      realMinuteAngle(v) {
        this.updateMinuteAngle(v)
      },
      realHourAngle(v) {
        this.updateHourAngle(v)
      },
    },
    mounted() {
      this.updateTime()

      this.secondAngle = this.realSecondAngle
      this.minuteAngle = this.realMinuteAngle
      this.hourAngle = this.realHourAngle
//      setInterval(() => {
//        this.minute++
//      }, 1000)
    }
  }
</script>

<style lang="stylus">
  *
    box-sizing border-box

  body {
    margin: 0;
  }

  #app
    font-family: monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;

    select
      font-family monospace

  a {
    color: #007bff;
    text-decoration: none;
    transition: .2s;

    &:hover {
      color: #0056b3
    }
  }

  .svg-wrapper {
    padding: 50px 30px
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .svg
    max-width: 100%;
    max-height: 100%;

    .clock
      stroke-width 10

    .arrow
      stroke-linecap round

    .hour-arrow
      stroke-width 7
    .minute-arrow
      stroke-width 5
    .second-arrow
      stroke-width 2

    .notch
      stroke-linecap round
      stroke-width 7

    .text
      font-size 18px

    .secondary
      stroke-width 1
      stroke-linecap round

  .footer
    position: absolute;
    z-index: 100;
    width: 100%;
    bottom: 0;
    padding: 15px 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  select
    border none

  .theme-switcher
    position fixed
    right 0
    top 0
    padding 20px
    input[type=checkbox]{
      height: 0;
      width: 0;
      visibility: hidden;
      margin 0
      position absolute
    }

    label
      font-size 0

    .checkbox__content {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #d5d8dd;
      display: block;
      border-radius: 100px;
      position: relative;
    }

    .checkbox__content-inner {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 90px;
      transition: left 0.3s, transform .3s, width .3s;

      display flex
      flex-direction row
      justify-content center
    }

    .checkbox__content-inner-svg
      padding 4px
      width: 30px;
      height: 30px;
      fill #d5d8dd

    input:checked + .checkbox__content
      background: #22252a;

      .checkbox__content-inner {
        background: black;
      }

      .checkbox__content-inner-svg
        fill #22252a

    input:checked + .checkbox__content .checkbox__content-inner {
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }

    .checkbox__content:active .checkbox__content-inner {
      width: 40px;
    }

  .default
    .svg
      .clock
        fill white
        stroke #464f60

      .center
        fill #363636

      .arrow, .notch, .text
        stroke #1f1f1f

      .text
        fill #1f1f1f

      .secondary
        stroke #999999

    .footer
      background white

  .black
    background-color black
    color white

    .svg
      .clock
        stroke #383838

      .center
        fill #fafafa

      .arrow, .notch, .text
        stroke white

      .text
        fill white

      .secondary
        stroke #808080

    .footer
      background black

    select
      color white
      background-color black
</style>
