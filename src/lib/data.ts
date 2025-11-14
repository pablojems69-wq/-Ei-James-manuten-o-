// Dados mock - substituir por Supabase posteriormente
import { Cliente, Funcionario, OrdemServico } from './types';

export const clientesMock: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    endereco: 'Rua das Flores, 123 - Jardim Primavera',
    telefone: '(11) 98765-4321',
    diasLimpeza: ['Segunda', 'Quinta'],
    tipoPlano: '2x',
    observacoes: 'Portão azul, cachorro no quintal',
    funcionarioResponsavel: 'func1',
    statusPagamento: 'ativo',
    dataCadastro: '2024-01-15',
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    id: '2',
    nome: 'Maria Santos',
    endereco: 'Av. Paulista, 1000 - Bela Vista',
    telefone: '(11) 91234-5678',
    diasLimpeza: ['Terça', 'Sexta'],
    tipoPlano: '2x',
    statusPagamento: 'ativo',
    dataCadastro: '2024-02-01',
    latitude: -23.5629,
    longitude: -46.6544
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    endereco: 'Rua dos Pinheiros, 456 - Pinheiros',
    telefone: '(11) 99876-5432',
    diasLimpeza: ['Segunda', 'Quarta', 'Sexta'],
    tipoPlano: '3x',
    observacoes: 'Piscina aquecida, usar produtos específicos',
    funcionarioResponsavel: 'func2',
    statusPagamento: 'ativo',
    dataCadastro: '2024-01-20',
    latitude: -23.5629,
    longitude: -46.6994
  },
  {
    id: '4',
    nome: 'Ana Costa',
    endereco: 'Rua Augusta, 789 - Consolação',
    telefone: '(11) 97654-3210',
    diasLimpeza: ['Quarta'],
    tipoPlano: '1x',
    statusPagamento: 'atrasado',
    dataCadastro: '2024-03-10',
    latitude: -23.5558,
    longitude: -46.6619
  }
];

export const funcionariosMock: Funcionario[] = [
  {
    id: 'func1',
    nome: 'Pedro Almeida',
    email: 'pedro@eijames.com',
    telefone: '(11) 98888-7777',
    perfil: 'funcionario',
    ativo: true
  },
  {
    id: 'func2',
    nome: 'Lucas Ferreira',
    email: 'lucas@eijames.com',
    telefone: '(11) 97777-6666',
    perfil: 'funcionario',
    ativo: true
  },
  {
    id: 'admin1',
    nome: 'Administrador',
    email: 'admin@eijames.com',
    telefone: '(11) 99999-9999',
    perfil: 'administrador',
    ativo: true
  }
];

export const ordemServicoMock: OrdemServico[] = [
  {
    id: 'os1',
    clienteId: '1',
    funcionarioId: 'func1',
    data: '2024-03-18',
    horarioInicio: '08:00',
    horarioFim: '09:30',
    tarefasRealizadas: ['Limpeza do fundo', 'Aspiração', 'Tratamento químico', 'Limpeza do filtro'],
    concluida: true
  },
  {
    id: 'os2',
    clienteId: '2',
    funcionarioId: 'func1',
    data: '2024-03-19',
    horarioInicio: '10:00',
    tarefasRealizadas: ['Limpeza do fundo', 'Aspiração'],
    concluida: false
  }
];

// Funções auxiliares
export const getDiaSemanaAtual = (): string => {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return dias[new Date().getDay()];
};

export const getClientesPorDia = (dia: string): Cliente[] => {
  return clientesMock.filter(cliente => 
    cliente.diasLimpeza.some(d => d === dia)
  );
};

export const getClientesPorFuncionario = (funcionarioId: string): Cliente[] => {
  return clientesMock.filter(cliente => 
    cliente.funcionarioResponsavel === funcionarioId
  );
};

export const getFuncionarioNome = (funcionarioId?: string): string => {
  if (!funcionarioId) return 'Não atribuído';
  const funcionario = funcionariosMock.find(f => f.id === funcionarioId);
  return funcionario?.nome || 'Não atribuído';
};
