import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
export const convertToDay = (day: string): string => {
  const dayDuration = dayjs.duration(day)
  console.log(dayDuration.asDays()) // In ra số ngày
  console.log(dayDuration.asHours()) // In ra số giờ (tương đương với 360 ngày)
  return dayDuration.toISOString()
}
