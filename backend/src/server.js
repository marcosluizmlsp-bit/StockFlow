
require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env")
});

require("./database/initDatabase");

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`StockFlow API running on port ${PORT}`);
});
