---
outline: deep
---

# 日期相关方法

## parseTime (time, format)

日期格式化

### 参数

| 参数   | 类型                 | 描述                                     |
| ------ | -------------------- | ---------------------------------------- |
| time   | Number\|String\|Date | 要格式化的时间，支持字符串、时间戳、Date |
| format | String               | 格式，默认值为 '{y}-{m}-{d} {h}:{i}:{s}' |

- format：{y}年、{m}月、{d}日、{h}时、{i}分、{s}秒、{S}毫秒、{a}星期

### 返回值

| 类型   | 描述           |
| ------ | -------------- |
| String | 格式化后的日期 |

### 使用示例

```vue
<script setup>
import { parseTime } from '@hprt-ui/utils'

parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}:{S} 星期{a}') // 2025-02-19 13:36:19:830 星期三
parseTime('2025/01/02', '{y}-{m}-{d}') // 2025-01-02
parseTime('2025-01-02', '{y}/{m}/{d}') // 2025/01/02
parseTime('2025-01-02', '{y}年{m}月{d}日') // 2025年01月02日
</script>
```

## formatRelativeTime (time, format)

格式化时间，返回相对时间（如“刚刚”、“1 小时前”）,大于两天按照指定格式返回具体的时间。

### 参数

| 参数   | 类型                 | 描述                                        |
| ------ | -------------------- | ------------------------------------------- |
| time   | Number\|String\|Date | 要格式化的时间，支持字符串、时间戳、Date    |
| format | String               | 格式，默认值为 '{y}年{m}月{d}日 {h}时{i}分' |

### 返回值

| 类型   | 描述     |
| ------ | -------- |
| String | 相对时间 |

| 时间                      | 返回值               |
| ------------------------- | -------------------- |
| 时间间隔 <1 分钟          | 刚刚                 |
| 1 分钟 ≤ 时间间隔 <1 小时 | x 分钟前             |
| 1 小时 ≤ 时间间隔 <1 天   | x 小时前             |
| 1 天 ≤ 时间间隔 <2 天     | 1 天前               |
| 2 天 ≤ 时间间隔           | 按 format 格式化展示 |

### 使用示例

```vue
<script setup>
import { formatRelativeTime } from '@hprt-ui/utils'

formatRelativeTime(Date.now() - 1000 * 2) // 刚刚
formatRelativeTime(Date.now() - 1000 * 60 * 1) // 1分钟前
formatRelativeTime(Date.now() - 1000 * 60 * 60 * 2) // 2小时前
formatRelativeTime(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1天前
formatRelativeTime(Date.now() - 1000 * 60 * 60 * 24 * 3) // 2025年02月16日 14时25分
</script>
```

## getWeekDates (date)

获取给定日期所在周的所有日期，通常配合 `parseTime` 使用

### 参数

| 参数 | 类型                 | 描述                               |
| ---- | -------------------- | ---------------------------------- |
| date | Number\|String\|Date | 指定日期，支持字符串、时间戳、Date |

### 返回值

| 类型          | 描述                     |
| ------------- | ------------------------ |
| Array\<Date\> | 指定日期所在周的日期数组 |

### 使用示例

```vue
<script setup>
import { getWeekDates, parseTime } from '@hprt-ui/utils'

getWeekDates(new Date('2025-02-19')).map((date) => parseTime(date, '{y}-{m}-{d}'))
// [
//     "2025-02-17",
//     "2025-02-18",
//     "2025-02-19",
//     "2025-02-20",
//     "2025-02-21",
//     "2025-02-22",
//     "2025-02-23"
// ]
</script>
```

