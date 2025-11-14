'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, MapPin, Package, Clock } from 'lucide-react';

export default function DashboardFuncionario() {
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!usuario || usuario.tipo !== 'funcionario')) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Olá, {usuario.nome}!</h1>
            <p className="text-gray-600">Suas entregas de hoje</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entregas Hoje</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Programadas para hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% do total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Restantes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Entregas</CardTitle>
            <CardDescription>Lista de clientes para visitar hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: 'Maria Santos', endereco: 'Rua das Flores, 123', status: 'pendente' },
                { nome: 'João Silva', endereco: 'Av. Paulista, 1000', status: 'pendente' },
                { nome: 'Ana Costa', endereco: 'Rua Augusta, 500', status: 'concluída' },
                { nome: 'Pedro Oliveira', endereco: 'Rua da Consolação, 250', status: 'pendente' },
              ].map((cliente, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">{cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{cliente.endereco}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cliente.status === 'concluída' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cliente.status === 'concluída' ? 'Concluída' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
