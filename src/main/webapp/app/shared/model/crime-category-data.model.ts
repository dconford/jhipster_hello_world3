import { IReportedEvents } from 'app/shared/model/reported-events.model';

export interface ICrimeCategoryData {
  id?: number;
  crimeCategory?: string;
  reportedEvents?: IReportedEvents[];
}

export class CrimeCategoryData implements ICrimeCategoryData {
  constructor(public id?: number, public crimeCategory?: string, public reportedEvents?: IReportedEvents[]) {}
}
