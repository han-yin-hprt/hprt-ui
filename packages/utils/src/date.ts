type Format = `${string}${`{y}` | `{m}` | `{d}` | `{h}` | `{i}` | `{s}`}${string}` // 通过模板字面量类型确保包含至少一个占位符

/**
 * 将日期转换成 Date 对象
 * @param time
 * @returns
 */
export function format2Date(time: string | Date | number) {
  let date: Date

  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }

  return date
}

/**
 * 时间格式化
 */
export function parseTime(time: string | Date | number, format: Format = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) {
    return null
  }

  const date = format2Date(time)

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    S: date.getMilliseconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisSa])+}/g, (result, key: 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'S' | 'a') => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (key === 'S') {
      return value.toString().padStart(3, '0')
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 格式化时间，返回相对时间（如“刚刚”、“1小时前”），
 * 或者按照指定格式返回具体的时间。
 *
 * @param time - 时间戳或者日期字符串
 * @param format - 可选的时间格式化选项
 * @returns 格式化后的时间字符串
 */
export function formatRelativeTime(time: string | Date | number, format: Format = '{y}年{m}月{d}日 {h}时{i}分') {
  if (typeof time === 'number' && `${time}`.length === 10) {
    time = parseInt(`${time}`) * 1000
  }

  const date = format2Date(time)
  const now = Date.now()

  const diff = (now - date.getTime()) / 1000

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`
  } else if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else {
    return parseTime(time, format)
  }
}

/**
 * 获取给定日期所在周的所有日期
 *
 * @param date - 输入的日期
 * @returns 该日期所在周的所有日期，按从周一到周日的顺序排列
 */
export function getWeekDates(date: string | Date | number): Date[] {
  const inputDate = format2Date(date) // 将输入转换为 Date 对象

  // 获取当前日期是星期几（0 是星期日，1 是星期一，依此类推）
  const dayOfWeek = inputDate.getDay()

  // 获取当前日期距离星期一的天数
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // 处理星期日的情况

  // 获取当前日期所在周的星期一
  const monday = new Date(inputDate)
  monday.setDate(inputDate.getDate() + diffToMonday)

  // 返回所在周的所有日期
  const weekDates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(monday)
    currentDay.setDate(monday.getDate() + i)
    weekDates.push(currentDay)
  }

  return weekDates
}
