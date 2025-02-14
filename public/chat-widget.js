(async function() {
    const SUPABASE_URL = "https://woncqwpykmpabylrhzcw.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbmNxd3B5a21wYWJ5bHJoemN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NTM3NjYsImV4cCI6MjA1NTEyOTc2Nn0.3SzQqBxBADQQvz376890008cSX_ACYcHJ8rlBCFcY24";
  
    async function getChatConfig(domain) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/chat_config?domain=eq.${domain}&select=*`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
  
      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    }
  
    function createChatButton(config) {
      if (!config) return;
  
      const chatButton = document.createElement("button");
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
        if (!localStorage.getItem("chat_consent")) {
          const consent = confirm(config.consent_text);
          if (consent) {
            localStorage.setItem("chat_consent", "true");
            loadChatScript();
          }
        } else {
          loadChatScript();
        }
      });
  
      document.body.appendChild(chatButton);
    }
  
    function loadChatScript() {
      const script = document.createElement("script");
      script.src = "https://cdn.livechatinc.com/tracking.js";
      script.async = true;
      document.head.appendChild(script);
    }
  
    const domain = window.location.hostname;
    const config = await getChatConfig(domain);
    createChatButton(config);
  })();
  