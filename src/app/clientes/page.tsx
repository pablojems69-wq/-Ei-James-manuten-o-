'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, Phone, MapPin, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { clientesMock, getFuncionarioNome } from '@/lib/data';
import type { DiaSemana } from '@/lib/types';

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'ativo' | 'atrasado'>('todos');
  const [filtroDia, setFiltroDia] = useState<DiaSemana | 'todos'>('todos');

  const diasSemana: (DiaSemana | 'todos')[] = ['todos', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const clientesFiltrados = clientesMock.filter(cliente => {
    const matchSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.telefone.includes(searchTerm);
    
    const matchStatus = filtroStatus === 'todos' || cliente.statusPagamento === filtroStatus;
    
    const matchDia = filtroDia === 'todos' || cliente.diasLimpeza.includes(filtroDia);

    return matchSearch && matchStatus && matchDia;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Clientes
            </h1>
            <p className="text-gray-600">
              {clientesFiltrados.length} cliente{clientesFiltrados.length !== 1 ? 's' : ''} encontrado{clientesFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <Link
            href="/clientes/novo"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Novo Cliente
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome, endereço ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Pagamento
              </label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="atrasado">Atrasados</option>
              </select>
            </div>

            {/* Filtro Dia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dia da Semana
              </label>
              <select
                value={filtroDia}
                onChange={(e) => setFiltroDia(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {diasSemana.map(dia => (
                  <option key={dia} value={dia}>
                    {dia === 'todos' ? 'Todos os dias' : dia}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Clientes */}
        {clientesFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou adicione um novo cliente
            </p>
            <Link
              href="/clientes/novo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Adicionar Cliente
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Status Bar */}
                <div className={`h-2 ${
                  cliente.statusPagamento === 'ativo' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600'
                }`} />
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors">
                        {cliente.nome}
                      </h3>
                      <div className="flex items-center gap-2">
                        {cliente.statusPagamento === 'ativo' ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            Atrasado
                          </span>
                        )}
                        <span className="bg-cyan-100 text-cyan-700 text-xs font-medium px-2 py-1 rounded-full">
                          {cliente.tipoPlano}/semana
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{cliente.endereco}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      <span className="text-sm">{cliente.telefone}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {cliente.diasLimpeza.map(dia => (
                          <span key={dia} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {dia}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Observações */}
                  {cliente.observacoes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Obs:</span> {cliente.observacoes}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      Funcionário: <span className="font-medium text-gray-700">
                        {getFuncionarioNome(cliente.funcionarioResponsavel)}
                      </span>
                    </span>
                    <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
