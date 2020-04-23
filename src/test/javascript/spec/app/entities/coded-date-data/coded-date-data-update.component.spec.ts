import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CodedDateDataUpdateComponent } from 'app/entities/coded-date-data/coded-date-data-update.component';
import { CodedDateDataService } from 'app/entities/coded-date-data/coded-date-data.service';
import { CodedDateData } from 'app/shared/model/coded-date-data.model';

describe('Component Tests', () => {
  describe('CodedDateData Management Update Component', () => {
    let comp: CodedDateDataUpdateComponent;
    let fixture: ComponentFixture<CodedDateDataUpdateComponent>;
    let service: CodedDateDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CodedDateDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CodedDateDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CodedDateDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CodedDateDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CodedDateData(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CodedDateData();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
