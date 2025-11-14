'use client';

import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { clientesMock, ordemServicoMock, funcionariosMock } from '@/lib/data';

export default function RelatoriosPage() {
  const totalClientes = clientesMock.length;
  const clientesAtivos = clientesMock.filter(c => c.statusPagamento === 'ativo').length;
  const clientesAtrasados = clientesMock.filter(c => c.statusPagamento === 'atrasado').length;
  const totalOS = ordemServicoMock.length;
  const osConcluidas = ordemServicoMock.filter(os => os.concluida).length;

  // Estatísticas por funcionário
  const estatisticasFuncionarios = funcionariosMock.map(func => {
    const osDoFuncionario = ordemServicoMock.filter(os => os.funcionarioId === func.id);
    const osConcluidas = osDoFuncionario.filter(os => os.concluida).length;
    return {
      nome: func.nome,
      totalOS: osDoFuncionario.length,
      concluidas: osConcluidas,
      taxa: osDoFuncionario.length > 0 ? Math.round((osConcluidas / osDoFuncionario.length) * 100) : 0
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Relatórios
            </h1>
            <p className="text-gray-600">
              Análises e estatísticas do mês
            </p>
          </div>
          
          <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total de Clientes</p>
            <p className="text-3xl font-bold text-gray-900">{totalClientes}</p>
            <p className="text-sm text-emerald-600 mt-2">
              {clientesAtivos} ativos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">OS Concluídas</p>
            <p className="text-3xl font-bold text-gray-900">{osConcluidas}</p>
            <p className="text-sm text-gray-500 mt-2">
              de {totalOS} total
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Pagamentos Atrasados</p>
            <p className="text-3xl font-bold text-gray-900">{clientesAtrasados}</p>
            <p className="text-sm text-orange-600 mt-2">
              Requer atenção
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Taxa de Conclusão</p>
            <p className="text-3xl font-bold text-gray-900">
              {totalOS > 0 ? Math.round((osConcluidas / totalOS) * 100) : 0}%
            </p>
            <p className="text-sm text-emerald-600 mt-2">
              Excelente desempenho
            </p>
          </div>
        </div>

        {/* Desempenho por Funcionário */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-600" />
            Desempenho por Funcionário
          </h2>
          
          <div className="space-y-4">
            {estatisticasFuncionarios.map((func, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{func.nome}</h3>
                    <p className="text-sm text-gray-600">
                      {func.concluidas} de {func.totalOS} OS concluídas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-600">{func.taxa}%</p>
                    <p className="text-xs text-gray-500">Taxa de conclusão</p>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${func.taxa}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráficos e Análises */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribuição de Clientes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Distribuição de Clientes
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Clientes Ativos</span>
                  <span className="text-sm font-bold text-emerald-600">{clientesAtivos}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                    style={{ width: `${(clientesAtivos / totalClientes) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Pagamentos Atrasados</span>
                  <span className="text-sm font-bold text-orange-600">{clientesAtrasados}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full"
                    style={{ width: `${(clientesAtrasados / totalClientes) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status das OS */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Status das Ordens de Serviço
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Concluídas</span>
                  <span className="text-sm font-bold text-emerald-600">{osConcluidas}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                    style={{ width: `${(osConcluidas / totalOS) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Em Aberto</span>
                  <span className="text-sm font-bold text-orange-600">{totalOS - osConcluidas}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full"
                    style={{ width: `${((totalOS - osConcluidas) / totalOS) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
