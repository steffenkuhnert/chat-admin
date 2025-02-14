import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [config, setConfig] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      console.log("Starte Anfrage an Supabase...");
      const { data, error } = await supabase
        .from("chat_config")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        setErrorMessage(error.message);
      } else {
        console.log("Daten erfolgreich geladen:", data);
        setConfig(data);
      }
    }

    fetchConfig();
  }, []);

  async function handleSave() {
    if (!config) return;

    setLoading(true);
    console.log("Starte Speicherprozess mit diesen Werten:", config);

    const { data, error } = await supabase
      .from("chat_config")
      .update({
        button_text: config.button_text,
        button_color: config.button_color,
        consent_text: config.consent_text,
      })
      .eq("id", config.id); // 🔹 Wir updaten nun über die ID statt über die Domain!

    if (error) {
      console.error("Fehler beim Speichern:", error);
      setErrorMessage(error.message);
    } else {
      console.log("Speichern erfolgreich! Neue Werte:", data);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Chat-Admin Dashboard</h1>
      {errorMessage && <p style={{ color: "red" }}>Fehler: {errorMessage}</p>}
      {config ? (
        <>
          <label>
            Button-Text:
            <input
              type="text"
              value={config.button_text}
              onChange={(e) => setConfig({ ...config, button_text: e.target.value })}
              style={{ width: "100%", padding: "5px", margin: "5px 0" }}
            />
          </label>
          <label>
            Button-Farbe:
            <input
              type="color"
              value={config.button_color}
              onChange={(e) => setConfig({ ...config, button_color: e.target.value })}
              style={{ width: "100%", padding: "5px", margin: "5px 0" }}
            />
          </label>
          <label>
            Cookie-Zustimmungstext:
            <textarea
              value={config.consent_text}
              onChange={(e) => setConfig({ ...config, consent_text: e.target.value })}
              style={{ width: "100%", padding: "5px", margin: "5px 0", height: "60px" }}
            />
          </label>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            {loading ? "Speichern..." : "Änderungen speichern"}
          </button>
        </>
      ) : (
        <p>Lade Konfiguration...</p>
      )}
    </div>
  );
}
