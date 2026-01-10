"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Termos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este aplicativo, você aceita e concorda em cumprir os termos e condições descritos nesta página.
            </p>

            <h2>2. Uso do Serviço</h2>
            <p>
              Este aplicativo é fornecido para fins de demonstração e teste. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
            </p>

            <h2>3. Conta do Usuário</h2>
            <p>
              Para usar certas funcionalidades, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de sua senha e conta.
            </p>

            <h2>4. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Consulte nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações.
            </p>

            <h2>5. Limitação de Responsabilidade</h2>
            <p>
              Este aplicativo é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por quaisquer danos decorrentes do uso do aplicativo.
            </p>

            <h2>6. Modificações</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.
            </p>

            <h2>7. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}