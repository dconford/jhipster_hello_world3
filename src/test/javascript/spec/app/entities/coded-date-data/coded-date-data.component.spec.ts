import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CodedDateDataComponent } from 'app/entities/coded-date-data/coded-date-data.component';
import { CodedDateDataService } from 'app/entities/coded-date-data/coded-date-data.service';
import { CodedDateData } from 'app/shared/model/coded-date-data.model';

describe('Component Tests', () => {
  describe('CodedDateData Management Component', () => {
    let comp: CodedDateDataComponent;
    let fixture: ComponentFixture<CodedDateDataComponent>;
    let service: CodedDateDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CodedDateDataComponent]
      })
        .overrideTemplate(CodedDateDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CodedDateDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CodedDateDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CodedDateData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.codedDateData && comp.codedDateData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
