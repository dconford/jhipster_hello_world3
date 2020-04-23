package org.launchcode.liftoff.service;

import org.launchcode.liftoff.domain.CrimeCategoryData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CrimeCategoryData}.
 */
public interface CrimeCategoryDataService {

    /**
     * Save a crimeCategoryData.
     *
     * @param crimeCategoryData the entity to save.
     * @return the persisted entity.
     */
    CrimeCategoryData save(CrimeCategoryData crimeCategoryData);

    /**
     * Get all the crimeCategoryData.
     *
     * @return the list of entities.
     */
    List<CrimeCategoryData> findAll();

    /**
     * Get the "id" crimeCategoryData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CrimeCategoryData> findOne(Long id);

    /**
     * Delete the "id" crimeCategoryData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
