import React, { useEffect, useState } from "react";

import {
  Button,
  Drawer,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Apidan malumot olib kelish
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  // Drawerni ochib yopish
  const [openRight, setOpenRight] = useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  // Cart yaratish
  const [cart, setCart] = useState([]);

  const addCart = (i) => {
    const found = cart.find((product) => product.id === i.id);

    if (!found) {
      setCart([...cart, i]);

      toast.success(`Cartga qo'shildi`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`Bu oldindan mavjud`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteCard = (id) => {
    setCart((cart) => cart.filter((i) => i.id !== id));

    toast.success(`Product o'chirildi`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <header className="py-7 bg-green-300">
        <div className="w-full max-w-6xl mx-auto px-5 flex justify-between items-center">
          <a className="text-2xl font-bold" href="#">
            Fakestore
          </a>

          <Button
            className="bg-red-400 px-5 py-1 rounded-md"
            onClick={openDrawerRight}
          >
            Cart {cart.length}
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="grow py-16">
        <div className="w-full max-w-6xl mx-auto px-5">
          {/* products */}
          <ul className="grid grid-cols-4 gap-5">
            {products.map((i) => {
              return (
                <li
                  key={i.id}
                  className="border border-gray-400 p-4 flex flex-col rounded-xl"
                >
                  <div className="flex-grow">
                    <img className="h-60 mx-auto" src={i.image} alt="product" />
                  </div>
                  <div className="body pt-5">
                    <h3>{i.title}</h3>
                  </div>
                  <div className="footer mt-5">
                    <button
                      onClick={() => addCart(i)}
                      className="bg-green-500 px-5 py-1 rounded-md text-white font-medium"
                    >
                      Add to card
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Cart */}
          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4"
          >
            {/* Header Drawer */}
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Fakestore
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>

            <p className="mb-5 text-center">
              Cartda {cart.length}ta mahsulot mavjud
            </p>

            <ul className="space-y-3">
              {cart.map((product) => {
                return (
                  <li
                    className="flex border border-gray-400 rounded-md p-2 items-center relative"
                    key={product.id}
                  >
                    <img
                      className="w-16"
                      src={product.image}
                      alt="product img"
                    />
                    <h3 className="ml-2">{product.title}</h3>

                    <button
                      onClick={() => deleteCard(product.id)}
                      className="absolute top-2 right-2"
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </Drawer>

          <ToastContainer />
        </div>
      </main>

      {/* footer */}
      <footer className="py-7 bg-green-300 text-center text-2xl font-bold">
        Fakestore
      </footer>
    </div>
  );
};

export default App;
