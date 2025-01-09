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
        <div className="flex items-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <div className="flex-1 flex flex-col">
                <span className="text-xl">{agendamento.profissional.nome}</span>
                <span className="text-zinc-400 text-sm">
                    {DataUtils.formatarDataEHora(new Date(agendamento.data))}
                </span>
            </div>

            <div className="flex-1 flex flex-col gap-1">
                <span className="text-zinc-400 font-semibold">Serviços:</span>
                <ul className="text-sm text-zinc-300 list-disc ml-5">
                    {agendamento.servicos.map((servico, index) => (
                        <li key={index}>{servico.nome}</li>
                    ))}
                </ul>
            </div>
            <div className="flex gap-2">
                <div className="flex flex-col items-center">
                    <span className="text-xl font-black">
                        {AgendaUtils.duracaoTotal(agendamento.servicos)}
                    </span>
                    <span className="text-zinc-400">
                        R$ {agendamento.servicos.reduce((acc, servico) => acc + servico.preco, 0)}
                    </span>
                </div>
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
    )
}
