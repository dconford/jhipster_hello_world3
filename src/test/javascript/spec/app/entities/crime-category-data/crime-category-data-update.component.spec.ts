import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { CrimeCategoryDataUpdateComponent } from 'app/entities/crime-category-data/crime-category-data-update.component';
import { CrimeCategoryDataService } from 'app/entities/crime-category-data/crime-category-data.service';
import { CrimeCategoryData } from 'app/shared/model/crime-category-data.model';

describe('Component Tests', () => {
  describe('CrimeCategoryData Management Update Component', () => {
    let comp: CrimeCategoryDataUpdateComponent;
    let fixture: ComponentFixture<CrimeCategoryDataUpdateComponent>;
    let service: CrimeCategoryDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [CrimeCategoryDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CrimeCategoryDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrimeCategoryDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrimeCategoryDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CrimeCategoryData(123);
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
        const entity = new CrimeCategoryData();
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
