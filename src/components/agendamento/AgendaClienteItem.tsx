import { Agendamento, AgendaUtils, DataUtils } from '../../regras'
import { IconCalendar, IconEdit, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

export interface AgendaClienteItemProps {
    agendamento: Agendamento
    cancelar: (id: number) => void
}

export default function AgendaClienteItem(props: AgendaClienteItemProps) {
    const { agendamento } = props
    const router = useRouter()

    const redirecionarParaEdicao = () => {
        // Redireciona o usuário para a página de edição do agendamento
        router.push(`/agendamentos/editar?id=${agendamento.id}`)
    }

    return (
        <div className="flex flex-col sm:flex-row justify-around items-start gap-6 bg-zinc-800 rounded-md p-5 sm:p-10 mx-4 sm:mx-0">
            {/* Coluna 1: Nome do profissional e data */}
            <div className="flex-1 flex flex-col mx-auto items-start gap-2">
                <IconCalendar size={60} stroke={1} className="mb-4 sm:mb-0" />
                <div>
                    <div className="text-xl">{agendamento.profissional.nome}</div>
                    <div className="text-zinc-400 text-sm">
                        {DataUtils.formatarDataEHora(new Date(agendamento.data))}
                    </div>
                </div>
            </div>

            {/* Coluna 2: Serviços */}
            <div className="flex-1 flex flex-col mx-auto items-start gap-2">
                <span className="text-zinc-400 font-semibold">Serviços:</span>
                <ul className="text-sm text-zinc-300 list-disc ml-5 sm:ml-0">
                    {agendamento.servicos.map((servico, index) => (
                        <li key={index}>{servico.nome}</li>
                    ))}
                </ul>
            </div>

            {/* Coluna 3: Tempo, preço e botões */}
            <div className="flex-1 flex flex-col mx-auto items-start sm:items-end gap-2">
                <div className="flex flex-col items-start sm:items-end">
                    <span className="text-xl font-black">
                        {AgendaUtils.duracaoTotal(agendamento.servicos)}
                    </span>
                    <span className="text-zinc-400">
                        R$ {agendamento.servicos.reduce((acc, servico) => acc + servico.preco, 0)}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        className="button bg-blue-500"
                        onClick={redirecionarParaEdicao}
                    >
                        <IconEdit size={24} stroke={1.5} />
                    </button>
                    <button
                        className="button bg-red-500"
                        onClick={() => props.cancelar(agendamento.id)}
                    >
                        <IconTrash size={24} stroke={1.5} />
                    </button>
                </div>
            </div>
        </div>
    )
}
