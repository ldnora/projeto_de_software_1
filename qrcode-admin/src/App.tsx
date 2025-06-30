// src/App.tsx

import { useState, useEffect } from 'react';
import './App.css';

// --- Type Definitions ---
// Let's update our type to be more flexible for the QR code response
interface QrCodeResponse {
  message: string;
  qrcode_url: string;
}

interface ApiPlanta {
  id: number;
  nome_cientifico: string;
  nome_popular: string;
  slug: string;
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

function App() {
  const [plantas, setPlantas] = useState<ApiPlanta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This fetching logic is correct and does not need to change.
    const fetchPlantas = async () => {
      if (!API_TOKEN || !STRAPI_URL) {
        setError("Strapi URL or API Token is missing."); setLoading(false); return;
      }
      const fetchUrl = new URL(`${STRAPI_URL}/api/plantas`);
      fetchUrl.searchParams.append('publicationState', 'preview');
      fetchUrl.searchParams.append('populate', '*');
      try {
        const response = await fetch(fetchUrl.toString(), {
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const apiResponse = await response.json();
        if (apiResponse && Array.isArray(apiResponse.data)) {
            setPlantas(apiResponse.data);
        } else {
            throw new Error("Unexpected data format from API.");
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlantas();
  }, []);


  const handleGenerateClick = async (slug: string): Promise<void> => {
    try {
      const response = await fetch(`${STRAPI_URL}/api/plantas/${slug}/generate-qrcode`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
      });

      if (!response.ok) {
        throw new Error(`QR Code generation failed: ${response.statusText}`);
      }

      // 1. Get the JSON response as our new QrCodeResponse type
      const responseObject: QrCodeResponse = await response.json();
      
      console.log("Response from QR Code generator:", responseObject);

      // --- THE FINAL FIX IS HERE ---
      // 2. Check for the correct property: `qrcode_url`
      if (responseObject && typeof responseObject.qrcode_url === 'string') {
        const relativeUrl = responseObject.qrcode_url;
        // 3. Open the full URL
        window.open(`${STRAPI_URL}${relativeUrl}`, '_blank');
      } else {
        throw new Error("The API response did not contain a valid 'qrcode_url' property.");
      }

    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred while generating the QR code.");
      }
    }
  };

  if (loading) return <div>Loading plants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Gerador de QR Code para Plantas</h1>
      {plantas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome da Planta</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {plantas.map((planta) => (
              <tr key={planta.id}>
                <td>{planta.nome_cientifico} ({planta.nome_popular})</td>
                <td>
                  <button onClick={() => handleGenerateClick(planta.slug)}>
                    Gerar e Ver QR Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No plants found.</div>
      )}
    </div>
  );
}

export default App;