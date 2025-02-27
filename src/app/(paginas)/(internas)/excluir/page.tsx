'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Logo from '@/components/shared/Logo'
import Image from 'next/image'

export default function Excluir() {
    const [confirmacao, setConfirmacao] = useState(false)
    const router = useRouter()

    

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
                        <h2 className="text-2xl text-center text-white mb-4">
                            Tem certeza que deseja excluir sua conta?
                        </h2>
                        <div className="text-center">
                            <p className="text-white text-sm mb-4">
                                Essa ação é irreversível e excluirá permanentemente sua conta.
                            </p>
                            <div className="flex gap-5 mt-4">
                                <button
                                    
                                    className="button bg-red-600 text-white flex-1"
                                >
                                    Excluir Conta
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="button bg-white text-black flex-1"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
