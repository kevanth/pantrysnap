PantrySnap 📸
Snap a photo of your grocery receipt — PantrySnap reads it and updates your pantry list automatically.
Live Demo →
Show Image

What It Does

Upload a photo of a grocery receipt
AI reads it and extracts every item and quantity
Your pantry list updates instantly
Items persist between sessions so you always know what you have


Built With

React — UI and state management
Claude API (Anthropic) — vision model to read receipt images
Tailwind CSS — styling
localStorage — client-side persistence, no backend needed
Vercel — deployment


Running Locally
Prerequisites: Node.js 18+, an Anthropic API key
bashgit clone https://github.com/yourusername/pantrysnap.git
cd pantrysnap
npm install
npm run dev
When the app opens, paste your Anthropic API key into the the API field after the camera button. It's stored in your browser only — never sent anywhere else.

How the AI Part Works
When you upload a receipt photo, the app sends it to Claude's vision model with a prompt asking for a structured list of items and quantities. Claude returns JSON, which gets merged into your existing pantry list.
js// The core API call
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageData } },
        { type: "text", text: "Extract all grocery items from this receipt. Return JSON only: [{\"item\": string, \"quantity\": number}]" }
      ]
    }]
  })
});

Design Decisions
No backend — everything runs in the browser. localStorage handles persistence and the API key never touches a server, making this completely free to deploy and run.
User-supplied API key — rather than hiding a key server-side (which adds backend complexity), users paste their own key. Costs roughly $0.02–0.05 per receipt scan.
