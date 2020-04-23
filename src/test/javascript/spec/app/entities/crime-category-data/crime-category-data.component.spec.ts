import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CrimeCategoryDataComponent } from 'app/entities/crime-category-data/crime-category-data.component';
import { CrimeCategoryDataService } from 'app/entities/crime-category-data/crime-category-data.service';
import { CrimeCategoryData } from 'app/shared/model/crime-category-data.model';

describe('Component Tests', () => {
  describe('CrimeCategoryData Management Component', () => {
    let comp: CrimeCategoryDataComponent;
    let fixture: ComponentFixture<CrimeCategoryDataComponent>;
    let service: CrimeCategoryDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CrimeCategoryDataComponent]
      })
        .overrideTemplate(CrimeCategoryDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrimeCategoryDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrimeCategoryDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CrimeCategoryData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.crimeCategoryData && comp.crimeCategoryData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
