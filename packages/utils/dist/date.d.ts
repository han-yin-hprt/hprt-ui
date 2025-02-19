type Format = `${string}${`{y}` | `{m}` | `{d}` | `{h}` | `{i}` | `{s}`}${string}`;
/**
 * 将日期转换成 Date 对象
 * @param time
 * @returns
 */
export declare function format2Date(time: string | Date | number): Date;
/**
 * 时间格式化
 */
export declare function parseTime(time: string | Date | number, format?: Format): string;
/**
 * 格式化时间，返回相对时间（如“刚刚”、“1小时前”），
 * 或者按照指定格式返回具体的时间。
 *
 * @param time - 时间戳或者日期字符串
 * @param format - 可选的时间格式化选项
 * @returns 格式化后的时间字符串
 */
export declare function formatRelativeTime(time: string | Date | number, format?: Format): string;
/**
 * 获取给定日期所在周的所有日期
 *
 * @param date - 输入的日期
 * @returns 该日期所在周的所有日期，按从周一到周日的顺序排列
 */
export declare function getWeekDates(date: string | Date | number): Date[];
export {};
