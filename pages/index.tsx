import Link from "next/link";
import Head from "next/head";

<Link href={`/products/${product.id}`}>
  <div className="border p-4 rounded shadow-sm hover:shadow-md cursor-pointer">
    ...
  </div>
</Link>;
<Head>
  <title>EcoStore | Natural Products for You</title>
  <meta
    name="description"
    content="Shop the best natural products at EcoStore – organic, sustainable, and delivered to your door."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:title" content="EcoStore" />
  <meta
    property="og:description"
    content="Shop the best natural products at EcoStore – organic, sustainable, and delivered to your door."
  />
  <meta property="og:image" content="/logo.png" />
  <meta
    property="og:url"
    content="https://ecommerce-store-final-entrega.vercel.app/"
  />
  <meta name="twitter:card" content="summary_large_image" />
</Head>;
