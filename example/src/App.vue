<script setup>
import HelloWorld from './components/HelloWorld.vue'

import { parseTime, formatRelativeTime, getWeekDates } from '@hprt-ui/utils'

console.log(parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}:{S} 星期{a}'))
console.log(parseTime('2025/01/02', '{y}-{m}-{d}'))
console.log(parseTime('2025-01-02', '{y}/{m}/{d}'))
console.log(parseTime('2025-01-02', '{y}年{m}月{d}日'))

console.log(formatRelativeTime(Date.now() - 1000 * 2))
console.log(formatRelativeTime(Date.now() - 1000 * 60 * 1))
console.log(formatRelativeTime(Date.now() - 1000 * 60 * 60 * 2))
console.log(formatRelativeTime(Date.now() - 1000 * 60 * 60 * 24 * 1))
console.log(formatRelativeTime(Date.now() - 1000 * 60 * 60 * 24 * 3))

console.log(getWeekDates(new Date('2025-02-19')).map((date) => parseTime(date, '{y}-{m}-{d}')))
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

