import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('senha', password)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
    }

    // Retornar apenas as informações do usuário logado
    return NextResponse.json({
      user: {
        id: data.id,
        nome: data.nome,
        email: data.email,
        created_at: data.created_at
      }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}