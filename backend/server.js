const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 5001;
dotenv.config({ path: "./config/config.env" });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
