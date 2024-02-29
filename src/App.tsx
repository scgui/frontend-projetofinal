import { useCallback, useState, useEffect } from "react";
import { api } from "./lib/axios";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Footer } from "./components/Footer";
import Modal, { ProductType } from "./components/Modal";
import { ShoppingCart } from "lucide-react";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";

export interface ProductsProps {
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
  id: number;
  key: number;
}

export function App() {
  const [products, setProducts] = useState <ProductsProps[]>([])
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const [cart, setCart] = useState<ProductType[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: ProductType) => {
    setCart([...cart, product]);
    setCurrentProduct(undefined)
    alert("Item Adicionado com sucesso!")
  };

  const removeFromCart = (productId: ProductType) => {
    setCart((cart) => cart.filter((item) => item !== productId));
    setCartOpen(false)
    alert("Item removidos com sucesso!")
  };

  const handleButtonCheckOut = () => {
    setCartOpen(false)
    setIsCheckoutOpen(true)
  }
  
  const toggleCheckOut = () => {
    setIsCheckoutOpen(!isCheckoutOpen)
  }

  const toggleCart = () => {
    setCartOpen(!isCartOpen)
  }

  const openModal = (product: ProductType) => {
    setCurrentProduct(product);
  };

  const closeModal = () => {
    setCurrentProduct(undefined);
  };

   const getProducts = useCallback( async ()=> {
     const response = await api.get('/api/products')
     setProducts(response.data)
   }, [])

  useEffect(()=>{
    getProducts()
  }, [getProducts])

  return (
    <div>
      <Header />
      <div className="flex items-center justify-around">
        <p className="ml-14 text-3xl my-10">Produtos</p>
        <div className="xs:flex xs:items-center">
          <button onClick={toggleCart} className="hover:bg-gray-400 p-2 rounded">
            <ShoppingCart className="w-10 h-10 text-[#432000] text-3xl"/>
          </button>
          <p>{cart.length} Itens no Carrinho</p>
        </div>
      </div>
      {currentProduct ? (
        <Modal product={currentProduct} onClose={closeModal} addToCart={addToCart}/>
      ) : null}
      {isCartOpen && 
        <Cart
          handleButtonCheckOut = {handleButtonCheckOut}
          removeItem = {removeFromCart}
          cartItems = {cart}
          toggleCart = {toggleCart}
        />}
      {isCheckoutOpen && 
        <CheckOut
          toggle = {toggleCheckOut}
          cart = {cart}
        />}
      <div className="flex flex-wrap items-center justify-center">
        {products.map((product) => (
          <ProductCard
            openModal={openModal}
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            description={product.description}
            type={product.type}
            id={product.id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
