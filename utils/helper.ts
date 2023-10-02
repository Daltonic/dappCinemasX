import { TruncateParams } from './type.dt'

export const truncate = ({
  text,
  startChars,
  endChars,
  maxLength,
}: TruncateParams): string => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
