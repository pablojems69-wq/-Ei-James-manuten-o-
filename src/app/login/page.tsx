'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Droplet, User, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de login - em produção, fazer requisição à API
    setTimeout(() => {
      // Determinar tipo de usuário baseado no email
      let tipoUsuario = 'funcionario';
      
      if (email.includes('admin')) {
        tipoUsuario = 'admin';
      } else if (email.includes('cliente')) {
        tipoUsuario = 'cliente';
      }

      // Salvar no localStorage
      localStorage.setItem('userType', tipoUsuario);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');

      // Redirecionar para o dashboard apropriado
      router.push('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4">
            <Droplet className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Ei, James</h1>
          <p className="text-cyan-100 text-lg">Manutenção de Piscinas</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Entrar no Sistema
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Entrando...'
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Usuários de Teste */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Usuários de teste:</p>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="bg-gray-50 p-2 rounded-lg">
                <strong>Admin:</strong> admin@eijames.com
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <strong>Funcionário:</strong> funcionario@eijames.com
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <strong>Cliente:</strong> cliente@eijames.com
              </div>
              <p className="text-center text-gray-400 mt-2">Senha: qualquer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
