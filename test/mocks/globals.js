import { vi } from "vitest"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import advancedFormat from "dayjs/plugin/advancedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
}

vi.stubGlobal("Worker", Worker)

vi.stubGlobal("URL", { createObjectURL: vi.fn() })
