import { NextResponse } from 'next/server'
import { rateLimiter, incrementCounter, cacheWrapper } from '@/lib/redis'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, petType, message } = body
    
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'
    
    // Rate limit: 5 requests per minute per IP
    const { allowed, remaining } = await rateLimiter(
      `contact:${ip}`,
      5,
      60
    )
    
    if (!allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          remaining 
        },
        { status: 429 }
      )
    }
    
    // Validate input
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      )
    }
    
    // Here you would normally save to database or send email
    // For now, we'll just track it in Redis
    await incrementCounter('total_contacts')
    await incrementCounter(`contacts:${petType || 'unknown'}`)
    
    // Store contact info temporarily (you can process this later)
    const contactId = `contact:${Date.now()}`
    const contactData = {
      name,
      phone,
      petType,
      message,
      ip,
      timestamp: new Date().toISOString()
    }
    
    // Cache contact for 24 hours for processing
    await cacheWrapper(
      contactId,
      async () => contactData,
      86400
    )
    
    return NextResponse.json({
      success: true,
      message: 'Contact received successfully! We will get back to you soon.',
      remaining,
      contactId
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process contact' },
      { status: 500 }
    )
  }
}

// Get contact stats (protected endpoint - add auth in production)
export async function GET(request: Request) {
  try {
    const stats = await cacheWrapper(
      'contact_stats',
      async () => {
        const total = await incrementCounter('total_contacts')
        const dogs = await incrementCounter('contacts:dog')
        const cats = await incrementCounter('contacts:cat')
        const others = await incrementCounter('contacts:unknown')
        
        return {
          total,
          byPetType: {
            dogs,
            cats,
            others
          },
          timestamp: new Date().toISOString()
        }
      },
      600 // Cache for 10 minutes
    )
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting contact stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}