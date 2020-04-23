import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CrimeCategoryDataDetailComponent } from 'app/entities/crime-category-data/crime-category-data-detail.component';
import { CrimeCategoryData } from 'app/shared/model/crime-category-data.model';

describe('Component Tests', () => {
  describe('CrimeCategoryData Management Detail Component', () => {
    let comp: CrimeCategoryDataDetailComponent;
    let fixture: ComponentFixture<CrimeCategoryDataDetailComponent>;
    const route = ({ data: of({ crimeCategoryData: new CrimeCategoryData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CrimeCategoryDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CrimeCategoryDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrimeCategoryDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load crimeCategoryData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.crimeCategoryData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
