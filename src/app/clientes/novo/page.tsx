'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, MapPin, Phone, Calendar, FileText, User } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { funcionariosMock } from '@/lib/data';
import type { DiaSemana, TipoPlano } from '@/lib/types';

export default function NovoClientePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    diasLimpeza: [] as DiaSemana[],
    tipoPlano: '1x' as TipoPlano,
    funcionarioResponsavel: '',
    observacoes: ''
  });

  const diasSemana: DiaSemana[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const tiposPlano: TipoPlano[] = ['1x', '2x', '3x'];

  const handleDiaToggle = (dia: DiaSemana) => {
    setFormData(prev => ({
      ...prev,
      diasLimpeza: prev.diasLimpeza.includes(dia)
        ? prev.diasLimpeza.filter(d => d !== dia)
        : [...prev.diasLimpeza, dia]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome || !formData.endereco || !formData.telefone || formData.diasLimpeza.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Aqui você adicionaria a lógica para salvar no banco de dados
    console.log('Novo cliente:', formData);
    
    // Simular sucesso e redirecionar
    alert('Cliente cadastrado com sucesso!');
    router.push('/clientes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/clientes"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para clientes
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Novo Cliente
          </h1>
          <p className="text-gray-600">
            Preencha os dados do cliente para cadastro no sistema
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-600" />
                Informações Básicas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: João Silva"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Endereço Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Ex: Rua das Flores, 123 - Jardim Primavera"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funcionário Responsável
                  </label>
                  <select
                    value={formData.funcionarioResponsavel}
                    onChange={(e) => setFormData({ ...formData, funcionarioResponsavel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Não atribuído</option>
                    {funcionariosMock
                      .filter(f => f.perfil === 'funcionario' && f.ativo)
                      .map(func => (
                        <option key={func.id} value={func.id}>
                          {func.nome}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Agendamento */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-600" />
                Agendamento
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Plano *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {tiposPlano.map(plano => (
                      <button
                        key={plano}
                        type="button"
                        onClick={() => setFormData({ ...formData, tipoPlano: plano })}
                        className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                          formData.tipoPlano === plano
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {plano}/semana
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dias da Semana *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {diasSemana.map(dia => (
                      <button
                        key={dia}
                        type="button"
                        onClick={() => handleDiaToggle(dia)}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          formData.diasLimpeza.includes(dia)
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {dia}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selecione os dias em que a limpeza será realizada
                  </p>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-600" />
                Observações
              </h2>
              
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Ex: Portão azul, cachorro no quintal, usar produtos específicos..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Save className="w-5 h-5" />
              Cadastrar Cliente
            </button>
            
            <Link
              href="/clientes"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
