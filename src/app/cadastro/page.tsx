"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "../../utils/supabase"

export default function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: nome
          }
        }
      })

      if (error) {
        setMessage(error.message)
      } else {
        // Insert profile
        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            nome,
            email
          })
        }
        setMessage("Cadastro realizado com sucesso! Verifique seu email.")
        // router.push('/login')
      }
    } catch (error) {
      setMessage("Erro ao fazer cadastro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Cadastro de Comprador
        </h1>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes("sucesso") ? "text-green-600" : "text-red-600"} dark:text-red-400`}>
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <p>Já tem conta? <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Fazer Login</Link></p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}