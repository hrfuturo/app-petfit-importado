import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Bem-vindo ao Sistema
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Uma plataforma moderna e segura para gerenciamento de usuários.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Seguro</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sistema de autenticação robusto com criptografia avançada.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Rápido</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Interface otimizada para máxima performance.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Confiável</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dados armazenados de forma segura no Supabase.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
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
    </div>
  )
}