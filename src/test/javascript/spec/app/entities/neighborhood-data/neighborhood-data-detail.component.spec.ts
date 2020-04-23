import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { NeighborhoodDataDetailComponent } from 'app/entities/neighborhood-data/neighborhood-data-detail.component';
import { NeighborhoodData } from 'app/shared/model/neighborhood-data.model';

describe('Component Tests', () => {
  describe('NeighborhoodData Management Detail Component', () => {
    let comp: NeighborhoodDataDetailComponent;
    let fixture: ComponentFixture<NeighborhoodDataDetailComponent>;
    const route = ({ data: of({ neighborhoodData: new NeighborhoodData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [NeighborhoodDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NeighborhoodDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NeighborhoodDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load neighborhoodData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.neighborhoodData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
