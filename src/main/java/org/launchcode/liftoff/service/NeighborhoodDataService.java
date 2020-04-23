package org.launchcode.liftoff.service;

import org.launchcode.liftoff.domain.NeighborhoodData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link NeighborhoodData}.
 */
public interface NeighborhoodDataService {

    /**
     * Save a neighborhoodData.
     *
     * @param neighborhoodData the entity to save.
     * @return the persisted entity.
     */
    NeighborhoodData save(NeighborhoodData neighborhoodData);

    /**
     * Get all the neighborhoodData.
     *
     * @return the list of entities.
     */
    List<NeighborhoodData> findAll();

    /**
     * Get the "id" neighborhoodData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NeighborhoodData> findOne(Long id);

    /**
     * Delete the "id" neighborhoodData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
