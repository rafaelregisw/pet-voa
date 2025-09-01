'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Phone, ChevronDown, Trash2, RefreshCw } from 'lucide-react'

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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
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
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Carregar dados salvos do localStorage
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
      // Mensagem inicial se não houver histórico
      setMessages([{
        id: '1',
        text: 'Olá! 👋 Sou o assistente da Pet Voa. Para começarmos, preciso de algumas informações suas.',
        sender: 'bot',
        timestamp: new Date()
      }])
    }
  }, [])

  // Salvar mensagens no localStorage sempre que mudarem
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  // Solicitar permissão para notificações
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Detectar quando o usuário sai da página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isOpen && hasNewMessage) {
        if (Notification.permission === 'granted') {
          new Notification('Pet Voa - Nova Mensagem! 🐕', {
            body: 'Você tem uma nova mensagem do assistente.',
            icon: '/favicon.ico',
            tag: 'pet-voa-chat'
          })
        }
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isOpen, hasNewMessage])

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    if (selectedCountry.code === 'BR') {
      // Formato brasileiro: 11 99999-9999
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
      if (numbers.length <= 11) return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7)}`
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    } else {
      // Formato americano: (212) 555-0100
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

  const handleRegistration = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const fullPhone = `${selectedCountry.phoneCode} ${formData.phone}`
    const user = {
      name: formData.name,
      phone: fullPhone,
      countryCode: selectedCountry.phoneCode
    }
    
    setUserData(user)
    setIsRegistered(true)
    localStorage.setItem('chatUserData', JSON.stringify(user))
    
    // Adicionar mensagem de boas-vindas personalizada
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Prazer em conhecê-lo, ${formData.name}! 😊 Como posso ajudar você hoje com o transporte do seu pet?`,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, welcomeMessage])
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || !userData) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Enviar para o webhook do n8n com dados do usuário
      const response = await fetch('https://n8n.petvoa.com/webhook/agente-2025-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          timestamp: new Date().toISOString(),
          userName: userData.name,
          userPhone: userData.phone, // Usando o telefone como chave única
          sessionId: userData.phone.replace(/\D/g, '') // ID único baseado no telefone
        })
      })

      const data = await response.json()
      console.log('Resposta do n8n (ChatBot):', data) // Debug
      
      // Aceitar múltiplos formatos de resposta
      const botReply = data.reply || 
                       data.response || 
                       data.message || 
                       data.text ||
                       (typeof data === 'string' ? data : null) ||
                       'Desculpe, não consegui processar sua mensagem. Tente novamente!'
      
      // Simular delay de digitação
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botReply,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
        setHasNewMessage(true)
      }, 1000)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setIsTyping(false)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Ops! Tive um problema técnico. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    if (confirm('Deseja limpar toda a conversa? Isso não pode ser desfeito.')) {
      localStorage.removeItem('chatMessages')
      setMessages([{
        id: '1',
        text: 'Conversa limpa! Como posso ajudar você?',
        sender: 'bot',
        timestamp: new Date()
      }])
    }
  }

  const resetAll = () => {
    if (confirm('Isso vai apagar todos os seus dados e conversas. Tem certeza?')) {
      localStorage.removeItem('chatUserData')
      localStorage.removeItem('chatMessages')
      setUserData(null)
      setIsRegistered(false)
      setFormData({ name: '', phone: '' })
      setMessages([{
        id: '1',
        text: 'Olá! 👋 Sou o assistente da Pet Voa. Para começarmos, preciso de algumas informações suas.',
        sender: 'bot',
        timestamp: new Date()
      }])
    }
  }

  return (
    <>
      {/* Botão do Chat 3D Moderno */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40">
        {/* Mensagem Chamativa - Apenas Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="hidden md:block absolute -top-16 -left-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap"
        >
          <div className="text-sm font-bold">Oi! 👋 Precisa de ajuda?</div>
          <div className="text-xs opacity-90">Clique para conversar!</div>
          <div className="absolute bottom-[-8px] right-12 w-0 h-0 border-t-[8px] border-t-purple-600 border-x-[8px] border-x-transparent" />
        </motion.div>
        
        {/* Botão Principal 3D */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => {
            // No mobile, abrir em nova aba
            if (isMobile) {
              window.open('/chat', '_blank')
            } else {
              setIsOpen(true)
            }
          }}
          className="relative group"
        >
          {/* Camada de Fundo 3D */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-full blur-lg md:blur-xl opacity-75 group-hover:opacity-100 transition-opacity md:animate-pulse" />
          
          {/* Botão Principal */}
          <motion.div
            animate={{
              rotateY: !isMobile ? [0, 10, 0, -10, 0] : 0,
              rotateX: !isMobile ? [0, 5, 0, -5, 0] : 0,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center md:transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5), inset 0 2px 10px rgba(255,255,255,0.3)'
            }}
          >
            {/* Ícone de Headset Moderno */}
            <div className="relative">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="md:w-10 md:h-10 text-white drop-shadow-lg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                  fill="url(#gradient)"
                  fillOpacity="0.2"
                />
                <path
                  d="M20.5 9V12.5C20.5 14.5 19 16 17 16H16.5V11.5C16.5 10.5 17.5 9.5 18.5 9.5C19.5 9.5 20.5 9 20.5 9Z"
                  fill="white"
                />
                <path
                  d="M3.5 9V12.5C3.5 14.5 5 16 7 16H7.5V11.5C7.5 10.5 6.5 9.5 5.5 9.5C4.5 9.5 3.5 9 3.5 9Z"
                  fill="white"
                />
                <path
                  d="M12 3C8 3 4 6 4 11V16L6 18H9L10 17V11C10 11 10 9 12 9C14 9 14 11 14 11V17L15 18H18L20 16V11C20 6 16 3 12 3Z"
                  fill="white"
                />
                <circle cx="12" cy="19" r="2" fill="white">
                  <animate attributeName="r" values="2;2.5;2" dur="1s" repeatCount="indefinite" />
                </circle>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Anéis Orbitando - Apenas Desktop */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="hidden md:flex absolute inset-0 items-center justify-center"
              >
                <div className="absolute w-24 h-24 border-2 border-white/20 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="hidden md:flex absolute inset-0 items-center justify-center"
              >
                <div className="absolute w-28 h-28 border border-white/10 rounded-full" />
              </motion.div>
            </div>
            
            {/* Badge de Status */}
            <div className="absolute -top-1 -right-1">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white" />
              </span>
            </div>
            
            {/* Notificação de Mensagem */}
            {hasNewMessage && !isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-bounce"
              >
                1
              </motion.div>
            )}
          </motion.div>
          
          {/* Efeito de Hover */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-2xl" />
          </motion.div>
        </motion.button>
        
        {/* Partículas Flutuantes - Apenas Desktop */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="hidden md:block absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: `${20 + i * 20}px`,
              bottom: `${20 + i * 15}px`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Janela do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 z-50 w-full md:w-96 bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-md md:backdrop-blur-xl md:rounded-3xl shadow-2xl border-0 md:border border-white/20 flex flex-col"
            style={{
              height: isMobile ? '100dvh' : '600px'
            }}
          >
            {/* Header */}
            <div className="shrink-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-2">
                {isRegistered && (
                  <>
                    <button
                      onClick={clearChat}
                      className="text-white/60 hover:text-white transition-colors"
                      title="Limpar conversa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={resetAll}
                      className="text-white/60 hover:text-white transition-colors"
                      title="Resetar tudo"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setHasNewMessage(false)
                  }}
                  className="text-white hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
                >
                  <X className="w-6 h-6 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {!isRegistered ? (
              // Formulário de Registro
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-midnight/50 to-midnight/80">
                <div className="min-h-full flex items-center justify-center">
                <div className="max-w-sm w-full space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-ice mb-2">Bem-vindo! 👋</h2>
                    <p className="text-ice/60 text-sm">Preencha seus dados para começar</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="text-ice text-sm font-medium mb-2 block">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Digite seu nome completo"
                        className="w-full bg-white/10 text-ice rounded-xl px-4 py-3.5 outline-none focus:bg-white/15 focus:ring-2 focus:ring-electric/30 transition-all placeholder-ice/40"
                        autoFocus
                      />
                    </div>
                    
                    <div>
                      <label className="text-ice text-sm font-medium mb-2 block">
                        WhatsApp
                      </label>
                      <div className="flex gap-2">
                        {/* Seletor de País */}
                        <div className="relative">
                          <button
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="bg-white/10 text-ice rounded-xl px-3 py-3.5 flex items-center gap-2 hover:bg-white/15 transition-all min-w-[110px]"
                          >
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="text-sm font-medium">{selectedCountry.phoneCode}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {showCountryDropdown && (
                            <div className="absolute top-full mt-2 left-0 bg-midnight border border-electric/20 rounded-xl overflow-hidden z-10 shadow-2xl">
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  onClick={() => {
                                    setSelectedCountry(country)
                                    setShowCountryDropdown(false)
                                  }}
                                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-ice text-left"
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="text-sm font-medium">{country.phoneCode}</span>
                                  <span className="text-xs text-ice/60">{country.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Input do Telefone */}
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder={selectedCountry.code === 'BR' ? '11 99999-9999' : '(212) 555-0100'}
                          className="flex-1 bg-white/10 text-ice rounded-xl px-4 py-3.5 outline-none focus:bg-white/15 focus:ring-2 focus:ring-electric/30 transition-all placeholder-ice/40"
                        />
                      </div>
                      <p className="text-ice/40 text-xs mt-2 ml-1">
                        Exemplo: {selectedCountry.phoneCode} {selectedCountry.code === 'BR' ? '11 99999-9999' : '(212) 555-0100'}
                      </p>
                    </div>
                    
                    <button
                      onClick={handleRegistration}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl py-4 font-bold hover:scale-[1.02] transition-transform shadow-lg"
                    >
                      Começar Conversa
                    </button>
                  </div>
                  
                  <p className="text-center text-ice/40 text-xs mt-4">
                    Seus dados são salvos apenas no seu navegador
                  </p>
                </div>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{
                    WebkitOverflowScrolling: 'touch'
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
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                          : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`max-w-[70%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none'
                          : 'bg-white/10 text-ice rounded-tl-none'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
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
                          <span className="w-2 h-2 bg-ice rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-ice rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-ice rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="shrink-0 p-4 border-t border-white/10 bg-gradient-to-b from-transparent to-black/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-white/10 text-ice rounded-full px-4 py-3 outline-none focus:bg-white/20 transition-colors placeholder-ice/50"
                      style={{ 
                        fontSize: '16px',
                        WebkitAppearance: 'none'
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}