import { Application } from "express";
import * as express from "express";
class App {
    private _app: Application;
    constructor() {
        this._app = express();
        this.init();
        this.handleUncaughtException();
    }

    private handleUncaughtException() {
        process.on("uncaughtException", (err) => {
            // handle the error safely
            console.error(err);
        });
    }

    private init() {
        this._app.use(express.static("../src"));
        this._app.use(express.urlencoded({ extended: true }));
        this._app.use(express.json()); // parse application/json
        this.addErrorMiddleWares();
    }

    private addErrorMiddleWares(): void {
        this._app.use(function (err, req, res, next) {
            console.error(err.message);
            // If err has no specified error code, set error code to 'Internal Server Error (500)
            if (!err.statusCode) err.statusCode = 500;
            res.status(err.statusCode).send(err.message);
        });
    }

    get app(): Application {
        return this._app;
    }
}

export default new App().app;
