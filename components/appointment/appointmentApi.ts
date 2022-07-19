import { AppointmentService } from './appointmentService';
import { Router } from "express";
import { IAppointmentSearchRequest } from './models/appointmentSearchRequest';
import { IAppointmentRequest } from './models/appointmentRequest';
class AppointmentApi  {
    private _appointmentRoutes: Router;
    private _appointmentService: AppointmentService;

    constructor() {
        this._appointmentRoutes = Router();
        this._appointmentService = new AppointmentService();
        this.InitRoutes();
    }

    private InitRoutes() {
        this._appointmentRoutes.get("/alive", (req, res): void => {
            res.send(true);
        });
        this._appointmentRoutes.get("/", (req, res) => {
            if(!this.checkParams(req.query))
            {
                res.status(400).send("invalid params");
                return;
            }
            var appointmentsSearchRequest: IAppointmentSearchRequest =  {
                specialty: req.query.specialty.toString(),
                date: parseInt(req.query.date.toString()),
                score: parseInt(req.query.minScore.toString())
            }
            const providers = this._appointmentService.search(appointmentsSearchRequest);
            res.send(providers);
        });

        this._appointmentRoutes.post("/", async (req, res) => {
            var appointmentsRequest: IAppointmentRequest =  {
                name: req.body.name,
                date: parseInt(req.body.date)
            }
            const users = this._appointmentService.save(appointmentsRequest);
            res.send(users);
        });
    }

    private checkParams(query: any):boolean{
        const date = new Date(parseInt(query.date));
        var isValid = (query.specialty != "" && typeof date.getMonth === 'function' && !isNaN(query.minScore));
        return isValid;

    }
    get appointmentRoutes(): Router {
        return this._appointmentRoutes;
    }
}

export default new AppointmentApi().appointmentRoutes;
