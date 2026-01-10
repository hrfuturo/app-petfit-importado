import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL:', supabaseUrl)
console.log('Service Key exists:', !!supabaseServiceKey)

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variáveis de ambiente não encontradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('Configurando banco de dados...')

    // Criar tabela profiles se não existir
    console.log('Criando tabela profiles...')
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users(id) PRIMARY KEY,
          nome TEXT,
          email TEXT UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (profilesError) {
      console.error('Erro ao criar profiles:', profilesError)
    } else {
      console.log('Tabela profiles criada/verificada')
    }

    // Criar tabela products
    console.log('Criando tabela products...')
    const { error: productsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (productsError) {
      console.error('Erro ao criar products:', productsError)
    } else {
      console.log('Tabela products criada/verificada')
    }

    // Criar tabela purchases
    console.log('Criando tabela purchases...')
    const { error: purchasesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS purchases (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id),
          product_id UUID REFERENCES products(id),
          purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          amount DECIMAL(10,2) NOT NULL
        );
      `
    })

    if (purchasesError) {
      console.error('Erro ao criar purchases:', purchasesError)
    } else {
      console.log('Tabela purchases criada/verificada')
    }

    // Inserir produtos de exemplo
    console.log('Inserindo produtos de exemplo...')
    const products = [
      {
        name: 'Aplicativo de Gestão Financeira',
        description: 'Gerencie suas finanças pessoais com relatórios detalhados e controle de gastos.',
        price: 49.99,
        image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
      },
      {
        name: 'Sistema de Controle de Estoque',
        description: 'Controle completo do seu estoque com alertas automáticos e relatórios.',
        price: 79.99,
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
      },
      {
        name: 'App de Delivery',
        description: 'Plataforma completa para delivery com integração de pagamentos.',
        price: 99.99,
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
      }
    ]

    for (const product of products) {
      const { error: insertError } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'name' })

      if (insertError) {
        console.error('Erro ao inserir produto:', insertError)
      } else {
        console.log(`Produto "${product.name}" inserido`)
      }
    }

    console.log('Configuração concluída!')

  } catch (error) {
    console.error('Erro geral:', error)
  }
}

setupDatabase()