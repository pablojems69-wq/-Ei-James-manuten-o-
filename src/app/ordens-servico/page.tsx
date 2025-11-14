'use client';

import { useState } from 'react';
import { Search, Plus, Filter, Clock, CheckCircle, XCircle, Calendar, User, MapPin } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { ordemServicoMock, clientesMock, getFuncionarioNome } from '@/lib/data';

export default function OrdensServicoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todas' | 'abertas' | 'concluidas'>('todas');

  const osFiltradas = ordemServicoMock.filter(os => {
    const cliente = clientesMock.find(c => c.id === os.clienteId);
    const matchSearch = cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchStatus = filtroStatus === 'todas' || 
                       (filtroStatus === 'abertas' && !os.concluida) ||
                       (filtroStatus === 'concluidas' && os.concluida);
    return matchSearch && matchStatus;
  });

  const osAbertas = ordemServicoMock.filter(os => !os.concluida).length;
  const osConcluidas = ordemServicoMock.filter(os => os.concluida).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Ordens de Serviço
            </h1>
            <p className="text-gray-600">
              {osAbertas} em aberto • {osConcluidas} concluídas
            </p>
          </div>
          
          <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Plus className="w-5 h-5" />
            Nova OS
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Em Aberto</p>
                <p className="text-2xl font-bold text-gray-900">{osAbertas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{osConcluidas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-gray-900">{ordemServicoMock.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Cliente
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome do cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="todas">Todas</option>
                <option value="abertas">Em Aberto</option>
                <option value="concluidas">Concluídas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de OS */}
        {osFiltradas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma OS encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou crie uma nova ordem de serviço
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {osFiltradas.map((os) => {
              const cliente = clientesMock.find(c => c.id === os.clienteId);
              return (
                <div
                  key={os.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 ${
                    os.concluida 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-600'
                  }`} />
                  
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Info Principal */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            OS #{os.id}
                          </h3>
                          {os.concluida ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Concluída
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full">
                              <Clock className="w-3 h-3" />
                              Em Aberto
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm font-medium">{cliente?.nome}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm">{os.data} às {os.horario}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm">{cliente?.endereco}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm">
                              Func: {getFuncionarioNome(os.funcionarioId)}
                            </span>
                          </div>
                        </div>

                        {/* Tarefas */}
                        {os.tarefasRealizadas && os.tarefasRealizadas.length > 0 && (
                          <div className="mt-4 bg-gray-50 rounded-lg p-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Tarefas realizadas:</p>
                            <div className="flex flex-wrap gap-2">
                              {os.tarefasRealizadas.map((tarefa, idx) => (
                                <span key={idx} className="bg-white text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                                  {tarefa}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Ações */}
                      <div className="flex lg:flex-col gap-2">
                        {!os.concluida && (
                          <button className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                            Concluir
                          </button>
                        )}
                        <button className="flex-1 lg:flex-none border border-cyan-600 text-cyan-600 px-6 py-2 rounded-lg font-medium hover:bg-cyan-50 transition-all duration-300">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
