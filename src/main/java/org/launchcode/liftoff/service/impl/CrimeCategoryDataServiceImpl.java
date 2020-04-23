package org.launchcode.liftoff.service.impl;

import org.launchcode.liftoff.service.CrimeCategoryDataService;
import org.launchcode.liftoff.domain.CrimeCategoryData;
import org.launchcode.liftoff.repository.CrimeCategoryDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CrimeCategoryData}.
 */
@Service
@Transactional
public class CrimeCategoryDataServiceImpl implements CrimeCategoryDataService {

    private final Logger log = LoggerFactory.getLogger(CrimeCategoryDataServiceImpl.class);

    private final CrimeCategoryDataRepository crimeCategoryDataRepository;

    public CrimeCategoryDataServiceImpl(CrimeCategoryDataRepository crimeCategoryDataRepository) {
        this.crimeCategoryDataRepository = crimeCategoryDataRepository;
    }

    /**
     * Save a crimeCategoryData.
     *
     * @param crimeCategoryData the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CrimeCategoryData save(CrimeCategoryData crimeCategoryData) {
        log.debug("Request to save CrimeCategoryData : {}", crimeCategoryData);
        return crimeCategoryDataRepository.save(crimeCategoryData);
    }

    /**
     * Get all the crimeCategoryData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CrimeCategoryData> findAll() {
        log.debug("Request to get all CrimeCategoryData");
        return crimeCategoryDataRepository.findAll();
    }

    /**
     * Get one crimeCategoryData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CrimeCategoryData> findOne(Long id) {
        log.debug("Request to get CrimeCategoryData : {}", id);
        return crimeCategoryDataRepository.findById(id);
    }

    /**
     * Delete the crimeCategoryData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CrimeCategoryData : {}", id);
        crimeCategoryDataRepository.deleteById(id);
    }
}
