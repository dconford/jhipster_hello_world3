import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INeighborhoodData, NeighborhoodData } from 'app/shared/model/neighborhood-data.model';
import { NeighborhoodDataService } from './neighborhood-data.service';
import { NeighborhoodDataComponent } from './neighborhood-data.component';
import { NeighborhoodDataDetailComponent } from './neighborhood-data-detail.component';
import { NeighborhoodDataUpdateComponent } from './neighborhood-data-update.component';

@Injectable({ providedIn: 'root' })
export class NeighborhoodDataResolve implements Resolve<INeighborhoodData> {
  constructor(private service: NeighborhoodDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INeighborhoodData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((neighborhoodData: HttpResponse<NeighborhoodData>) => {
          if (neighborhoodData.body) {
            return of(neighborhoodData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NeighborhoodData());
  }
}

export const neighborhoodDataRoute: Routes = [
  {
    path: '',
    component: NeighborhoodDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NeighborhoodData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NeighborhoodDataDetailComponent,
    resolve: {
      neighborhoodData: NeighborhoodDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NeighborhoodData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NeighborhoodDataUpdateComponent,
    resolve: {
      neighborhoodData: NeighborhoodDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NeighborhoodData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NeighborhoodDataUpdateComponent,
    resolve: {
      neighborhoodData: NeighborhoodDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NeighborhoodData'
    },
    canActivate: [UserRouteAccessService]
  }
];
