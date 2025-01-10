'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Usuario } from '../../regras'
import Image from 'next/image'
import useUsuario from '@/data/hooks/useUsuario'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export interface MenuUsuarioProps {
    usuario: Usuario | null
}

export default function MenuUsuario(props: MenuUsuarioProps) {
    const { usuario, sair } = useUsuario()
    const router = useRouter()

    return (
        <>
            {/* Se o usuário estiver logado, mostra o menu */}
            {props.usuario ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex gap-2 items-center">
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-bold leading-5">{props.usuario.nome}</span>
                                <span className="text-xs text-zinc-400">{props.usuario.email}</span>
                            </div>
                            <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 p-1 bg-zinc-700">
                                <Image src="/avatar.png" width={40} height={40} alt={props.usuario.nome} />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Menu Usuário</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* Verifica se o usuário é barbeiro */}
                        {usuario?.barbeiro ? (
                            <DropdownMenuItem onClick={() => router.push('/agenda')}>
                                Minha Agenda
                            </DropdownMenuItem>
                        ) : (
                            <>
                                <DropdownMenuItem onClick={() => router.push('/agendamentos')}>
                                    Meus Agendamentos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/alterar')}>
                                    Alterar meus Dados
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/excluir')}>
                                    Deletar minha Conta
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem onClick={sair}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                // Se o usuário não estiver logado, mostra o link para login
                <div className="flex justify-end">
                    <Link href="/login" className="text-blue-500">
                        Entrar
                    </Link>
                </div>
            )}
        </>
    )
}
