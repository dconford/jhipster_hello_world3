package org.launchcode.liftoff.service.impl;

import org.launchcode.liftoff.service.NeighborhoodDataService;
import org.launchcode.liftoff.domain.NeighborhoodData;
import org.launchcode.liftoff.repository.NeighborhoodDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link NeighborhoodData}.
 */
@Service
@Transactional
public class NeighborhoodDataServiceImpl implements NeighborhoodDataService {

    private final Logger log = LoggerFactory.getLogger(NeighborhoodDataServiceImpl.class);

    private final NeighborhoodDataRepository neighborhoodDataRepository;

    public NeighborhoodDataServiceImpl(NeighborhoodDataRepository neighborhoodDataRepository) {
        this.neighborhoodDataRepository = neighborhoodDataRepository;
    }

    /**
     * Save a neighborhoodData.
     *
     * @param neighborhoodData the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NeighborhoodData save(NeighborhoodData neighborhoodData) {
        log.debug("Request to save NeighborhoodData : {}", neighborhoodData);
        return neighborhoodDataRepository.save(neighborhoodData);
    }

    /**
     * Get all the neighborhoodData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NeighborhoodData> findAll() {
        log.debug("Request to get all NeighborhoodData");
        return neighborhoodDataRepository.findAll();
    }

    /**
     * Get one neighborhoodData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NeighborhoodData> findOne(Long id) {
        log.debug("Request to get NeighborhoodData : {}", id);
        return neighborhoodDataRepository.findById(id);
    }

    /**
     * Delete the neighborhoodData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NeighborhoodData : {}", id);
        neighborhoodDataRepository.deleteById(id);
    }
}
