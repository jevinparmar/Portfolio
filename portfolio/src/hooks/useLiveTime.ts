import { useState, useEffect } from 'react'

export function useLiveTime() {
  const [timeString, setTimeString] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      // Format to IST (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const formatter = new Intl.DateTimeFormat('en-US', options)
      setTimeString(formatter.format(now))
    }

    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return timeString || '01:45:00 AM'
}
