import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

export default {
  install: (app) => {
    const guessedTimezone = dayjs.tz.guess()
    dayjs.tz.setDefault(guessedTimezone)
    const formatDateTime = (time) => {
      if (!time) return
      return dayjs(time).format("DD-MMM-YYYY hh:mm A")
    }

    app.config.globalProperties.$formatDateTime = formatDateTime
    app.provide("formatDateTime", formatDateTime)
  },
}
