'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TelefoneUtils } from '@/regras'
import useUsuario from '@/data/hooks/useUsuario'
import Logo from '@/components/shared/Logo'
import Image from 'next/image'

export default function Alterar() {
    const [email, setEmail] = useState<string>('') // Garantindo que o email seja uma string vazia
    const [telefone, setTelefone] = useState<string>('') // Garantindo que o telefone seja uma string vazia
    const [senha, setSenha] = useState<string>('') // Garantindo que a senha seja uma string vazia
    const [erros, setErros] = useState({
        email: '',
        telefone: '',
        senha: '',
    })

    const { usuario, alterar } = useUsuario()
    const router = useRouter()

    useEffect(() => {
        if (usuario) {
            // Garantindo que o valor de usuario.email e usuario.telefone seja atribuído corretamente
            setEmail(usuario.email ?? '') // Caso usuario.email seja undefined, define como string vazia
            setTelefone(usuario.telefone ?? '') // Caso usuario.telefone seja undefined, define como string vazia
        } else {
            router.push('/') // Se o usuário não estiver logado, redireciona para a página inicial
        }
    }, [usuario, router])

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
            const token = localStorage.getItem('token'); 
    
            if (!token) {
                throw new Error('Token de autenticação não encontrado. Faça login novamente.');
            }
    
            const response = await fetch('https://barbabrutal-backend-nest.vercel.app/alterar', {
                method: 'PUT', // Alteração de dados
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Inclui o token JWT
                },
                body: JSON.stringify({
                    email,
                    telefone,
                    senha,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar os dados.');
            }
    
            alert('Dados atualizados com sucesso!');
            router.push('/'); // Redireciona para a página inicial após alteração bem-sucedida
        } catch (error: any) {
            console.error('Erro ao atualizar dados:', error.message);
            alert(error.message || 'Erro ao atualizar dados. Tente novamente.');
        }
    }
    
        

    return (
        <div className="flex justify-center items-center h-screen relative">
            <Image src="/banners/principal.webp" fill alt="Barbearia" className="object-cover" />
            <div
                className="
                    flex flex-col justify-center items-center gap-10
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
            >
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
                                onChange={(s) =>
                                    setTelefone(TelefoneUtils.desformatar(s.target.value))
                                }
                                placeholder="Telefone"
                                className="bg-zinc-900 px-4 py-2 rounded mb-1 w-full"
                            />
                            {erros.telefone && (
                                <p className="text-red-500 text-sm">{erros.telefone}</p>
                            )}
                        </div>
                        <div className="flex gap-5 mt-4">
                            <button onClick={submeter} className="button bg-green-600 flex-1">
                                Alterar
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="button flex-1"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
