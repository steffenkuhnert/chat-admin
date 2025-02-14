(async function() {
  const SUPABASE_URL = "https://woncqwpykmpabylrhzcw.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbmNxd3B5a21wYWJ5bHJoemN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NTM3NjYsImV4cCI6MjA1NTEyOTc2Nn0.3SzQqBxBADQQvz376890008cSX_ACYcHJ8rlBCFcY24";

  let chatLoaded = false; // 💡 Verhindert mehrfaches Laden!

  async function getChatConfig(domain) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/chat_config?domain=eq.${domain}&select=*`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) {
        console.error("Fehler beim Abrufen der Chat-Konfiguration:", response.statusText);
        return null;
      }

      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Fehler beim Abrufen der Chat-Konfiguration:", error);
      return null;
    }
  }

  function createChatButton(config) {
    if (!config) {
      console.error("Keine gültige Konfiguration gefunden.");
      return;
    }

    if (document.getElementById("chat-button")) {
      console.warn("Chat-Button existiert bereits. Kein neuer Button wird erstellt.");
      return;
    }

    console.log("Erstelle Chat-Button...");
    const chatButton = document.createElement("button");
    chatButton.id = "chat-button";
    chatButton.innerText = config.button_text;
    chatButton.style.position = "fixed";
    chatButton.style.bottom = `${config.position_bottom}px`;
    chatButton.style.right = `${config.position_right}px`;
    chatButton.style.backgroundColor = config.button_color;
    chatButton.style.color = "#fff";
    chatButton.style.padding = "10px 20px";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "5px";
    chatButton.style.cursor = "pointer";

    chatButton.addEventListener("click", () => {
      if (!chatLoaded) {
        chatLoaded = true; // 💡 Verhindert mehrfaches Nachladen des Chats
        console.log("Chat-Button wurde geklickt! Lade LiveChat...");
        loadChatScript();
      } else {
        console.warn("Chat-Skript wurde bereits geladen.");
      }
    });

    document.body.appendChild(chatButton);
    console.log("Chat-Button wurde erfolgreich erstellt!");
  }

  function loadChatScript() {
    if (document.getElementById("chat-script")) {
      console.warn("LiveChat-Skript ist bereits geladen.");
      return;
    }

    console.log("Lade Chat-Skript...");
    const script = document.createElement("script");
    script.id = "chat-script";
    script.src = "https://cdn.livechatinc.com/tracking.js";
    script.async = true;
    document.head.appendChild(script);
  }

  async function loadChatConfig() {
    if (chatLoaded) {
      console.warn("Chat-Konfiguration wurde bereits geladen. Kein erneutes Laden.");
      return;
    }

    chatLoaded = true; // 💡 Setzt das Flag, um mehrfaches Laden zu verhindern
    const domain = window.location.hostname;
    const config = await getChatConfig(domain);

    if (config) {
      createChatButton(config);
    } else {
      console.error("Keine gültige Konfiguration gefunden.");
    }
  }

  // 💡 Skript nur einmal nachladen
  if (!chatLoaded) {
    await loadChatConfig();
  }
})();
