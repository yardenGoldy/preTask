import { IAppointmentRequest } from "./models/appointmentRequest";
import { IAppointmentSearchRequest } from "./models/appointmentSearchRequest";

export interface IAppointmentDAL
{
    search(appointmentsSearchRequest: IAppointmentSearchRequest): Array<string>;
    save(appointmentsRequest: IAppointmentRequest);
}