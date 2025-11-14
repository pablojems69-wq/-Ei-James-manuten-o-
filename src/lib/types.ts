// Tipos do sistema Ei, James Manutenção

export type DiaSemana = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export type TipoPlano = '1x' | '2x' | '3x';

export type StatusPagamento = 'ativo' | 'atrasado' | 'cancelado';

export type PerfilUsuario = 'administrador' | 'funcionario' | 'cliente';

export interface Cliente {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  diasLimpeza: DiaSemana[];
  tipoPlano: TipoPlano;
  observacoes?: string;
  funcionarioResponsavel?: string;
  statusPagamento: StatusPagamento;
  dataCadastro: string;
  latitude?: number;
  longitude?: number;
}

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  perfil: PerfilUsuario;
  ativo: boolean;
}

export interface OrdemServico {
  id: string;
  clienteId: string;
  funcionarioId: string;
  data: string;
  horarioInicio?: string;
  horarioFim?: string;
  tarefasRealizadas: string[];
  fotoAntes?: string[];
  fotoDepois?: string[];
  assinaturaCliente?: string;
  observacoes?: string;
  concluida: boolean;
}

export interface Relatorio {
  mes: string;
  ano: number;
  totalLimpezas: number;
  limpezasPorFuncionario: { [funcionarioId: string]: number };
  limpezasPorCliente: { [clienteId: string]: number };
}
