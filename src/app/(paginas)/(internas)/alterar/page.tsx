'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useAPI from '@/data/hooks/useAPI'
import Logo from '@/components/shared/Logo'
import Image from 'next/image'
import { TelefoneUtils } from '@/regras'
import useSessao from '@/data/hooks/useSessao' // Hook para acessar o token da sessão

export default function Alterar() {
    const [email, setEmail] = useState<string>('')
    const [telefone, setTelefone] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [erros, setErros] = useState({ email: '', telefone: '', senha: '' })
    const { token } = useSessao() // Obtém o token da sessão
    const { httpPost } = useAPI()
    const router = useRouter()

    function validarFormulario() {
        const novosErros = {
            email: '',
            telefone: '',
            senha: '',
        }

        if (!email.trim()) novosErros.email = 'O e-mail é obrigatório.'
        if (!telefone.trim()) novosErros.telefone = 'O telefone é obrigatório.'
        if (!senha.trim()) novosErros.senha = 'A senha é obrigatória.'

        setErros(novosErros)
        return !Object.values(novosErros).some((erro) => erro)
    }

    async function submeter() {
        if (!validarFormulario()) return;
        try {
            const response = await httpPost('/usuario/alterar', {
                email,
                telefone,
                senha,
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token nos cabeçalhos
                },
            });
    
            alert('Dados atualizados com sucesso!');
            router.push('/'); // Redireciona para a página inicial
        } catch (error: any) {
            console.error('Erro ao atualizar dados:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Erro ao atualizar dados. Tente novamente.');
        }
    }
    
    

    return (
        <div className="flex justify-center items-center h-screen relative">
            <Image src="/banners/principal.webp" fill alt="Barbearia" className="object-cover" />
            <div className="flex flex-col justify-center items-center gap-10 absolute top-0 left-0 w-full h-full bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30">
                <Logo />
                <div className="flex flex-col w-full max-w-md gap-5 px-4">
                    <div className="flex flex-col gap-4 rounded p-6">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                className="bg-zinc-900 px-4 py-2 rounded mb-1 w-full"
                            />
                            {erros.email && <p className="text-red-500 text-sm">{erros.email}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Nova senha"
                                className="bg-zinc-900 px-4 py-2 rounded mb-1 w-full"
                            />
                            {erros.senha && <p className="text-red-500 text-sm">{erros.senha}</p>}
                        </div>
                        <div>
                            <input
                                type="tel"
                                value={TelefoneUtils.formatar(telefone)}
                                onChange={(s) => setTelefone(TelefoneUtils.desformatar(s.target.value))}
                                placeholder="Telefone"
                                className="bg-zinc-900 px-4 py-2 rounded mb-1 w-full"
                            />
                            {erros.telefone && <p className="text-red-500 text-sm">{erros.telefone}</p>}
                        </div>
                        <div className="flex gap-5 mt-4">
                            <button onClick={submeter} className="button bg-green-600 flex-1">
                                Alterar
                            </button>
                            <button onClick={() => router.push('/')} className="button flex-1">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
