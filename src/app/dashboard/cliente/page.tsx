'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, CreditCard, QrCode, CheckCircle, Clock } from 'lucide-react';

export default function DashboardCliente() {
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pix');
  const [pixGerado, setPixGerado] = useState(false);
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [cvvCartao, setCvvCartao] = useState('');

  useEffect(() => {
    if (!loading && (!usuario || usuario.tipo !== 'cliente')) {
      router.push('/login');
    }
  }, [usuario, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!usuario) return null;

  const handleGerarPix = () => {
    setPixGerado(true);
    setTimeout(() => setPixGerado(false), 5000);
  };

  const handleCadastrarCartao = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cartão cadastrado com sucesso!');
    setNumeroCartao('');
    setNomeCartao('');
    setValidadeCartao('');
    setCvvCartao('');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Olá, {usuario.nome}!</h1>
            <p className="text-gray-600">Bem-vindo ao seu painel</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status do Pagamento</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Em dia</div>
              <p className="text-xs text-muted-foreground">Vencimento: 15/12/2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensalidade</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 150,00</div>
              <p className="text-xs text-muted-foreground">Próximo vencimento em 10 dias</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formas de Pagamento</CardTitle>
            <CardDescription>Escolha como deseja pagar sua mensalidade</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pix">
                  <QrCode className="w-4 h-4 mr-2" />
                  PIX
                </TabsTrigger>
                <TabsTrigger value="cartao">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Cartão de Crédito
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pix" className="space-y-4 mt-6">
                <div className="text-center space-y-4 py-6">
                  <h3 className="text-lg font-semibold">Pagamento via PIX</h3>
                  <p className="text-sm text-muted-foreground">
                    Gere um código PIX para pagar sua mensalidade de forma rápida e segura
                  </p>
                  
                  {!pixGerado ? (
                    <Button onClick={handleGerarPix} className="w-full max-w-xs" size="lg">
                      <QrCode className="w-5 h-5 mr-2" />
                      Gerar Código PIX
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 max-w-xs mx-auto">
                        <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center rounded">
                          <QrCode className="w-32 h-32 text-gray-400" />
                        </div>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg max-w-md mx-auto">
                        <p className="text-xs font-mono break-all text-center">
                          00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <p className="text-sm font-semibold">
                          Código PIX gerado com sucesso!
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Escaneie o QR Code ou copie o código acima para realizar o pagamento
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cartao" className="space-y-4 mt-6">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-4 text-center">Cadastrar Cartão de Crédito</h3>
                  <form onSubmit={handleCadastrarCartao} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número do Cartão</Label>
                      <Input
                        id="numero"
                        placeholder="0000 0000 0000 0000"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome no Cartão</Label>
                      <Input
                        id="nome"
                        placeholder="NOME COMPLETO"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="validade">Validade</Label>
                        <Input
                          id="validade"
                          placeholder="MM/AA"
                          value={validadeCartao}
                          onChange={(e) => setValidadeCartao(e.target.value)}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvvCartao}
                          onChange={(e) => setCvvCartao(e.target.value)}
                          maxLength={3}
                          type="password"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Cadastrar Cartão
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Seus dados estão seguros e criptografados
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
