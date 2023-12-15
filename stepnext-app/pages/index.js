// Importa las bibliotecas necesarias
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

// Resto del código del componente
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRQjGgyTMcIXnw448bsghyq-vD-Lg5mahuYl3_Dn0v0iLS8PRXG8iCzec6IlfYpxXhdleM1KLu8Ucii/pub?gid=1217517643&single=true&output=csv');
        const result = Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
        });

        const parsedProducts = result.data.map((row) => ({
          EnergiasUsadas: row['Energias'],
          NFT: row['ZAPA'],
          GstGanado: row['Gst ganado'],
          ArregloGst: row['Arreglo Gst'],
          costeCajaGst: Number(row['Coste de caja gst']),
          gmt: row['GMT'],
          totalGst: row['Total GST'],
          cajaMb: row['Caja mb'],
          hp: row['HP%'],
          obtencionCaja: row['Obtencion caja'],
        }));

        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    // ... Otro contenido de tu componente
    <div>
      {/* Renderiza tus productos aquí */}
      {products.map((product) => (
        <div key={product.id}>
          <p>EnergiasUsadas: {product.EnergiasUsadas}</p>
          <p>NFT: {product.NFT}</p>
          <p>GstGanado: {product.GstGanado}</p>
          <p>Arreglo GST: {product.ArregloGst}</p>
          <p>Coste de Caja GST: {product.costeCajaGst}</p>
          <p>GMT: {product.gmt}</p>
          <p>Total GST: {product.totalGst}</p>
          <p>Caja MB: {product.cajaMb}</p>
          <p>HP%: {product.hp}</p>
          <p>Obtención Caja: {product.obtencionCaja}</p>
        </div>
      ))}
    </div>
  );
}

