"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Github, Mail, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function Admin() {
  const [ownerPassword, setOwnerPassword] = useState("")
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])

  // Verificar autenticação proprietário
  const handleOwnerAuth = () => {
    if (ownerPassword === "proprietario2024") {
      setIsOwnerAuthenticated(true)
    } else {
      alert("Senha proprietário incorreta!")
    }
  }

  // Carregar usuários
  const loadUsers = async () => {
    const { data, error } = await supabase.from("usuarios").select("*")
    if (error) {
      console.error("Erro ao carregar usuários:", error)
    } else {
      setUsers(data || [])
    }
  }

  useEffect(() => {
    if (isOwnerAuthenticated) {
      loadUsers()
    }
  }, [isOwnerAuthenticated])

  // Função de cadastro
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .insert([{ email, senha: password, nome: name }])

      if (error) {
        setMessage("Erro ao cadastrar: " + error.message)
      } else {
        setMessage("Usuário cadastrado com sucesso!")
        setEmail("")
        setPassword("")
        setName("")
        loadUsers() // Recarregar lista
      }
    } catch (error) {
      setMessage("Erro inesperado: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Função de login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .eq("senha", password)
        .single()

      if (error || !data) {
        setMessage("Email ou senha incorretos")
      } else {
        setMessage(`Bem-vindo, ${data.nome}!`)
      }
    } catch (error) {
      setMessage("Erro ao fazer login: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOwnerAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Acesso Restrito - Proprietário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="owner-password">Senha do Proprietário</Label>
                <Input
                  id="owner-password"
                  type="password"
                  placeholder="Digite a senha proprietário"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleOwnerAuth} className="w-full">
                Acessar Painel Admin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de Login/Cadastro */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
              Sistema de Cadastro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Cadastro</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {message && (
              <Alert className="mt-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {/* Botões de Login Social */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Usuários */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Usuários Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-center text-muted-foreground">Nenhum usuário cadastrado ainda.</p>
            ) : (
              <div className="space-y-3">
                {users.map((user: any) => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <User className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
        Ao continuar, você concorda com nossos{" "}
        <Link href="/termos" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Termos de Uso
        </Link>{" "}
        e{" "}
        <Link href="/privacidade" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Política de Privacidade
        </Link>
      </p>
    </div>
  )
}