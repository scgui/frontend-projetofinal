import { ProductType } from "./Modal";
import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";

interface CheckoutProps {
    cart: ProductType[];
    toggle: () => void;
}


const CheckOut: React.FC<CheckoutProps> = ({cart, toggle}) => {
    const [name, setName] = useState('');
    const [payForm, setPayForm] = useState('');
    const [address, setAddress] = useState('');

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        console.log(name)
    }

    const handleChangePayForm = (event: ChangeEvent<HTMLInputElement>) => {
        setPayForm(event.target.value)
    }

    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }


    const sendToWhats = () => {
        const arrayNameItems = cart.map((item)=> item.name)

        const message = `Olá, tudo bem? Meu nome é${name}, moro em ${address}. Eu gostaria de fazer um pedido dos itens: ${arrayNameItems.join(', ')}. O método de pagamento é ${payForm}.`;

        const number = '32984515782';

        const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');

        alert("Você será redirecionado para o whats! Aguardamos o envio do pedido.")
        toggle()
    }

    return(
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300/75">
            <div className="modal-content bg-white p-4 rounded h-96 w-96 relative flex justify-between flex-col border-4">
                <input onChange={handleChangeName} className="border-2 p-1 mt-8" type="text" placeholder="Nome"/>
                <input onChange={handleChangePayForm} className="border-2 p-1" type="text" placeholder="Forma de Pagamento"/>
                <input onChange={handleChangeAddress} className="border-2 p-1" type="text" placeholder="Endereço"/>
                <button onClick={sendToWhats} className="border-2 hover:bg-gray-300">Enviar Pedido</button>
                <button className="text-white p-2 rounded absolute top-4 right-4" onClick={toggle}>
                    <X className="w-6 h-6 text-[#432000]" />
                </button>
            </div>
        </div>
    )
}

export default CheckOut;