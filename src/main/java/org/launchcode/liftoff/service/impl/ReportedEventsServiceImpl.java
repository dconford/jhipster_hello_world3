package org.launchcode.liftoff.service.impl;

import org.launchcode.liftoff.service.ReportedEventsService;
import org.launchcode.liftoff.domain.ReportedEvents;
import org.launchcode.liftoff.repository.ReportedEventsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ReportedEvents}.
 */
@Service
@Transactional
public class ReportedEventsServiceImpl implements ReportedEventsService {

    private final Logger log = LoggerFactory.getLogger(ReportedEventsServiceImpl.class);

    private final ReportedEventsRepository reportedEventsRepository;

    public ReportedEventsServiceImpl(ReportedEventsRepository reportedEventsRepository) {
        this.reportedEventsRepository = reportedEventsRepository;
    }

    /**
     * Save a reportedEvents.
     *
     * @param reportedEvents the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReportedEvents save(ReportedEvents reportedEvents) {
        log.debug("Request to save ReportedEvents : {}", reportedEvents);
        return reportedEventsRepository.save(reportedEvents);
    }

    /**
     * Get all the reportedEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReportedEvents> findAll(Pageable pageable) {
        log.debug("Request to get all ReportedEvents");
        return reportedEventsRepository.findAll(pageable);
    }

    /**
     * Get one reportedEvents by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReportedEvents> findOne(Long id) {
        log.debug("Request to get ReportedEvents : {}", id);
        return reportedEventsRepository.findById(id);
    }

    /**
     * Delete the reportedEvents by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReportedEvents : {}", id);
        reportedEventsRepository.deleteById(id);
    }
}
