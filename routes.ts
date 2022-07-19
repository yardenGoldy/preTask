import appointmentApi from "./components/appointment/appointmentApi";
import { Router } from "express";

class Routes {
    private _appRoutes: Router;
    constructor() {
        this._appRoutes = Router();

        this.initComponentsRoutes();

        this._appRoutes.get('/api', (req, res) => res.json({ application: 'App is good' }));
    }

    private initComponentsRoutes() {
        this._appRoutes.use("/appointments", appointmentApi);
    }

    get routes(): Router {
        return this._appRoutes;
    }
}

export default new Routes().routes;
