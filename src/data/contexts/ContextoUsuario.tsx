'use client'
import { useRouter } from 'next/navigation'
import { createContext } from 'react'
import { Usuario } from '../../regras'
import useSessao from '../hooks/useSessao'
import useAPI from '../hooks/useAPI'

export interface ContextoUsuarioProps {
    carregando: boolean
    usuario: Usuario | null
    entrar: (usuario: Partial<Usuario>) => Promise<void>
    registrar: (usuario: Usuario) => Promise<void>
    alterar: (usuario: Usuario) => Promise<void>
    excluir: (usuario: Usuario) => Promise<void>
    sair: () => void
}

const ContextoUsuario = createContext<ContextoUsuarioProps>({} as any)

export function ProvedorUsuario({ children }: any) {
    const { httpPost } = useAPI()
    const { carregando, usuario, criarSessao, limparSessao } = useSessao()
    const router = useRouter()

    async function entrar(usuario: Partial<Usuario>) {
        const token = await httpPost('/usuario/login', usuario)
        criarSessao(token)
    }

    async function registrar(usuario: Usuario) {
        await httpPost('/usuario/registrar', usuario)
    }

    async function alterar(usuario: Usuario){
        await httpPut('/usuario/alterar', usuario)
    }

    async function excluir(usuario: Usuario){
        await httpDelete('/usuario/excluir', usuario)
    }

    function sair() {
        limparSessao()
        router.push('/')
    }

    return (
        <ContextoUsuario.Provider
            value={{
                carregando,
                usuario,
                entrar,
                registrar,
                alterar,
                excluir,
                sair,
            }}
        >
            {children}
        </ContextoUsuario.Provider>
    )
}

export default ContextoUsuario
function httpPut(arg0: string, usuario: Usuario) {
    throw new Error('Function not implemented.')
}

function httpDelete(arg0: string, usuario: Usuario) {
    throw new Error('Function not implemented.')
}

