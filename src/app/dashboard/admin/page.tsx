'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, Package, DollarSign } from 'lucide-react';

export default function DashboardAdmin() {
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!usuario || usuario.tipo !== 'admin')) {
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-600">Bem-vindo, {usuario.nome}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+4 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Em campo agora</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entregas Hoje</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">87% concluídas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 7.200</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Pagamentos</CardTitle>
              <CardDescription>Status dos pagamentos dos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pagamentos em dia</span>
                  <span className="text-2xl font-bold text-green-600">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pagamentos pendentes</span>
                  <span className="text-2xl font-bold text-yellow-600">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pagamentos atrasados</span>
                  <span className="text-2xl font-bold text-red-600">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimas atualizações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Novo cliente cadastrado</p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Pagamento recebido</p>
                    <p className="text-xs text-muted-foreground">Há 4 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Rota concluída</p>
                    <p className="text-xs text-muted-foreground">Há 6 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
