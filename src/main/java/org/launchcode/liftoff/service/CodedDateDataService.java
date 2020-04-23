package org.launchcode.liftoff.service;

import org.launchcode.liftoff.domain.CodedDateData;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CodedDateData}.
 */
public interface CodedDateDataService {

    /**
     * Save a codedDateData.
     *
     * @param codedDateData the entity to save.
     * @return the persisted entity.
     */
    CodedDateData save(CodedDateData codedDateData);

    /**
     * Get all the codedDateData.
     *
     * @return the list of entities.
     */
    List<CodedDateData> findAll();

    /**
     * Get the "id" codedDateData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CodedDateData> findOne(Long id);

    /**
     * Delete the "id" codedDateData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
