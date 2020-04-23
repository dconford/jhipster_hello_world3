import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICodedDateData, CodedDateData } from 'app/shared/model/coded-date-data.model';
import { CodedDateDataService } from './coded-date-data.service';
import { CodedDateDataComponent } from './coded-date-data.component';
import { CodedDateDataDetailComponent } from './coded-date-data-detail.component';
import { CodedDateDataUpdateComponent } from './coded-date-data-update.component';

@Injectable({ providedIn: 'root' })
export class CodedDateDataResolve implements Resolve<ICodedDateData> {
  constructor(private service: CodedDateDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICodedDateData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((codedDateData: HttpResponse<CodedDateData>) => {
          if (codedDateData.body) {
            return of(codedDateData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CodedDateData());
  }
}

export const codedDateDataRoute: Routes = [
  {
    path: '',
    component: CodedDateDataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CodedDateData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CodedDateDataDetailComponent,
    resolve: {
      codedDateData: CodedDateDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CodedDateData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CodedDateDataUpdateComponent,
    resolve: {
      codedDateData: CodedDateDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CodedDateData'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CodedDateDataUpdateComponent,
    resolve: {
      codedDateData: CodedDateDataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CodedDateData'
    },
    canActivate: [UserRouteAccessService]
  }
];
