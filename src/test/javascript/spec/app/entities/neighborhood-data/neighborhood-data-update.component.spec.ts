import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterHelloWorld3TestModule } from '../../../test.module';
import { NeighborhoodDataUpdateComponent } from 'app/entities/neighborhood-data/neighborhood-data-update.component';
import { NeighborhoodDataService } from 'app/entities/neighborhood-data/neighborhood-data.service';
import { NeighborhoodData } from 'app/shared/model/neighborhood-data.model';

describe('Component Tests', () => {
  describe('NeighborhoodData Management Update Component', () => {
    let comp: NeighborhoodDataUpdateComponent;
    let fixture: ComponentFixture<NeighborhoodDataUpdateComponent>;
    let service: NeighborhoodDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHelloWorld3TestModule],
        declarations: [NeighborhoodDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NeighborhoodDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NeighborhoodDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeighborhoodDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NeighborhoodData(123);
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
        const entity = new NeighborhoodData();
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
