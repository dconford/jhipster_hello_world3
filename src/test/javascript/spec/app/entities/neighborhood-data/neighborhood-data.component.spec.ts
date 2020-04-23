import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { NeighborhoodDataComponent } from 'app/entities/neighborhood-data/neighborhood-data.component';
import { NeighborhoodDataService } from 'app/entities/neighborhood-data/neighborhood-data.service';
import { NeighborhoodData } from 'app/shared/model/neighborhood-data.model';

describe('Component Tests', () => {
  describe('NeighborhoodData Management Component', () => {
    let comp: NeighborhoodDataComponent;
    let fixture: ComponentFixture<NeighborhoodDataComponent>;
    let service: NeighborhoodDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [NeighborhoodDataComponent]
      })
        .overrideTemplate(NeighborhoodDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NeighborhoodDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeighborhoodDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NeighborhoodData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.neighborhoodData && comp.neighborhoodData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
