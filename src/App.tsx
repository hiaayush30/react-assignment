import { useState, useEffect,type BaseSyntheticEvent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type ProductType = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: Date;
  date_end: Date
}

export default function BasicDemo() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.artic.edu/api/v1/artworks?page=1");
      const data = await response.json();
      setProducts(data.data)
    }
    fetchData()
  }, []);

  return (
    <div className="p-5 h-screen flex justify-center items-center">
      <DataTable
        onClick={(e: BaseSyntheticEvent) => console.log(e)}
        value={products}
        tableStyle={{ minWidth: '50rem' }}
        paginator rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Start Date"></Column>
        <Column field="date_end" header="End Date"></Column>
      </DataTable>
    </div>
  );
}
