# 🐕✈️ Pet Voa - Transporte Premium de Pets para os EUA

Site moderno e responsivo para empresa de transporte internacional de pets, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Redis.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Redis](https://img.shields.io/badge/Redis-7-red)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)

## ✨ Features

- 🎨 **Design Moderno**: Glassmorphism, animações suaves com Framer Motion
- 🐶 **Mascotes Animados**: SVG personalizados de cachorro e gato
- 📱 **100% Responsivo**: Otimizado para todos dispositivos
- 💬 **WhatsApp Integration**: CTAs conectados diretamente ao WhatsApp
- 🚀 **Performance**: Redis cache, rate limiting, otimizações Next.js
- 🐳 **Docker Ready**: Configurado para deploy com Docker/Coolify
- 📊 **Analytics**: Tracking de visualizações e formulários

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animações**: Framer Motion
- **Cache/DB**: Redis (ioredis)
- **Deploy**: Docker, Vercel/Coolify ready
- **Icons**: Lucide React

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- Docker (opcional, para Redis)
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rafaelregis95/pet-voa.git
cd pet-voa

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# (Opcional) Inicie o Redis com Docker
docker-compose up -d redis

# Rode o projeto
npm run dev
```

Acesse http://localhost:3000

## 🐳 Docker

### Development
```bash
docker-compose up -d
```

### Production Build
```bash
docker build -t pet-voa .
docker run -p 3000:3000 pet-voa
```

## 📁 Estrutura do Projeto

```
pet-voa/
├── app/
│   ├── api/          # API Routes (stats, contact)
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # React components
│   ├── Hero.tsx      # Hero section
│   ├── PetMascot.tsx # SVG Dog mascot
│   ├── CatMascot.tsx # SVG Cat mascot
│   └── ...
├── lib/
│   ├── redis.ts      # Redis client & utilities
│   └── whatsapp.ts   # WhatsApp integration
├── hooks/            # Custom React hooks
├── public/           # Static assets
└── docker-compose.yml
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Redis
REDIS_URL=redis://localhost:6379

# WhatsApp (opcional customizar)
NEXT_PUBLIC_WHATSAPP_NUMBER=5562983211122
```

## 📱 Componentes Principais

- **Hero**: Seção principal com mascotes animados
- **VideoSection**: Showcase de vídeo do YouTube
- **Process**: Timeline do processo de transporte
- **Services**: Grid de serviços oferecidos
- **Testimonials**: Carousel de depoimentos
- **FAQ**: Accordion com perguntas frequentes
- **WhatsAppButton**: Botão flutuante do WhatsApp

## 🚀 Deploy

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rafaelregis95/pet-voa)

### Coolify
1. Configure Redis como serviço separado
2. Use o Dockerfile incluído
3. Configure REDIS_URL nas envs

## 📊 Redis Features

- **Cache**: Respostas de API com TTL configurável
- **Rate Limiting**: Proteção contra spam (5 req/min)
- **Analytics**: Contadores de page views
- **Sessions**: Armazenamento de sessões

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Rafael Regis**
- GitHub: [@rafaelregis95](https://github.com/rafaelregis95)

## 🌟 Show your support

Dê uma ⭐️ se este projeto te ajudou!

---

Desenvolvido com ❤️ e ☕ por Rafael Regis