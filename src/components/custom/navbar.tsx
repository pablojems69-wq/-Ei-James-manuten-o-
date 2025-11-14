'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ClipboardList, BarChart3, Settings, Menu, X, Droplet, LogOut, Calendar, MessageSquare, CreditCard, MapPin, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth, UserType } from '@/hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userType, logout } = useAuth();

  // Itens de navegação por tipo de usuário
  const getNavItems = (type: UserType) => {
    if (type === 'admin') {
      return [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/clientes', label: 'Clientes', icon: Users },
        { href: '/ordens-servico', label: 'Ordens de Serviço', icon: ClipboardList },
        { href: '/rastreamento', label: 'Rastreamento', icon: MapPin },
        { href: '/relatorios', label: 'Relatórios', icon: BarChart3 },
        { href: '/configuracoes', label: 'Configurações', icon: Settings },
      ];
    } else if (type === 'funcionario') {
      return [
        { href: '/', label: 'Meu Dia', icon: Home },
        { href: '/rotas', label: 'Minhas Rotas', icon: Navigation },
        { href: '/clientes', label: 'Clientes', icon: Users },
        { href: '/ordens-servico', label: 'Minhas OS', icon: ClipboardList },
      ];
    } else if (type === 'cliente') {
      return [
        { href: '/', label: 'Início', icon: Home },
        { href: '/pagamentos', label: 'Pagamentos', icon: CreditCard },
        { href: '/historico', label: 'Histórico', icon: Calendar },
        { href: '/mensagens', label: 'Mensagens', icon: MessageSquare },
      ];
    }
    return [];
  };

  const navItems = getNavItems(userType);

  return (
    <nav className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Droplet className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Ei, James</span>
              <span className="text-xs text-cyan-100 leading-tight">Manutenção</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Botão de Logout */}
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-cyan-700/50 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Botão de Logout Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
