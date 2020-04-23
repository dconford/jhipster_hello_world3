import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICodedDateData } from 'app/shared/model/coded-date-data.model';

type EntityResponseType = HttpResponse<ICodedDateData>;
type EntityArrayResponseType = HttpResponse<ICodedDateData[]>;

@Injectable({ providedIn: 'root' })
export class CodedDateDataService {
  public resourceUrl = SERVER_API_URL + 'api/coded-date-data';

  constructor(protected http: HttpClient) {}

  create(codedDateData: ICodedDateData): Observable<EntityResponseType> {
    return this.http.post<ICodedDateData>(this.resourceUrl, codedDateData, { observe: 'response' });
  }

  update(codedDateData: ICodedDateData): Observable<EntityResponseType> {
    return this.http.put<ICodedDateData>(this.resourceUrl, codedDateData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICodedDateData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICodedDateData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
