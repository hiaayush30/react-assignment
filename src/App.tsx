import { useState, useEffect, useRef } from 'react';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';

type ProductType = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: Date;
  date_end: Date;
};

export default function BasicDemo() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const [customRows, setCustomRows] = useState("");

  const overlayRef = useRef<OverlayPanel>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPage(page + 1, rows);
  }, [page, rows]);

  const fetchPage = async (page: number, limit: number) => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`);
      const data = await response.json();
      setProducts(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event: DataTablePageEvent) => {
    if (event.page || event.page == 0) {
      setPage(event.page)
    }
    setRows(event.rows);
  };

  const selectCustomRows = async () => {
    if (isNaN(Number(customRows))) {
      return alert("Enter a valid number!")
    }
    try {
      setLoading(true)
      setSelectedProducts([])
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=${customRows}`)
      if (response.ok) {
        const data = await response.json();
        setSelectedProducts(products => [...products, ...data.data])
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <DataTable
        value={products}
        dataKey="id"
        paginator
        lazy
        first={page * rows}
        rows={rows}
        totalRecords={totalRecords}
        onPage={handlePageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => {
          console.log(e)
          setSelectedProducts(e.value)
        }}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          selectionMode="multiple"
          header={
            <div className="cursor-pointer">
              <i
                className="pi pi-angle-down"
                onClick={(e) => overlayRef.current?.toggle(e)}
              ></i>
              <OverlayPanel ref={overlayRef}>
                <input
                  value={customRows}
                  onChange={(e) => setCustomRows(e.target.value)}
                  className="p-1 outline-1 rounded-lg"
                  type="text"
                  placeholder="Select rows..."
                />
                <button
                  disabled={loading}
                  onClick={async (e) => {
                    await selectCustomRows()
                    overlayRef.current?.toggle(e)
                  }}
                  className="p-1 m-1 bg-slate-200 rounded-lg cursor-pointer"
                >
                  {loading ? "Selecting..." : "Submit"}
                </button>
              </OverlayPanel>
            </div>
          }
        ></Column>
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
}
