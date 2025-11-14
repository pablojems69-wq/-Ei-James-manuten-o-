'use client';

import { useState } from 'react';
import { CreditCard, QrCode, Check, AlertCircle, Calendar, DollarSign, Clock } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function PagamentosPage() {
  const { userType, isAuthenticated } = useAuth();
  const router = useRouter();
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [pixGerado, setPixGerado] = useState(false);
  const [cartaoSalvo, setCartaoSalvo] = useState(false);

  // Dados mockados da mensalidade
  const mensalidade = {
    valor: 150.00,
    vencimento: '10/01/2025',
    status: 'pendente',
    plano: '2x por semana'
  };

  if (!isAuthenticated || userType !== 'cliente') {
    router.push('/login');
    return null;
  }

  const gerarPixCopiaECola = () => {
    setPixGerado(true);
    // Simular código PIX
    const codigoPix = '00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substring(7);
    navigator.clipboard.writeText(codigoPix);
  };

  const salvarCartao = (e: React.FormEvent) => {
    e.preventDefault();
    setCartaoSalvo(true);
    setTimeout(() => {
      alert('Cartão cadastrado com sucesso! O pagamento será processado automaticamente.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Pagamentos
          </h1>
          <p className="text-gray-600">
            Gerencie suas mensalidades e formas de pagamento
          </p>
        </div>

        {/* Resumo da Mensalidade */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Mensalidade Atual</h2>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
              Pendente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-cyan-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-cyan-700 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Valor</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                R$ {mensalidade.valor.toFixed(2)}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Vencimento</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {mensalidade.vencimento}
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-700 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Plano</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {mensalidade.plano}
              </p>
            </div>
          </div>
        </div>

        {/* Seleção de Método de Pagamento */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Escolha a Forma de Pagamento</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setMetodoPagamento('pix')}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                metodoPagamento === 'pix'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  metodoPagamento === 'pix' ? 'bg-cyan-100' : 'bg-gray-100'
                }`}>
                  <QrCode className={`w-6 h-6 ${
                    metodoPagamento === 'pix' ? 'text-cyan-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">PIX</p>
                  <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMetodoPagamento('cartao')}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                metodoPagamento === 'cartao'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  metodoPagamento === 'cartao' ? 'bg-cyan-100' : 'bg-gray-100'
                }`}>
                  <CreditCard className={`w-6 h-6 ${
                    metodoPagamento === 'cartao' ? 'text-cyan-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Cartão de Crédito</p>
                  <p className="text-sm text-gray-600">Débito automático</p>
                </div>
              </div>
            </button>
          </div>

          {/* Formulário PIX */}
          {metodoPagamento === 'pix' && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Pagamento via PIX</h3>
              
              {!pixGerado ? (
                <div className="text-center py-8">
                  <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-10 h-10 text-cyan-600" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Clique no botão abaixo para gerar o código PIX
                  </p>
                  <button
                    onClick={gerarPixCopiaECola}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Gerar Código PIX
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      {/* QR Code simulado */}
                      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code ou copie o código abaixo:</p>
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 text-xs font-mono text-gray-700 break-all">
                      00020126580014br.gov.bcb.pix0136{Math.random().toString(36).substring(7)}
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-900">Código copiado!</p>
                        <p className="text-sm text-emerald-700 mt-1">
                          Cole no app do seu banco para finalizar o pagamento
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800">
                          O pagamento será confirmado automaticamente em até 2 minutos após a transação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formulário Cartão */}
          {metodoPagamento === 'cartao' && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Cadastrar Cartão de Crédito</h3>
              
              {!cartaoSalvo ? (
                <form onSubmit={salvarCartao} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="NOME COMO ESTÁ NO CARTÃO"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent uppercase"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Ao cadastrar seu cartão, você autoriza o débito automático mensal no valor de R$ {mensalidade.valor.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Cadastrar Cartão
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-emerald-900 mb-2">Cartão cadastrado com sucesso!</p>
                    <p className="text-sm text-emerald-700">
                      Suas mensalidades serão debitadas automaticamente todo dia 10
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">•••• •••• •••• 1234</p>
                          <p className="text-sm text-gray-600">Válido até 12/28</p>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Histórico de Pagamentos */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico de Pagamentos</h2>
          
          <div className="space-y-3">
            {[
              { data: '10/12/2024', valor: 150.00, status: 'pago', metodo: 'PIX' },
              { data: '10/11/2024', valor: 150.00, status: 'pago', metodo: 'Cartão' },
              { data: '10/10/2024', valor: 150.00, status: 'pago', metodo: 'PIX' },
            ].map((pagamento, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{pagamento.data}</p>
                  <p className="text-sm text-gray-600">{pagamento.metodo}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">R$ {pagamento.valor.toFixed(2)}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    Pago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
