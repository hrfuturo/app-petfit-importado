"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "../../utils/supabase"

interface Purchase {
  id: string
  purchase_date: string
  amount: number
  products: {
    name: string
    description: string
  }
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      fetchPurchases(JSON.parse(storedUser).id)
    } else {
      router.push('/login')
    }
  }, [router])

  const fetchPurchases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          id,
          purchase_date,
          amount,
          products (
            name,
            description
          )
        `)
        .eq('user_id', userId)
        .order('purchase_date', { ascending: false })

      if (error) {
        console.error('Erro ao buscar compras:', error)
      } else {
        setPurchases(data || [])
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user || loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard do Comprador
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Suas Informações</h2>
              <div className="space-y-2">
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Data de Cadastro:</strong> {new Date(user.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Acesso ao Aplicativo</h2>
              <p className="mb-4">Você tem acesso completo ao aplicativo. Use suas credenciais para fazer login no sistema.</p>
              <Link
                href="/login"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 inline-block"
              >
                Acessar Aplicativo
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Suas Compras</h2>
            {purchases.length === 0 ? (
              <p>Você ainda não fez nenhuma compra.</p>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{purchase.products?.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{purchase.products?.description}</p>
                        <p className="text-sm text-gray-500">Comprado em: {new Date(purchase.purchase_date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">R$ {purchase.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link href="/vendas" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 mr-4">
            Ver Produtos
          </Link>
          <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}