package org.launchcode.liftoff.service.impl;

import org.launchcode.liftoff.service.CodedDateDataService;
import org.launchcode.liftoff.domain.CodedDateData;
import org.launchcode.liftoff.repository.CodedDateDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CodedDateData}.
 */
@Service
@Transactional
public class CodedDateDataServiceImpl implements CodedDateDataService {

    private final Logger log = LoggerFactory.getLogger(CodedDateDataServiceImpl.class);

    private final CodedDateDataRepository codedDateDataRepository;

    public CodedDateDataServiceImpl(CodedDateDataRepository codedDateDataRepository) {
        this.codedDateDataRepository = codedDateDataRepository;
    }

    /**
     * Save a codedDateData.
     *
     * @param codedDateData the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CodedDateData save(CodedDateData codedDateData) {
        log.debug("Request to save CodedDateData : {}", codedDateData);
        return codedDateDataRepository.save(codedDateData);
    }

    /**
     * Get all the codedDateData.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CodedDateData> findAll() {
        log.debug("Request to get all CodedDateData");
        return codedDateDataRepository.findAll();
    }

    /**
     * Get one codedDateData by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CodedDateData> findOne(Long id) {
        log.debug("Request to get CodedDateData : {}", id);
        return codedDateDataRepository.findById(id);
    }

    /**
     * Delete the codedDateData by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CodedDateData : {}", id);
        codedDateDataRepository.deleteById(id);
    }
}
