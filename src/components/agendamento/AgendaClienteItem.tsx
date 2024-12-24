import { Agendamento, AgendaUtils, DataUtils } from '../../regras'
import { IconCalendar, IconTrash } from '@tabler/icons-react'

export interface AgendaClienteItemProps {
    agendamento: Agendamento
    cancelar: (id: number) => void
}

export default function AgendaClienteItem(props: AgendaClienteItemProps) {
    const { agendamento } = props

    return (
        <div className="flex items-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <div className="flex-1 flex flex-col">
                <span className="text-xl">{agendamento.profissional.nome}</span>
                <span className="text-zinc-400 text-sm">
                    {DataUtils.formatarDataEHora(new Date(agendamento.data))}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-black">
                    {AgendaUtils.duracaoTotal(agendamento.servicos)}
                </span>
                <span className="text-zinc-400">
                    R$ {agendamento.servicos.reduce((acc, servico) => acc + servico.preco, 0)}
                </span>
            </div>
            <div>
                <button className="button bg-red-500" onClick={() => props.cancelar(agendamento.id)}>
                    <IconTrash size={24} stroke={1.5} />
                </button>
            </div>
        </div>
    )
}
