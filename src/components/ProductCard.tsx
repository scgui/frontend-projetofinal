import { ProductsProps } from "../App";
import { ProductType } from "./Modal";

interface ProductCardProps extends ProductsProps {
  openModal: (product: ProductType) => void;
}

export const ProductCard = ({ openModal, ...product }: ProductCardProps) => {
  const { name, price, description, image } = product;

  const handleClick = () => {
    openModal(product);
  };

  return (
    <div
      onClick={handleClick}
      className="mt-8 w-100 max-w-md mx-40 xs:mx-20 bg-white rounded-xl overflow-hidden shadow-lg p-6 mb-6 border-2 border-transparent hover:border-[#432000]"
    >
      <img className="w-40 h-full object-cover mb-4 rounded-md" src={image} />
      <div className="mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">R${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
