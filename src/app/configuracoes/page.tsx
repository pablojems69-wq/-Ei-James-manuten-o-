'use client';

import { useState } from 'react';
import { Settings, User, Bell, Lock, Palette, Database, Save, Users, Building } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'perfil' | 'notificacoes' | 'empresa' | 'usuarios'>('perfil');

  const tabs = [
    { id: 'perfil' as const, label: 'Perfil', icon: User },
    { id: 'notificacoes' as const, label: 'Notificações', icon: Bell },
    { id: 'empresa' as const, label: 'Empresa', icon: Building },
    { id: 'usuarios' as const, label: 'Usuários', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Configurações
          </h1>
          <p className="text-gray-600">
            Gerencie as configurações do sistema
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Perfil */}
              {activeTab === 'perfil' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-cyan-600" />
                    Informações do Perfil
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          defaultValue="Administrador"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="admin@eijames.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue="(11) 98765-4321"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cargo
                        </label>
                        <input
                          type="text"
                          defaultValue="Administrador"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-cyan-600" />
                        Alterar Senha
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha Atual
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nova Senha
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        <Save className="w-5 h-5" />
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notificações */}
              {activeTab === 'notificacoes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-cyan-600" />
                    Preferências de Notificações
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Notificações por Email</h3>
                          <p className="text-sm text-gray-600 mt-1">Receba atualizações por email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Notificações Push</h3>
                          <p className="text-sm text-gray-600 mt-1">Receba notificações no navegador</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                          <p className="text-sm text-gray-600 mt-1">Receba mensagens no WhatsApp</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Lembrete de OS Pendentes</h3>
                          <p className="text-sm text-gray-600 mt-1">Notificação diária de ordens em aberto</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Empresa */}
              {activeTab === 'empresa' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building className="w-6 h-6 text-cyan-600" />
                    Informações da Empresa
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Empresa
                        </label>
                        <input
                          type="text"
                          defaultValue="Ei, James Manutenção"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          defaultValue="00.000.000/0001-00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Endereço
                        </label>
                        <input
                          type="text"
                          defaultValue="Rua das Piscinas, 123 - São Paulo, SP"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue="(11) 3000-0000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Corporativo
                        </label>
                        <input
                          type="email"
                          defaultValue="contato@eijames.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        <Save className="w-5 h-5" />
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Usuários */}
              {activeTab === 'usuarios' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-cyan-600" />
                    Gerenciar Usuários
                  </h2>

                  <div className="mb-6">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                      <User className="w-5 h-5" />
                      Adicionar Usuário
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-cyan-100 p-3 rounded-full">
                            <User className="w-6 h-6 text-cyan-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Administrador</h3>
                            <p className="text-sm text-gray-600">admin@eijames.com</p>
                          </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                          Admin
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">João Silva</h3>
                            <p className="text-sm text-gray-600">joao@eijames.com</p>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                          Funcionário
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Maria Santos</h3>
                            <p className="text-sm text-gray-600">maria@eijames.com</p>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                          Funcionário
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
