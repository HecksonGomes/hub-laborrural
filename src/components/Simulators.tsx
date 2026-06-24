import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users2, 
  Database, 
  Calendar, 
  Landmark, 
  Plus, 
  Trash2, 
  Check, 
  MessageSquare, 
  Send,
  Sparkles,
  DollarSign,
  AlertCircle,
  FileText,
  Clock,
  User,
  ShieldAlert
} from 'lucide-react';

// ==========================================
// 1. DATA INSIGHTS SIMULATOR
// ==========================================
export function DataInsightsSimulator() {
  const [selectedCrop, setSelectedCrop] = useState<'soja' | 'milho' | 'algodao'>('soja');
  
  const cropData = {
    soja: { yield: '4.2 ton/ha', quality: 'A+', moisture: '12%', status: 'Excelente', chart: [65, 72, 78, 85, 92, 98] },
    milho: { yield: '8.5 ton/ha', quality: 'A', moisture: '14%', status: 'Estável', chart: [110, 115, 112, 120, 125, 132] },
    algodao: { yield: '3.8 ton/ha', quality: 'B+', moisture: '9%', status: 'Atenção (Seca)', chart: [45, 42, 40, 48, 52, 55] }
  };

  const activeData = cropData[selectedCrop];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-primary">Painel Analytics - Safra Atual</h3>
          <p className="text-sm text-gray-500 font-sans">Análise preditiva e monitoramento de rendimento em tempo real.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-md self-start md:self-auto">
          {(['soja', 'milho', 'algodao'] as const).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all uppercase tracking-wider ${
                selectedCrop === crop 
                  ? 'bg-deep-forest text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Rendimento Médio</span>
          <span className="text-2xl font-display font-bold text-primary">{activeData.yield}</span>
          <span className="text-xs text-green-600 font-sans block mt-1">↑ 4.2% vs safra anterior</span>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Classificação de Qualidade</span>
          <span className="text-2xl font-display font-bold text-secondary">{activeData.quality}</span>
          <span className="text-xs text-gray-400 font-sans block mt-1">Padronização ABNT</span>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Umidade do Solo</span>
          <span className="text-2xl font-display font-bold text-copper-brown">{activeData.moisture}</span>
          <span className="text-xs text-blue-600 font-sans block mt-1">Zona ideal de colheita</span>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Status Operacional</span>
          <span className={`inline-block px-2 py-0.5 mt-1 text-xs font-semibold rounded-full ${
            selectedCrop === 'algodao' ? 'bg-orange-100 text-safety-orange' : 'bg-green-100 text-green-700'
          }`}>
            {activeData.status}
          </span>
          <span className="text-xs text-gray-400 font-sans block mt-1">Atualizado há 5m</span>
        </div>
      </div>

      {/* Custom dynamic chart */}
      <div className="bg-white p-6 border border-gray-100 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-display font-bold text-primary">Evolução Histórica de Sacas por Hectare</h4>
          <span className="text-xs text-gray-400 font-mono">Últimos 6 meses</span>
        </div>
        <div className="flex items-end justify-between h-48 pt-6 border-b border-gray-100">
          {activeData.chart.map((val, idx) => {
            const max = Math.max(...activeData.chart);
            const pct = (val / max) * 100;
            const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
            return (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="text-xs font-mono font-bold text-deep-forest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
                <div 
                  style={{ height: `${pct * 0.8}%` }} 
                  className="w-8 bg-secondary hover:bg-neon-mint transition-all rounded-t-[2px] cursor-pointer"
                />
                <span className="text-[10px] text-gray-400 font-mono mt-2">{months[idx]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. SALES MANAGER (CRM) SIMULATOR
// ==========================================
interface Lead {
  id: number;
  name: string;
  property: string;
  value: string;
  stage: 'Novo' | 'Proposta' | 'Negociação' | 'Fechado';
  phone: string;
}

export function SalesManagerSimulator() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: 'Fazenda Três Caminhos', property: 'Carlos Eduardo', value: 'R$ 450.000', stage: 'Negociação', phone: '(34) 99123-4455' },
    { id: 2, name: 'Agropecuária Boa Vista', property: 'Mariana Costa', value: 'R$ 1.200.000', stage: 'Proposta', phone: '(16) 98122-3344' },
    { id: 3, name: 'Sítio Recanto Feliz', property: 'José Roberto', value: 'R$ 180.000', stage: 'Novo', phone: '(31) 98788-2233' },
    { id: 4, name: 'Grupo Agrícola Planalto', property: 'Roberto Shmidt', value: 'R$ 2.450.000', stage: 'Fechado', phone: '(62) 99655-1122' }
  ]);

  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadProp, setNewLeadProp] = useState('');
  const [newLeadVal, setNewLeadVal] = useState('');
  const [newLeadStage, setNewLeadStage] = useState<'Novo' | 'Proposta' | 'Negociação' | 'Fechado'>('Novo');

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;
    const item: Lead = {
      id: Date.now(),
      name: newLeadName,
      property: newLeadProp || 'Contatador Geral',
      value: newLeadVal ? `R$ ${newLeadVal}` : 'R$ 0',
      stage: newLeadStage,
      phone: '(11) 99999-8888'
    };
    setLeads([...leads, item]);
    setNewLeadName('');
    setNewLeadProp('');
    setNewLeadVal('');
  };

  const deleteLead = (id: number) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const moveStage = (id: number, nextStage: Lead['stage']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage: nextStage } : l));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-primary">Sales Manager CRM</h3>
          <p className="text-sm text-gray-500 font-sans">Gestão de contatos comerciais, prospecção e fechamento de contratos agrícolas.</p>
        </div>
      </div>

      {/* Lead Form */}
      <form onSubmit={addLead} className="bg-off-white p-4 rounded-md border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Nome do Lead / Fazenda</label>
          <input 
            type="text" 
            placeholder="Fazenda Nova Esperança"
            value={newLeadName}
            onChange={e => setNewLeadName(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Responsável</label>
          <input 
            type="text" 
            placeholder="João de Souza"
            value={newLeadProp}
            onChange={e => setNewLeadProp(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Valor do Negócio (R$)</label>
          <input 
            type="text" 
            placeholder="350.000"
            value={newLeadVal}
            onChange={e => setNewLeadVal(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
          />
        </div>
        <button 
          type="submit" 
          className="bg-deep-forest text-white hover:bg-primary font-mono text-xs font-semibold uppercase tracking-wider py-2.5 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} /> Cadastrar Negócio
        </button>
      </form>

      {/* CRM Pipeline Lanes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['Novo', 'Proposta', 'Negociação', 'Fechado'] as const).map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage);
          const stageTotal = stageLeads.reduce((acc, curr) => {
            const num = parseInt(curr.value.replace(/\D/g, '')) || 0;
            return acc + num;
          }, 0);

          return (
            <div key={stage} className="bg-white p-4 border border-gray-100 rounded-md flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    stage === 'Novo' ? 'bg-blue-400' :
                    stage === 'Proposta' ? 'bg-amber-400' :
                    stage === 'Negociação' ? 'bg-orange-400' : 'bg-green-500'
                  }`} />
                  <h4 className="text-xs font-mono font-bold text-gray-700 uppercase">{stage}</h4>
                </div>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono font-semibold">
                  {stageLeads.length}
                </span>
              </div>

              <div className="text-[10px] text-gray-400 font-mono mb-3">
                Total: R$ {stageTotal.toLocaleString('pt-BR')}
              </div>

              {/* Lane Card list */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="bg-off-white p-3 border border-gray-200 rounded text-xs space-y-2 hover:border-gray-300 transition-all relative group">
                    <button 
                      onClick={() => deleteLead(lead.id)}
                      className="absolute top-2 right-2 text-gray-300 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div>
                      <h5 className="font-display font-bold text-primary leading-tight">{lead.name}</h5>
                      <p className="text-[11px] text-gray-500 font-sans">{lead.property}</p>
                    </div>
                    <div className="font-mono text-[11px] text-secondary font-bold">
                      {lead.value}
                    </div>

                    {/* Quick Move stage buttons */}
                    <div className="flex gap-1 pt-1 border-t border-gray-100 mt-2">
                      {stage !== 'Novo' && (
                        <button 
                          onClick={() => {
                            const stages: Lead['stage'][] = ['Novo', 'Proposta', 'Negociação', 'Fechado'];
                            const idx = stages.indexOf(stage);
                            moveStage(lead.id, stages[idx - 1]);
                          }}
                          className="text-[9px] font-mono text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded px-1 cursor-pointer"
                        >
                          ←
                        </button>
                      )}
                      <span className="flex-1" />
                      {stage !== 'Fechado' && (
                        <button 
                          onClick={() => {
                            const stages: Lead['stage'][] = ['Novo', 'Proposta', 'Negociação', 'Fechado'];
                            const idx = stages.indexOf(stage);
                            moveStage(lead.id, stages[idx + 1]);
                          }}
                          className="text-[9px] font-mono text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded px-1 cursor-pointer"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-24 border border-dashed border-gray-100 rounded text-center p-3">
                    <p className="text-[11px] text-gray-400">Vazio</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 3. TEAM SYNC SIMULATOR
// ==========================================
interface Message {
  id: number;
  user: string;
  role: string;
  text: string;
  time: string;
}

export function TeamSyncSimulator() {
  const [channel, setChannel] = useState<'geral' | 'logistica' | 'colheita'>('geral');
  const [messages, setMessages] = useState<Record<'geral' | 'logistica' | 'colheita', Message[]>>({
    geral: [
      { id: 1, user: 'Eduardo Martins', role: 'Gestor Geral', text: 'Bom dia equipe! Iniciando o planejamento semanal das terras do sul.', time: '08:15' },
      { id: 2, user: 'Aline Souza', role: 'Engenheira Agrônoma', text: 'Já fiz a vistoria na área de plantio da soja. Nível de pragas sob controle.', time: '08:42' },
      { id: 3, user: 'Marcos Silva', role: 'Logística', text: 'Tudo pronto para receber a carga de insumos de tarde.', time: '09:05' }
    ],
    logistica: [
      { id: 1, user: 'Marcos Silva', role: 'Logística', text: 'Caminhões de fertilizantes já saíram da central.', time: '07:30' },
      { id: 2, user: 'Eduardo Martins', role: 'Gestor Geral', text: 'Excelente Marcos. Mantenha-nos informados sobre o tempo estimado de chegada.', time: '07:45' }
    ],
    colheita: [
      { id: 1, user: 'Antônio Reis', role: 'Operador de Máquinas', text: 'Colheitadeira #04 finalizou o talhão 12. Movendo para o talhão 13.', time: '10:00' },
      { id: 2, user: 'Aline Souza', role: 'Engenheira Agrônoma', text: 'Atenção Antônio, verifique a regulagem de umidade antes de iniciar no 13.', time: '10:12' }
    ]
  });

  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      user: 'Você (Heckson Silva)',
      role: 'Administrador',
      text: inputVal,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [channel]: [...messages[channel], newMessage]
    });
    setInputVal('');
  };

  return (
    <div className="p-6 space-y-4 flex flex-col h-[500px]">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-xl font-display font-bold text-primary">Team Sync Comunicação</h3>
        <p className="text-sm text-gray-500 font-sans">Central de mensagens e avisos operacionais de campo.</p>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar Channels */}
        <div className="w-1/4 border-r border-gray-100 pr-4 space-y-1">
          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-2">Canais</span>
          {(['geral', 'logistica', 'colheita'] as const).map(ch => (
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium font-sans flex items-center justify-between transition-colors cursor-pointer ${
                channel === ch 
                  ? 'bg-deep-forest text-white' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span># {ch}</span>
              <span className="text-[9px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-mono group-hover:bg-gray-300">
                {messages[ch].length}
              </span>
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-off-white rounded-md border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-2">
            <MessageSquare size={14} className="text-secondary" />
            <span className="text-xs font-mono font-bold text-primary uppercase">Canal #{channel}</span>
          </div>

          {/* Messages display */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages[channel].map((msg) => {
              const isMe = msg.user.includes('Você');
              return (
                <div key={msg.id} className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto'}`}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-display font-bold text-gray-700">{msg.user}</span>
                    <span className="text-[8px] bg-gray-200 text-gray-500 px-1 rounded uppercase font-mono font-bold">{msg.role}</span>
                    <span className="text-[9px] text-gray-400 font-mono">{msg.time}</span>
                  </div>
                  <div className={`p-3 rounded-md text-xs font-sans ${
                    isMe 
                      ? 'bg-deep-forest text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Send form */}
          <form onSubmit={handleSend} className="bg-white p-3 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder={`Enviar mensagem em #${channel}...`}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-xs font-sans focus:outline-none focus:border-secondary"
            />
            <button 
              type="submit" 
              className="bg-deep-forest hover:bg-primary text-white p-2 rounded transition-all cursor-pointer flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. RESOURCE PLANNER SIMULATOR
// ==========================================
interface ResourceTask {
  id: number;
  equipment: string;
  operator: string;
  task: string;
  progress: number;
  status: 'Em andamento' | 'Concluído' | 'Pausado';
}

export function ResourcePlannerSimulator() {
  const [tasks, setTasks] = useState<ResourceTask[]>([
    { id: 1, equipment: 'Trator Case IH Puma 230', operator: 'Sérgio Nogueira', task: 'Aragem de Solo - Área 4A', progress: 85, status: 'Em andamento' },
    { id: 2, equipment: 'Colheitadeira John Deere S700', operator: 'Antônio Reis', task: 'Colheita de Milho - Pivô Sul', progress: 40, status: 'Em andamento' },
    { id: 3, equipment: 'Pulverizador Autopropelido', operator: 'Lucas Silva', task: 'Aplicação Fungicida - Área 1', progress: 100, status: 'Concluído' },
    { id: 4, equipment: 'Plantadeira Stara', operator: 'Júlio Cesar', task: 'Plantio Algodão - Área 2B', progress: 0, status: 'Pausado' }
  ]);

  const [eq, setEq] = useState('');
  const [op, setOp] = useState('');
  const [tName, setTName] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eq || !tName) return;
    const newTask: ResourceTask = {
      id: Date.now(),
      equipment: eq,
      operator: op || 'Não Alocado',
      task: tName,
      progress: 0,
      status: 'Em andamento'
    };
    setTasks([...tasks, newTask]);
    setEq('');
    setOp('');
    setTName('');
  };

  const handleProgress = (id: number, val: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextProg = Math.min(100, Math.max(0, val));
        return {
          ...t,
          progress: nextProg,
          status: nextProg === 100 ? 'Concluído' : 'Em andamento'
        };
      }
      return t;
    }));
  };

  const setStatus = (id: number, status: ResourceTask['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-primary">Resource Planner</h3>
          <p className="text-sm text-gray-500 font-sans">Controle de frotas agrícolas, alocação de maquinário e operadores de campo.</p>
        </div>
      </div>

      {/* Alocar Task Form */}
      <form onSubmit={addTask} className="bg-off-white p-4 rounded border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Equipamento / Máquina</label>
          <input 
            type="text" 
            placeholder="Trator Case IH"
            value={eq}
            onChange={e => setEq(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Operador Responsável</label>
          <input 
            type="text" 
            placeholder="Marcos Santos"
            value={op}
            onChange={e => setOp(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Atividade / Destino</label>
          <input 
            type="text" 
            placeholder="Aragem Área Leste"
            value={tName}
            onChange={e => setTName(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-deep-forest text-white hover:bg-primary font-mono text-xs font-semibold uppercase tracking-wider py-2.5 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Calendar size={14} /> Alocar Recurso
        </button>
      </form>

      {/* Task List Table */}
      <div className="bg-white border border-gray-100 rounded-md overflow-hidden">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-mono uppercase text-[10px] tracking-wider">
              <th className="px-4 py-3">Equipamento / Operador</th>
              <th className="px-4 py-3">Atividade / Tarefa</th>
              <th className="px-4 py-3">Progresso</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5">
                  <div className="font-display font-bold text-primary">{task.equipment}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{task.operator}</div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="text-gray-700 font-medium">{task.task}</div>
                </td>
                <td className="px-4 py-3.5 w-1/4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          task.status === 'Concluído' ? 'bg-green-500' :
                          task.status === 'Pausado' ? 'bg-amber-400' : 'bg-secondary'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-gray-500 w-8">{task.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    task.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                    task.status === 'Pausado' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right space-x-1.5">
                  {task.status !== 'Concluído' && (
                    <>
                      <button 
                        onClick={() => handleProgress(task.id, task.progress + 15)}
                        className="text-[10px] font-mono bg-gray-100 hover:bg-gray-200 text-primary border border-gray-200 px-2 py-1 rounded cursor-pointer"
                      >
                        +15%
                      </button>
                      <button 
                        onClick={() => setStatus(task.id, task.status === 'Em andamento' ? 'Pausado' : 'Em andamento')}
                        className="text-[10px] font-mono bg-gray-100 hover:bg-gray-200 text-primary border border-gray-200 px-2 py-1 rounded cursor-pointer"
                      >
                        {task.status === 'Em andamento' ? 'Pausar' : 'Retomar'}
                      </button>
                    </>
                  )}
                  {task.status === 'Concluído' && (
                    <span className="text-green-500 font-mono text-[10px] font-bold flex items-center justify-end gap-1">
                      <Check size={12} /> OK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 5. FINANCE HUB SIMULATOR
// ==========================================
interface Transaction {
  id: number;
  desc: string;
  category: string;
  amount: number;
  type: 'receita' | 'despesa';
  date: string;
}

export function FinanceHubSimulator() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, desc: 'Venda de Soja (Sacas 2000)', category: 'Vendas', amount: 312000, type: 'receita', date: '2026-06-20' },
    { id: 2, desc: 'Compra Fertilizante NPK', category: 'Insumos', amount: 84000, type: 'despesa', date: '2026-06-18' },
    { id: 3, desc: 'Diesel para Tratores', category: 'Combustível', amount: 15400, type: 'despesa', date: '2026-06-15' },
    { id: 4, desc: 'Manutenção Preventiva Frota', category: 'Oficina', amount: 8900, type: 'despesa', date: '2026-06-14' },
    { id: 5, desc: 'Financiamento Agrícola BNDES', category: 'Crédito', amount: 150000, type: 'receita', date: '2026-06-10' }
  ]);

  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('Insumos');
  const [val, setVal] = useState('');
  const [tType, setTType] = useState<'receita' | 'despesa'>('despesa');

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !val) return;
    const item: Transaction = {
      id: Date.now(),
      desc,
      category: cat,
      amount: parseFloat(val) || 0,
      type: tType,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([item, ...transactions]);
    setDesc('');
    setVal('');
  };

  const totalReceitas = transactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0);
  const totalDespesas = transactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-primary">Finance Hub</h3>
          <p className="text-sm text-gray-500 font-sans">Fluxo de caixa corporativo, controle de receitas agropecuárias e despesas de safra.</p>
        </div>
      </div>

      {/* Cards Financeiros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Total Receitas</span>
          <span className="text-2xl font-display font-bold text-green-600">R$ {totalReceitas.toLocaleString('pt-BR')}</span>
          <span className="text-xs text-gray-400 font-sans block mt-1">Ganhos no mês atual</span>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Total Despesas</span>
          <span className="text-2xl font-display font-bold text-red-600">R$ {totalDespesas.toLocaleString('pt-BR')}</span>
          <span className="text-xs text-gray-400 font-sans block mt-1">Custo de produção e insumos</span>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-md">
          <span className="text-xs text-gray-400 font-mono block mb-1">Saldo Líquido</span>
          <span className={`text-2xl font-display font-bold ${saldo >= 0 ? 'text-primary' : 'text-red-700'}`}>
            R$ {saldo.toLocaleString('pt-BR')}
          </span>
          <span className="text-xs text-gray-400 font-sans block mt-1">Disponibilidade em conta</span>
        </div>
      </div>

      {/* Cadastrar Lançamento Form */}
      <form onSubmit={addTransaction} className="bg-off-white p-4 rounded border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Descrição do Lançamento</label>
          <input 
            type="text" 
            placeholder="Compra Sementes..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Valor (R$)</label>
          <input 
            type="number" 
            placeholder="25000"
            value={val}
            onChange={e => setVal(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Tipo de Lançamento</label>
          <select 
            value={tType}
            onChange={e => setTType(e.target.value as 'receita' | 'despesa')}
            className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-secondary"
          >
            <option value="despesa">Despesa (Débito)</option>
            <option value="receita">Receita (Crédito)</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="bg-deep-forest text-white hover:bg-primary font-mono text-xs font-semibold uppercase tracking-wider py-2.5 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Landmark size={14} /> Lançar Valor
        </button>
      </form>

      {/* Transactions list */}
      <div className="bg-white border border-gray-100 rounded-md overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Histórico de Lançamentos</span>
          <span className="text-[10px] text-gray-400 font-sans">Atualizado em tempo real</span>
        </div>
        <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
          {transactions.map(t => (
            <div key={t.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-xs font-sans">
              <div>
                <div className="font-display font-bold text-primary">{t.desc}</div>
                <div className="text-[10px] text-gray-400 font-mono mt-0.5">{t.category} • {t.date}</div>
              </div>
              <div className={`font-mono font-bold text-sm ${t.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'receita' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. DEFAULT CUSTOM APP WORKSPACE
// ==========================================
interface CustomAppProps {
  title: string;
  description: string;
  url: string;
  accentColor: string;
}

export function CustomAppSimulator({ title, description, url, accentColor }: CustomAppProps) {
  const isIframeable = url.startsWith('http://') || url.startsWith('https://');
  const isDummyUrl = url.includes('example.com') || url.includes('images.unsplash.com');

  return (
    <div className="p-6 space-y-6 flex flex-col items-center justify-center h-96 text-center">
      <div className="bg-white p-8 rounded border border-gray-100 max-w-lg space-y-4">
        <div className="inline-flex p-4 rounded-full bg-blue-50 text-secondary mb-2">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl font-display font-bold text-primary">{title}</h3>
        <p className="text-xs text-gray-500 font-sans max-w-md">{description}</p>
        
        <div className="p-4 bg-off-white border border-gray-200 rounded text-left font-mono text-[11px] text-gray-600 select-all overflow-x-auto whitespace-nowrap">
          URL Cadastrada: {url}
        </div>

        {isIframeable && !isDummyUrl ? (
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.open(url, '_blank')}
              className="bg-deep-forest hover:bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Abrir em Nova Aba
            </button>
          </div>
        ) : (
          <div className="pt-2 space-y-2">
            <div className="text-xs text-amber-600 font-sans bg-amber-50 rounded border border-amber-200 p-2 text-center flex items-center gap-2 justify-center">
              <ShieldAlert size={14} />
              <span>Esta é uma URL demonstrativa ou interna. Redirecionamento seguro ativado!</span>
            </div>
            <button 
              onClick={() => window.open(url, '_blank')}
              className="bg-deep-forest hover:bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Forçar Redirecionamento Externo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
