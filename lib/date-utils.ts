export function addBusinessDays(date: Date, daysToAdd: number): Date {
  let currentDate = new Date(date)
  while (daysToAdd > 0) {
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    // Pular fins de semana
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      daysToAdd--
    }
  }
  return currentDate
}
