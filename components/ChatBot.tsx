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
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', phoneCode: '+351' },
  { name: 'Espanha', code: 'ES', flag: '🇪🇸', phoneCode: '+34' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷', phoneCode: '+54' },
  { name: 'México', code: 'MX', flag: '🇲🇽', phoneCode: '+52' },
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Formata no padrão brasileiro
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
    if (numbers.length <= 11) return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
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
      const response = await fetch('https://n8n.uccai.com.br/webhook/pet-voa-bot-site-vendas', {
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
      
      // Simular delay de digitação
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'Desculpe, não consegui processar sua mensagem. Tente novamente!',
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
      {/* Botão do Chat - Canto inferior direito */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-r from-electric to-neon rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform"
      >
        <Bot className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        
        {hasNewMessage && !isOpen && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            1
          </div>
        )}
        
        {/* Tooltip */}
        <span className="absolute right-20 px-3 py-2 bg-midnight text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          💬 Fale com nosso assistente!
        </span>
      </motion.button>

      {/* Janela do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-96 h-[600px] bg-midnight/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-electric/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-electric to-neon p-4 flex items-center justify-between">
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
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isRegistered ? (
              // Formulário de Registro - MELHORADO
              <div className="flex-1 p-6 flex flex-col justify-center bg-gradient-to-b from-midnight/50 to-midnight/80">
                <div className="max-w-sm mx-auto w-full space-y-6">
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
                          placeholder="62 98321-1122"
                          className="flex-1 bg-white/10 text-ice rounded-xl px-4 py-3.5 outline-none focus:bg-white/15 focus:ring-2 focus:ring-electric/30 transition-all placeholder-ice/40"
                        />
                      </div>
                      <p className="text-ice/40 text-xs mt-2 ml-1">
                        Exemplo: {selectedCountry.phoneCode} 62 98321-1122
                      </p>
                    </div>
                    
                    <button
                      onClick={handleRegistration}
                      className="w-full bg-gradient-to-r from-electric to-neon text-white rounded-xl py-4 font-bold hover:scale-[1.02] transition-transform shadow-lg"
                    >
                      Começar Conversa
                    </button>
                  </div>
                  
                  <p className="text-center text-ice/40 text-xs mt-4">
                    Seus dados são salvos apenas no seu navegador
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                          ? 'bg-electric' 
                          : 'bg-gradient-to-r from-electric to-neon'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`max-w-[70%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-electric text-white rounded-tr-none'
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric to-neon flex items-center justify-center">
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

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-white/10 text-ice rounded-full px-4 py-2 outline-none focus:bg-white/20 transition-colors placeholder-ice/50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-10 h-10 bg-gradient-to-r from-electric to-neon rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
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