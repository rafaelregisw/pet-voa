'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Phone, ChevronDown, X, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface UserData {
  name: string
  phone: string
  countryCode: string
}

interface Country {
  name: string
  code: string
  flag: string
  phoneCode: string
}

const countries: Country[] = [
  { name: 'Brasil', code: 'BR', flag: '🇧🇷', phoneCode: '+55' },
  { name: 'Estados Unidos', code: 'US', flag: '🇺🇸', phoneCode: '+1' },
]

export default function ChatPage() {
  const router = useRouter()
  const [isRegistered, setIsRegistered] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Carregar dados salvos
  useEffect(() => {
    const savedUserData = localStorage.getItem('chatUserData')
    const savedMessages = localStorage.getItem('chatMessages')
    
    if (savedUserData) {
      const data = JSON.parse(savedUserData)
      setUserData(data)
      setIsRegistered(true)
    }
    
    if (savedMessages) {
      const msgs = JSON.parse(savedMessages)
      setMessages(msgs.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })))
    } else {
      setMessages([{
        id: '1',
        text: 'Olá! 👋 Sou o assistente da Pet Voa. Para começarmos, preciso de algumas informações suas.',
        sender: 'bot',
        timestamp: new Date()
      }])
    }
  }, [])

  // Salvar mensagens
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    
    if (selectedCountry.code === 'BR') {
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
      if (numbers.length <= 11) return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7)}`
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    } else {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
      if (numbers.length <= 10) return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, phone: formatted })
  }

  const handleRegistration = async () => {
    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    const user = {
      name: formData.name,
      phone: formData.phone,
      countryCode: selectedCountry.code
    }

    setUserData(user)
    localStorage.setItem('chatUserData', JSON.stringify(user))
    setIsRegistered(true)

    // Enviar dados para webhook
    try {
      await fetch('https://n8n.petvoa.com/webhook/agente-2025-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'registration',
          user: {
            name: user.name,
            phone: `${selectedCountry.phoneCode} ${user.phone}`,
            country: selectedCountry.name
          },
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Erro ao registrar:', error)
    }

    // Mensagem de boas-vindas
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Prazer em conhecê-lo(a), ${formData.name}! 😊 Como posso ajudar você hoje?`,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, welcomeMessage])
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Aviso se demorar muito
    const slowWarningTimer = setTimeout(() => {
      console.log('⚠️ Resposta demorando mais que o esperado...')
    }, 3000)

    // Enviar para webhook
    try {
      const startTime = Date.now()
      console.log('🚀 Enviando mensagem para n8n...')
      
      const response = await fetch('https://n8n.petvoa.com/webhook/agente-2025-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'message',
          message: inputValue,
          user: userData,
          timestamp: new Date().toISOString()
        })
      })

      const fetchTime = Date.now() - startTime
      console.log(`⏱️ Tempo de resposta do n8n: ${fetchTime}ms`)

      const data = await response.json()
      console.log('✅ Resposta do n8n:', data)
      
      // Aceitar múltiplos formatos de resposta
      const botReply = data.reply || 
                       data.response || 
                       data.message || 
                       data.text ||
                       data.output ||
                       (typeof data === 'string' ? data : null) ||
                       'Obrigado pela mensagem! Um de nossos especialistas entrará em contato em breve pelo WhatsApp.'
      
      // Resposta instantânea (100ms apenas para animação suave)
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botReply,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 100)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      // Resposta rápida em caso de erro
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Recebi sua mensagem! Nossa equipe entrará em contato em breve pelo WhatsApp. 📱',
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Header Fixo */}
      <div className="shrink-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">Assistente Pet Voa</h3>
            <p className="text-white/80 text-xs">
              {userData ? `Conversando com ${userData.name}` : 'Online agora'}
            </p>
          </div>
        </div>
      </div>

      {!isRegistered ? (
        // Formulário de Registro - Com scroll
        <div className="flex-1 overflow-y-auto p-6">
          <div className="min-h-full flex items-center justify-center">
            <div className="max-w-sm w-full space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo! 👋</h2>
                <p className="text-white/60">Preencha seus dados para começar</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome completo"
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all placeholder-white/40"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    País
                  </label>
                  <button
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 flex items-center justify-between hover:bg-white/20 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCountryDropdown && (
                    <div className="mt-2 bg-slate-800 rounded-xl overflow-hidden">
                      {countries.map(country => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country)
                            setShowCountryDropdown(false)
                            setFormData({ ...formData, phone: '' })
                          }}
                          className="w-full px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-colors text-left"
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-white">{country.name}</span>
                          <span className="text-white/60 ml-auto">{country.phoneCode}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Telefone
                  </label>
                  <div className="flex gap-2">
                    <div className="bg-white/10 rounded-xl px-3 flex items-center">
                      <span className="text-white/60 text-sm">{selectedCountry.phoneCode}</span>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.code === 'BR' ? '11 99999-9999' : '(212) 555-0100'}
                      className="flex-1 bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all placeholder-white/40"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleRegistration}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform"
              >
                Iniciar Conversa
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Container de Mensagens - Scrollável */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '20px'
            }}
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`max-w-[75%] ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-tr-none'
                      : 'bg-white/10 text-white rounded-tl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  </div>
                  <p className="text-xs text-white/40 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Sempre visível */}
          <div className="shrink-0 p-4 border-t border-white/10 bg-black/30 backdrop-blur-md safe-area-bottom">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/10 text-white rounded-full px-4 py-3 outline-none focus:bg-white/20 transition-colors placeholder-white/50"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  borderRadius: '9999px'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}