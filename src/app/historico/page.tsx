'use client';

import { Calendar, Image as ImageIcon, MessageSquare } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

export default function HistoricoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Histórico de Limpezas
          </h1>
          <p className="text-gray-600">
            Veja todas as limpezas realizadas na sua piscina
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Histórico completo em breve</p>
          </div>
        </div>
      </main>
    </div>
  );
}
