'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerificarCodigo() {
    const [codigo, setCodigo] = useState('')
    const [email, setEmail] = useState('')
    const [erro, setErro] = useState('')

    const router = useRouter()

    async function verificarCodigo() {
        const response = await fetch('/api/verificar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo }),
        })

        if (response.ok) {
            alert('Código validado com sucesso! Você será redirecionado para a página de login.')
            router.push('/')
        } else {
            setErro('Código inválido. Tente novamente.')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded">
                <h1 className="text-xl font-bold">Verificar Código</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    className="bg-gray-700 px-4 py-2 rounded w-full"
                />
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Digite o código enviado"
                    className="bg-gray-700 px-4 py-2 rounded w-full"
                />
                {erro && <p className="text-red-500 text-sm">{erro}</p>}
                <button onClick={verificarCodigo} className="button bg-green-600 w-full">
                    Verificar Código
                </button>
            </div>
        </div>
    )
}
