import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICrimeCategoryData } from 'app/shared/model/crime-category-data.model';

type EntityResponseType = HttpResponse<ICrimeCategoryData>;
type EntityArrayResponseType = HttpResponse<ICrimeCategoryData[]>;

@Injectable({ providedIn: 'root' })
export class CrimeCategoryDataService {
  public resourceUrl = SERVER_API_URL + 'api/crime-category-data';

  constructor(protected http: HttpClient) {}

  create(crimeCategoryData: ICrimeCategoryData): Observable<EntityResponseType> {
    return this.http.post<ICrimeCategoryData>(this.resourceUrl, crimeCategoryData, { observe: 'response' });
  }

  update(crimeCategoryData: ICrimeCategoryData): Observable<EntityResponseType> {
    return this.http.put<ICrimeCategoryData>(this.resourceUrl, crimeCategoryData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrimeCategoryData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrimeCategoryData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
