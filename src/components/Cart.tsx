import { X } from "lucide-react";
import React from "react";
import { ProductType } from "./Modal";
import { useState } from "react";

interface CartProps {
    toggleCart: ()=> void
    cartItems: ProductType[]
    removeItem: (item: ProductType) => void
    handleButtonCheckOut: () => void
}



const Cart: React.FC<CartProps> = ({toggleCart, cartItems, removeItem, handleButtonCheckOut}) => {

    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false)
    const handleTotal = () => {
        const newTotal = cartItems.reduce((total, item) =>
            total + item.price, 0
        )
        setTotal(newTotal)
        setShowTotal(true)
    }

    return(
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300/75">
            <div className="modal-content bg-white p-4 rounded h-96 w-96 relative flex justify-between flex-col border-4">
                <div>{cartItems.length !== 0 &&
                    cartItems.map((item)=> (
                        <div key={item.id} className="flex justify-center mt-4 border-2 rounded py-1">
                            <p className="font-sans font-semibold">{item.name} - R${item.price} - <button className="text-gray-400" onClick={()=>removeItem(item)}>remover</button></p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-around flex-col">
                    <div className="flex items-center justify-around"><button onClick={handleTotal} className="border-2 p-1 mr-3">Calcular preço</button>
                    {showTotal &&
                        <p>R${total.toFixed(2)}</p>}  
                    </div>
                    <div className="mt-4"><button onClick={handleButtonCheckOut} className="border-2 p-1">Finalizar Pedido</button></div>
                </div>
                <button className="text-white p-2 rounded absolute top-4 right-4" onClick={toggleCart}>
                    <X className="w-6 h-6 text-[#432000]" />
                </button>
            </div>
        </div>
    )
}

export default Cart;