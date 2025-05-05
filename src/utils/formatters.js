export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price)
}

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}