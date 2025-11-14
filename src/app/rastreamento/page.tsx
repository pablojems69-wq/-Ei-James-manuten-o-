'use client';

import { useState, useEffect } from 'react';
import { MapPin, Users, Navigation, Clock, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface LocalizacaoFuncionario {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  timestamp: string;
  clienteAtual?: string;
  status: 'ativo' | 'inativo';
}

export default function RastreamentoPage() {
  const { userType, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<LocalizacaoFuncionario[]>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated && userType === 'admin') {
      // Simular dados de funcionários (em produção, viria do backend)
      const dadosMock: LocalizacaoFuncionario[] = [
        {
          id: '1',
          nome: 'João Silva',
          lat: -23.5505,
          lng: -46.6333,
          timestamp: new Date().toISOString(),
          clienteAtual: 'Maria Santos - Rua das Flores, 123',
          status: 'ativo'
        },
        {
          id: '2',
          nome: 'Pedro Costa',
          lat: -23.5489,
          lng: -46.6388,
          timestamp: new Date(Date.now() - 300000).toISOString(),
          clienteAtual: 'Carlos Oliveira - Av. Paulista, 456',
          status: 'ativo'
        }
      ];

      setFuncionarios(dadosMock);

      // Atualizar localizações a cada 30 segundos
      const intervalo = setInterval(() => {
        // Aqui você buscaria do backend
        const localizacaoSalva = localStorage.getItem('funcionario_localizacao');
        if (localizacaoSalva) {
          const loc = JSON.parse(localizacaoSalva);
          setFuncionarios(prev => 
            prev.map(f => 
              f.id === '1' 
                ? { ...f, lat: loc.lat, lng: loc.lng, timestamp: loc.timestamp }
                : f
            )
          );
        }
      }, 30000);

      return () => clearInterval(intervalo);
    }
  }, [loading, isAuthenticated, userType]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Redirecionar se não autenticado ou não for admin
  if (!isAuthenticated || userType !== 'admin') {
    router.push('/login');
    return null;
  }

  const abrirLocalizacaoNoMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const calcularTempoDecorrido = (timestamp: string) => {
    const agora = new Date();
    const dataTimestamp = new Date(timestamp);
    const diferencaMs = agora.getTime() - dataTimestamp.getTime();
    const minutos = Math.floor(diferencaMs / 60000);
    
    if (minutos < 1) return 'Agora mesmo';
    if (minutos === 1) return '1 minuto atrás';
    if (minutos < 60) return `${minutos} minutos atrás`;
    
    const horas = Math.floor(minutos / 60);
    if (horas === 1) return '1 hora atrás';
    return `${horas} horas atrás`;
  };

  const funcionariosAtivos = funcionarios.filter(f => f.status === 'ativo').length;
  const funcionariosInativos = funcionarios.filter(f => f.status === 'inativo').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Rastreamento de Funcionários
          </h1>
          <p className="text-gray-600">
            Acompanhe a localização em tempo real da equipe
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total de Funcionários</p>
                <p className="text-2xl font-bold text-gray-900">{funcionarios.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Em Atividade</p>
                <p className="text-2xl font-bold text-gray-900">{funcionariosAtivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Inativos</p>
                <p className="text-2xl font-bold text-gray-900">{funcionariosInativos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa Simulado e Lista */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa Simulado */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              Mapa de Localização
            </h2>

            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
              {/* Simulação de mapa */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100">
                {funcionarios.map((func, index) => (
                  <div
                    key={func.id}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                      funcionarioSelecionado === func.id
                        ? 'bg-cyan-600 ring-4 ring-cyan-300'
                        : 'bg-emerald-500'
                    }`}
                    style={{
                      left: `${20 + index * 30}%`,
                      top: `${30 + index * 20}%`
                    }}
                    onClick={() => setFuncionarioSelecionado(func.id)}
                  >
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                ))}
              </div>

              <div className="relative z-10 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Visualização de Mapa</p>
                <p className="text-sm text-gray-500 mt-2">
                  Clique nos marcadores para ver detalhes
                </p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Integração Google Maps:</strong> Em produção, este mapa seria substituído pela API do Google Maps com marcadores em tempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Funcionários */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Funcionários em Campo</h2>

            {funcionarios.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum funcionário em campo no momento</p>
              </div>
            ) : (
              <div className="space-y-4">
                {funcionarios.map((func) => (
                  <div
                    key={func.id}
                    className={`border-2 rounded-xl p-5 transition-all cursor-pointer ${
                      funcionarioSelecionado === func.id
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFuncionarioSelecionado(func.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          func.status === 'ativo' ? 'bg-emerald-100' : 'bg-gray-100'
                        }`}>
                          <Users className={`w-6 h-6 ${
                            func.status === 'ativo' ? 'text-emerald-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{func.nome}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              func.status === 'ativo' ? 'bg-emerald-500' : 'bg-gray-400'
                            }`} />
                            <span className="text-sm text-gray-600">
                              {func.status === 'ativo' ? 'Em atividade' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirLocalizacaoNoMaps(func.lat, func.lng);
                        }}
                        className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-all"
                      >
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>

                    {func.clienteAtual && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-600 mb-1">Cliente atual:</p>
                        <p className="text-sm font-medium text-gray-900">{func.clienteAtual}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{calcularTempoDecorrido(func.timestamp)}</span>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {func.lat.toFixed(4)}, {func.lng.toFixed(4)}
                      </div>
                    </div>

                    {func.status === 'ativo' && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button className="flex-1 bg-cyan-100 text-cyan-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-cyan-200 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Ligar
                          </button>
                          <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-all">
                            Mensagem
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Rastreamento Ativo</p>
                <p className="text-sm text-emerald-700">
                  As localizações são atualizadas automaticamente a cada 30 segundos quando os funcionários estão com o app aberto.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Privacidade</p>
                <p className="text-sm text-blue-700">
                  A localização só é compartilhada durante o horário de trabalho e com consentimento do funcionário.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
