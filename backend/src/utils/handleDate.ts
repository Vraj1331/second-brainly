const currentDate = new Date()
const year = currentDate.getFullYear()
let month = currentDate.getMonth() + 1 // Months are 0-indexed, so add 1
let day = currentDate.getDate()

// Add leading zeros if month or day is less than 10
if (month < 10) {
   month = parseInt('0' + month)
}
if (day < 10) {
   day = parseInt('0' + day)
}

export const formattedDate = `${day}-${month}-${year}`
