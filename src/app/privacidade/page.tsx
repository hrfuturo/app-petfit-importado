"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacidadePage() {
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
              Política de Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Informações que Coletamos</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como nome, e-mail e senha quando cria uma conta em nosso aplicativo.
            </p>

            <h2>2. Como Usamos suas Informações</h2>
            <p>
              Usamos suas informações para fornecer, manter e melhorar nossos serviços, processar transações e enviar comunicações relacionadas ao serviço.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem seu consentimento, exceto quando exigido por lei.
            </p>

            <h2>4. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Podemos usar cookies para melhorar sua experiência em nosso aplicativo. Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>

            <h2>6. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir, excluir ou restringir o processamento de suas informações pessoais. Entre em contato conosco para exercer esses direitos.
            </p>

            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através do aplicativo ou por e-mail.
            </p>

            <h2>8. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através do suporte do aplicativo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}