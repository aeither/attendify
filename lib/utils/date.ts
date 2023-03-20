import { format } from 'date-fns'

const formatDate = (dateString: string) => {
  let formattedDate
  try {
    formattedDate = format(new Date(dateString), 'MMM d, yyyy. h:mm aa')
  } catch (error) {
    const date = new Date(Number(dateString))
    // formattedDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
    formattedDate = format(date, 'MMM d, yyyy. h:mm aa')
  }
  return formattedDate
}

export default formatDate
