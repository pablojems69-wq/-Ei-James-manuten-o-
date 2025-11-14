'use client';

import { Calendar, Users, ClipboardCheck, AlertCircle, TrendingUp, MapPin, Clock, CheckCircle, MessageCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { clientesMock, getDiaSemanaAtual, getClientesPorDia, ordemServicoMock } from '@/lib/data';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { userType, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aguardar montagem e autenticação
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não autenticado, redirecionar para login
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const diaAtual = getDiaSemanaAtual();
  const clientesHoje = getClientesPorDia(diaAtual);
  const clientesAtivos = clientesMock.filter(c => c.statusPagamento === 'ativo').length;
  const clientesAtrasados = clientesMock.filter(c => c.statusPagamento === 'atrasado').length;
  const osAbertas = ordemServicoMock.filter(os => !os.concluida).length;
  const osConcluidas = ordemServicoMock.filter(os => os.concluida).length;

  // Dashboard para ADMINISTRADOR
  if (userType === 'admin') {
    const stats = [
      {
        label: 'Clientes Ativos',
        value: clientesAtivos,
        icon: Users,
        color: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
      },
      {
        label: 'Limpezas Hoje',
        value: clientesHoje.length,
        icon: Calendar,
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
      },
      {
        label: 'OS Concluídas',
        value: osConcluidas,
        icon: ClipboardCheck,
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
      },
      {
        label: 'Pagamentos Atrasados',
        value: clientesAtrasados,
        icon: AlertCircle,
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Hoje é {diaAtual} • {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  Limpezas de Hoje
                </h2>
                <Link
                  href="/clientes"
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Ver todos
                </Link>
              </div>

              {clientesHoje.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhuma limpeza agendada para hoje</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clientesHoje.slice(0, 5).map((cliente) => (
                    <div
                      key={cliente.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{cliente.nome}</h3>
                          <p className="text-sm text-gray-600 mt-1">{cliente.endereco}</p>
                        </div>
                        <span className="bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full">
                          {cliente.tipoPlano}x/sem
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
              
              <div className="space-y-3">
                <Link
                  href="/clientes/novo"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Cadastrar Novo Cliente</p>
                      <p className="text-sm text-cyan-100">Adicione um cliente ao sistema</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/ordens-servico"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Gerenciar Ordens de Serviço</p>
                      <p className="text-sm text-emerald-100">{osAbertas} OS em aberto</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/relatorios"
                  className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Ver Relatórios</p>
                      <p className="text-sm text-indigo-100">Análises e estatísticas</p>
                    </div>
                  </div>
                </Link>
              </div>

              {clientesAtrasados > 0 && (
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900">Atenção!</p>
                      <p className="text-sm text-orange-700 mt-1">
                        {clientesAtrasados} cliente{clientesAtrasados > 1 ? 's' : ''} com pagamento atrasado
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Dashboard para FUNCIONÁRIO
  if (userType === 'funcionario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Meu Dia de Trabalho
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {diaAtual} • {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Stats Funcionário */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Limpezas Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{clientesHoje.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Concluídas</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{clientesHoje.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Clientes do Dia */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              Meus Clientes de Hoje
            </h2>

            {clientesHoje.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhuma limpeza agendada para hoje</p>
                <p className="text-gray-400 text-sm mt-2">Aproveite seu dia de folga! 🎉</p>
              </div>
            ) : (
              <div className="space-y-4">
                {clientesHoje.map((cliente, index) => (
                  <div
                    key={cliente.id}
                    className="border-2 border-gray-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-cyan-100 text-cyan-700 font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{cliente.nome}</h3>
                          <p className="text-gray-600 mt-1">{cliente.endereco}</p>
                          <p className="text-sm text-gray-500 mt-1">{cliente.telefone}</p>
                        </div>
                      </div>
                      <span className="bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full">
                        {cliente.tipoPlano}x/semana
                      </span>
                    </div>

                    {cliente.observacoes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Obs:</strong> {cliente.observacoes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/ordens-servico?cliente=${cliente.id}`}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all text-center"
                      >
                        Iniciar Serviço
                      </Link>
                      <button className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-all">
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Dashboard para CLIENTE
  if (userType === 'cliente') {
    const minhasOS = ordemServicoMock.slice(0, 3);
    const telefoneEmpresa = '5511999999999'; // Número da empresa

    const abrirWhatsApp = () => {
      const mensagem = encodeURIComponent('Olá! Gostaria de falar sobre o serviço de limpeza da minha piscina.');
      const url = `https://wa.me/${telefoneEmpresa}?text=${mensagem}`;
      window.open(url, '_blank');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Bem-vindo!
            </h1>
            <p className="text-gray-600">
              Acompanhe o histórico de limpezas da sua piscina
            </p>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/pagamentos"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <CreditCard className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xl font-bold">Pagamentos</p>
                  <p className="text-emerald-100 text-sm">PIX ou Cartão de Crédito</p>
                </div>
              </div>
            </Link>

            <button
              onClick={abrirWhatsApp}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">WhatsApp</p>
                  <p className="text-green-100 text-sm">Fale conosco agora</p>
                </div>
              </div>
            </button>
          </div>

          {/* Próxima Limpeza */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
            <h2 className="text-xl font-bold mb-4">Próxima Limpeza Agendada</h2>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <p className="text-2xl font-bold">Segunda-feira</p>
                <p className="text-cyan-100">Horário previsto: 09:00 - 10:00</p>
              </div>
            </div>
          </div>

          {/* Histórico Recente */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico de Limpezas</h2>
            
            <div className="space-y-4">
              {minhasOS.map((os) => (
                <div
                  key={os.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {new Date(os.data).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-600">{os.horario}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      os.concluida
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {os.concluida ? 'Concluída' : 'Em andamento'}
                    </span>
                  </div>

                  {os.tarefasRealizadas && os.tarefasRealizadas.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Tarefas realizadas:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {os.tarefasRealizadas.map((tarefa, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            {tarefa}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {os.concluida && (
                    <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                      Ver fotos e detalhes →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
