import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INeighborhoodData } from 'app/shared/model/neighborhood-data.model';

type EntityResponseType = HttpResponse<INeighborhoodData>;
type EntityArrayResponseType = HttpResponse<INeighborhoodData[]>;

@Injectable({ providedIn: 'root' })
export class NeighborhoodDataService {
  public resourceUrl = SERVER_API_URL + 'api/neighborhood-data';

  constructor(protected http: HttpClient) {}

  create(neighborhoodData: INeighborhoodData): Observable<EntityResponseType> {
    return this.http.post<INeighborhoodData>(this.resourceUrl, neighborhoodData, { observe: 'response' });
  }

  update(neighborhoodData: INeighborhoodData): Observable<EntityResponseType> {
    return this.http.put<INeighborhoodData>(this.resourceUrl, neighborhoodData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INeighborhoodData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INeighborhoodData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
