import app from "./app.js";

// Port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Port running on localhost:${PORT}`));
