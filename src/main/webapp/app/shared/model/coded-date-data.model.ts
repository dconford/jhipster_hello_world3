import { IReportedEvents } from 'app/shared/model/reported-events.model';

export interface ICodedDateData {
  id?: number;
  codedDateString?: string;
  reportedEvents?: IReportedEvents[];
}

export class CodedDateData implements ICodedDateData {
  constructor(public id?: number, public codedDateString?: string, public reportedEvents?: IReportedEvents[]) {}
}
