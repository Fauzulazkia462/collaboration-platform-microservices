require('dotenv').config();
const app = require('./src/app');
const initDb = require('./src/config/dbInit');

const PORT = process.env.PORT || 3001;

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Project Service running on port ${PORT}`);
    });
});