"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "../../utils/supabase"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
}

export default function Vendas() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchProducts()
    checkUser()
  }, [])

  const checkUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        console.error('Error fetching products:', error)
        // Se não houver produtos, inserir alguns de exemplo
        await insertSampleProducts()
        fetchProducts() // Recarregar
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const insertSampleProducts = async () => {
    const sampleProducts = [
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

    for (const product of sampleProducts) {
      await supabase.from('products').insert(product)
    }
  }

  const handlePurchase = async (product: Product) => {
    if (!user) {
      setMessage("Você precisa estar logado para comprar.")
      return
    }

    try {
      const { error } = await supabase.from('purchases').insert({
        user_id: user.id,
        product_id: product.id,
        amount: product.price
      })

      if (error) {
        console.error('Erro ao comprar:', error)
        setMessage("Erro ao processar a compra.")
      } else {
        setMessage(`Compra do "${product.name}" realizada com sucesso!`)
      }
    } catch (error) {
      console.error('Erro:', error)
      setMessage("Erro ao processar a compra.")
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando produtos...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Nossos Aplicativos
        </h1>

        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handlePurchase(product)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={!user}
                  >
                    {user ? "Comprar Agora" : "Faça Login"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!user ? (
            <>
              <p className="mb-4">Para adquirir qualquer aplicativo, faça seu cadastro ou login.</p>
              <div className="space-x-4">
                <Link href="/cadastro" className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">
                  Cadastrar-se
                </Link>
                <Link href="/login" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                  Fazer Login
                </Link>
              </div>
            </>
          ) : (
            <p className="mb-4">Bem-vindo, {user.nome}! Você pode comprar os aplicativos acima.</p>
          )}
          <div className="mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}