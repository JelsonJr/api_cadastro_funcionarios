import { App } from "./app"
import { connection } from "./app/config/connection";
import { config } from "./app/config/config";

new App().server.listen(config.port, () => {
    connection();
    console.log('Server start at port:', config.port);
});