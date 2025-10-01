import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';

export default function BasicDemo() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Generate random dataset
    const mockProducts = Array.from({ length: 10 }, (_, i) => ({
      code: "P" + (1000 + i),
      name: ["Laptop", "Headphones", "Mouse", "Keyboard", "Monitor", "Phone", "Tablet", "Camera", "Speaker", "Printer"][
        Math.floor(Math.random() * 10)
      ],
      category: ["Electronics", "Accessories", "Office", "Gaming", "Audio"][Math.floor(Math.random() * 5)],
      quantity: Math.floor(Math.random() * 100) + 1,
    }));

    setProducts(mockProducts);
  }, []);

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}
