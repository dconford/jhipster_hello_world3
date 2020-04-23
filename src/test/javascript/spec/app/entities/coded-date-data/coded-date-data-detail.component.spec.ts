import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CodedDateDataDetailComponent } from 'app/entities/coded-date-data/coded-date-data-detail.component';
import { CodedDateData } from 'app/shared/model/coded-date-data.model';

describe('Component Tests', () => {
  describe('CodedDateData Management Detail Component', () => {
    let comp: CodedDateDataDetailComponent;
    let fixture: ComponentFixture<CodedDateDataDetailComponent>;
    const route = ({ data: of({ codedDateData: new CodedDateData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CodedDateDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CodedDateDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CodedDateDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load codedDateData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.codedDateData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
