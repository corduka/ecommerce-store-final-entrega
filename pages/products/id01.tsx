// pages/products/[id].tsx
import { GetServerSideProps } from "next";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
};

type Props = {
  product: Product | null;
};

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  if (!product) {
    return <h1 className="p-6 text-xl">Product not found</h1>;
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    router.push("/cart");
  };

  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">${product.price}</p>
          <div className="mb-4">
            <label>Quantity:</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="ml-2 w-16 border px-2 py-1"
            />
          </div>
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return { props: { product: null } };
  }

  return {
    props: {
      product: { id: snap.id, ...snap.data() },
    },
  };
};
