'use client';

import { MessageSquare, Send } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

export default function MensagensPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Mensagens
          </h1>
          <p className="text-gray-600">
            Comunicação com a equipe Ei, James
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma mensagem ainda</p>
            <p className="text-gray-400 text-sm mt-2">
              Você receberá notificações quando as limpezas forem concluídas
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
