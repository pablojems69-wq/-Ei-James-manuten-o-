'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getClientesPorDia, getDiaSemanaAtual } from '@/lib/data';

export default function RotasPage() {
  const { userType, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [localizacaoAtual, setLocalizacaoAtual] = useState<{ lat: number; lng: number } | null>(null);
  const [compartilhandoLocalizacao, setCompartilhandoLocalizacao] = useState(false);

  const diaAtual = getDiaSemanaAtual();
  const clientesHoje = getClientesPorDia(diaAtual);

  useEffect(() => {
    if (!loading && isAuthenticated && userType === 'funcionario') {
      // Solicitar permissão de localização
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocalizacaoAtual({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setCompartilhandoLocalizacao(true);
            
            // Enviar localização para o servidor (simulado)
            enviarLocalizacao(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Erro ao obter localização:', error);
          }
        );

        // Atualizar localização a cada 30 segundos
        const intervalo = setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocalizacaoAtual({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
              enviarLocalizacao(position.coords.latitude, position.coords.longitude);
            }
          );
        }, 30000);

        return () => clearInterval(intervalo);
      }
    }
  }, [loading, isAuthenticated, userType]);

  const enviarLocalizacao = (lat: number, lng: number) => {
    // Aqui você enviaria a localização para o backend
    localStorage.setItem('funcionario_localizacao', JSON.stringify({
      lat,
      lng,
      timestamp: new Date().toISOString()
    }));
  };

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

  // Redirecionar se não autenticado ou não for funcionário
  if (!isAuthenticated || userType !== 'funcionario') {
    router.push('/login');
    return null;
  }

  const abrirNoGoogleMaps = (endereco: string) => {
    const enderecoFormatado = encodeURIComponent(endereco);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${enderecoFormatado}`;
    window.open(url, '_blank');
  };

  const abrirRotaCompleta = () => {
    // Criar waypoints para todos os clientes
    const waypoints = clientesHoje.map(c => encodeURIComponent(c.endereco)).join('|');
    const origem = localizacaoAtual 
      ? `${localizacaoAtual.lat},${localizacaoAtual.lng}`
      : encodeURIComponent(clientesHoje[0]?.endereco || '');
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${encodeURIComponent(clientesHoje[clientesHoje.length - 1]?.endereco || '')}&waypoints=${waypoints}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Minhas Rotas
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {diaAtual} • {clientesHoje.length} cliente{clientesHoje.length !== 1 ? 's' : ''} hoje
          </p>
        </div>

        {/* Status de Localização */}
        <div className={`rounded-2xl shadow-lg p-6 mb-6 ${
          compartilhandoLocalizacao 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              {compartilhandoLocalizacao ? (
                <Navigation className="w-6 h-6 animate-pulse" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="font-bold text-lg">
                {compartilhandoLocalizacao ? 'Localização Ativa' : 'Localização Desativada'}
              </p>
              <p className="text-sm opacity-90">
                {compartilhandoLocalizacao 
                  ? 'O administrador pode ver sua localização em tempo real'
                  : 'Ative a localização para que o administrador possa acompanhar sua rota'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Botão Rota Completa */}
        {clientesHoje.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Rota Otimizada</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Abra a rota completa no Google Maps
                </p>
              </div>
              <button
                onClick={abrirRotaCompleta}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Abrir Rota
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800">
                    A rota será aberta no Google Maps com todos os {clientesHoje.length} endereços otimizados para economizar tempo e combustível.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Clientes com Rotas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Clientes de Hoje</h2>

          {clientesHoje.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nenhum cliente agendado para hoje</p>
              <p className="text-gray-400 text-sm mt-2">Aproveite seu dia de folga! 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientesHoje.map((cliente, index) => (
                <div
                  key={cliente.id}
                  className="border-2 border-gray-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-cyan-100 text-cyan-700 font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{cliente.nome}</h3>
                      <div className="flex items-start gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <p className="text-sm">{cliente.endereco}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <p className="text-sm">{cliente.telefone}</p>
                      </div>
                    </div>
                    <span className="bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full">
                      {cliente.tipoPlano}x/sem
                    </span>
                  </div>

                  {cliente.observacoes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Observação:</strong> {cliente.observacoes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirNoGoogleMaps(cliente.endereco)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-5 h-5" />
                      Abrir no Maps
                    </button>
                    <button className="bg-emerald-100 text-emerald-700 py-3 px-4 rounded-xl font-medium hover:bg-emerald-200 transition-all flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Iniciar
                    </button>
                  </div>

                  {/* Tempo estimado (simulado) */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Tempo estimado: {15 + index * 5} min</span>
                      </div>
                      <div className="text-gray-600">
                        Distância: {(2 + index * 1.5).toFixed(1)} km
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-cyan-900 mb-1">Dica de Navegação</p>
              <p className="text-sm text-cyan-700">
                Clique em "Abrir Rota" para ver todos os clientes em sequência otimizada, ou navegue individualmente clicando em "Abrir no Maps" em cada cliente.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
