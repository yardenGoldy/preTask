import { IAppointmentDAL } from './IAppointmentDAL';
import { IAppointmentRequest } from "./models/appointmentRequest";
import { IAppointmentSearchRequest } from "./models/appointmentSearchRequest";
//const providers:Array<any> = require("./../../providers.json");
const providers:Array<any> = [
    {
      "name": "Jake Chambers",
      "score": 8.9,
      "specialties": [
        "Primary Care",
        "Cardiologist"
      ],
      "availableDates": [
        {
          "from": 1571637600000,
          "to": 1571666400000
        },
        {
          "from": 1579518000000,
          "to": 1579528800000
        }
      ]
    },
    {
      "name": "Roland Deschain",
      "score": 10,
      "specialties": [
        "Neurology",
        "Cardiologist"
      ],
      "availableDates": [
        {
          "from": 1571569200000,
          "to": 1571580000000
        },
        {
          "from": 1571637600000,
          "to": 1571666400000
        }
      ]
    },
    {
      "name": "Susannah Dean",
      "score": 9.2,
      "specialties": [
        "Neuropathy"
      ],
      "availableDates": [
        {
          "from": 1571569200000,
          "to": 1571580000000
        }
      ]
    },
    {
      "name": "Eddie Dean",
      "score": 8.3,
      "specialties": [
        "Pain Assistance",
        "Internist"
      ],
      "availableDates": []
    },
    {
      "name": "Oy Midworld",
      "score": 9.5,
      "specialties": [
        "Neonatal"
      ],
      "availableDates": [
        {
          "from": 814172400000,
          "to": 1634803200000
        }
      ]
    },
    {
      "name": "Randall Flagg",
      "score": 0.1,
      "specialties": [
        "Physiologist"
      ],
      "availableDates": [
        {
          "from": 1808982000000,
          "to": 1808982000000
        }
      ]
    }
  ];

export class AppointmentDal implements IAppointmentDAL {

    search(appointmentsSearchRequest: IAppointmentSearchRequest): Array<string> {
        var filteredProviders = [];
        for(let i = 0; i < providers.length;i++){
            const provider = providers[i];
            if(this.filterScore(provider, appointmentsSearchRequest.score) && 
               this.filterSpecialty(provider, appointmentsSearchRequest.specialty) &&
               this.filterDate(provider, appointmentsSearchRequest.date)){
                filteredProviders.push(provider);
               }
        }

        return filteredProviders.sort(elem => elem.score).map(x => x.name);
    }
    
    save(appointmentsRequest: IAppointmentRequest): void {
        
    }
    private filterScore(provider: any, score: number): boolean{
        return provider.score > score;
    }

    private filterSpecialty(provider: any, specialty: string): boolean{
        let specialties: Array<string> = provider.specialties;
        specialties = specialties.map(x => x.toUpperCase())
        return specialties.includes(specialty.toUpperCase());
        
    }

    private filterDate(provider: any, date: number): boolean{
        const availableDates: Array<any> = provider.availableDates;
        for(let i = 0; i < availableDates.length;i++){
            const currentDate = availableDates[i];
            if(date <= currentDate.to && date >= currentDate.from){
                return true;
            }
        }

        return false;
    }
}