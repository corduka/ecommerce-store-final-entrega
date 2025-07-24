// pages/admin.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const isLogged = localStorage.getItem("user");
    if (!isLogged) {
      router.push("/login");
    } else {
      loadProducts();
    }
  }, []);

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "products"), {
      title,
      price: parseFloat(price),
      image: imageUrl,
      description: "",
      stock: 10,
      category: "misc",
    });

    setTitle("");
    setPrice("");
    setFile(null);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <form
        onSubmit={handleAddProduct}
        className="flex flex-col gap-2 max-w-md mb-6"
      >
        <input
          placeholder="Product title"
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Price"
          className="border p-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          className="border p-2"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Your Products</h2>
      <ul className="space-y-2">
        {products.map((prod) => (
          <li key={prod.id} className="border p-4 flex justify-between">
            <div>
              <h3 className="font-semibold">{prod.title}</h3>
              <p>${prod.price}</p>
            </div>
            <button
              onClick={() => handleDelete(prod.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
