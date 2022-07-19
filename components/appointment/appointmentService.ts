import {AppointmentDal } from "./appointmentDAL";
import { IAppointmentDAL } from "./IAppointmentDAL";
import { IAppointmentRequest } from "./models/appointmentRequest";
import { IAppointmentSearchRequest } from "./models/appointmentSearchRequest";
export class AppointmentService {
    constructor(private _dal: IAppointmentDAL = new AppointmentDal()){

    }
    search(appointmentsSearchRequest: IAppointmentSearchRequest): Array<string> {
        const providers = this._dal.search(appointmentsSearchRequest);
        return providers;
    }

    save(appointmentsRequest: IAppointmentRequest): void {
        this._dal.save(appointmentsRequest);
    }
} 