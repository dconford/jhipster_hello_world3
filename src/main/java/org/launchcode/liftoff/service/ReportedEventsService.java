package org.launchcode.liftoff.service;

import org.launchcode.liftoff.domain.ReportedEvents;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ReportedEvents}.
 */
public interface ReportedEventsService {

    /**
     * Save a reportedEvents.
     *
     * @param reportedEvents the entity to save.
     * @return the persisted entity.
     */
    ReportedEvents save(ReportedEvents reportedEvents);

    /**
     * Get all the reportedEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReportedEvents> findAll(Pageable pageable);

    /**
     * Get the "id" reportedEvents.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReportedEvents> findOne(Long id);

    /**
     * Delete the "id" reportedEvents.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
