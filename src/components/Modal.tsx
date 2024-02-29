import { X } from "lucide-react";
import React from "react";

export type ProductType = {
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
  id: number;
};

interface ModalProps {
  onClose: () => void;
  product: ProductType;
  addToCart: (product: ProductType) => void
}

const Modal: React.FC<ModalProps> = ({ onClose, product, addToCart }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-300/75 flex items-center justify-center px-6">
      <div className="w-full max-w-[24rem] h-96">
        <div className="w-full flex flex-col bg-gray-400 rounded-md p-5 relative h-96">
          <button onClick={onClose} className="absolute top-4 right-4">
            <X className="w-6 h-6 text-[#432000]" />
          </button>
          <h2 className="md:text-3xl text-gray-50 mb-4">{product.name}</h2>
          <img className="w-40 h-full object-cover mb-4 rounded-md" src={product.image} />
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold">R${product.price.toFixed(2)}</p>
          <div className="flex flex-col gap-2">
            <button onClick={()=> addToCart(product)} className="w-full p-3 rounded bg-[#432000] text-gray-50 hover:bg-gray-300">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
