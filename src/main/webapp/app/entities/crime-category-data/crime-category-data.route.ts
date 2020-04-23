import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICrimeCategoryData, CrimeCategoryData } from 'app/shared/model/crime-category-data.model';
import { CrimeCategoryDataService } from './crime-category-data.service';
import { CrimeCategoryDataComponent } from './crime-category-data.component';
import { CrimeCategoryDataDetailComponent } from './crime-category-data-detail.component';
import { CrimeCategoryDataUpdateComponent } from './crime-category-data-update.component';

@Injectable({ providedIn: 'root' })
export class CrimeCategoryDataResolve implements Resolve<ICrimeCategoryData> {
  constructor(private service: CrimeCategoryDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrimeCategoryData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((crimeCategoryData: HttpResponse<CrimeCategoryData>) => {
          if (crimeCategoryData.body) {
            return of(crimeCategoryData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CrimeCategoryData());
  }
}

export const crimeCategoryDataRoute: Routes = [
  {
    path: '',
    component: CrimeCategoryDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrimeCategoryData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CrimeCategoryDataDetailComponent,
    resolve: {
      crimeCategoryData: CrimeCategoryDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrimeCategoryData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CrimeCategoryDataUpdateComponent,
    resolve: {
      crimeCategoryData: CrimeCategoryDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrimeCategoryData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CrimeCategoryDataUpdateComponent,
    resolve: {
      crimeCategoryData: CrimeCategoryDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrimeCategoryData'
    },
    canActivate: [UserRouteAccessService]
  }
];
