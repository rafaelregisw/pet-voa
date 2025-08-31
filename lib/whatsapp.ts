export const WHATSAPP_CONFIG = {
  number: '5562983211122', // +55 (62) 98321-1122 - Número sem traços, parênteses ou espaços
  defaultMessage: 'Olá! Vi o site da Pet Voa e gostaria de saber mais sobre o transporte do meu pet para os EUA. 🐕✈️'
}

export function getWhatsAppLink(customMessage?: string) {
  const message = customMessage || WHATSAPP_CONFIG.defaultMessage
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`
}

export function openWhatsApp(customMessage?: string) {
  const link = getWhatsAppLink(customMessage)
  window.open(link, '_blank')
}