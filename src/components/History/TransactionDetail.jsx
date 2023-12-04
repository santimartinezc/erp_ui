//ProductTable
import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";

const TransactionDetail = () => {
  const { productsInTransaction } = useContext(HistoryContext);
  const [products, setProducts] = useState([]);

  console.log(productsInTransaction);
  useEffect(() => {
    setProducts(productsInTransaction);
    console.log("ProductsInTransaction:", productsInTransaction);
  }, [productsInTransaction]);

  if (!productsInTransaction) return <div>Loading</div>;

  return (
    <div className="flex justify-center text-sm">
      <div className="max-w-4xl w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-1 border">ID</th>
              <th className="px-1 border">Producto</th>
              <th className="px-1 border">Precio (€)</th>
              <th className="px-1 border">Cantidad</th>
              <th className="px-1 border">IVA (%)</th>
              <th className="px-1 border">Importe (€)</th>
            </tr>
          </thead>
          <tbody className="bg-amber-100">
            {productsInTransaction.map((product) => (
              <tr key={product.productId} className="border-b">
                <td className="px-1 border">{product.productId}</td>
                <td className="px-1 border">{product.productName}</td>
                <td className="px-1 border">{product.price.toFixed(2)}</td>
                <td className="px-1 border">{product.quantity}</td>
                <td className="px-1 border">
                  {product.taxes_pctg.toFixed(2)}%
                </td>
                <td className="px-1 border">
                  {product.quantity * product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetail;
