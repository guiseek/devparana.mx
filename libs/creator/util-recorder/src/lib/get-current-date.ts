export const getCurrentDate = () => {
  const date = Intl.DateTimeFormat('pt-BR').format(new Date())
  return date.replace(new RegExp('/', 'g'), '-')
}
