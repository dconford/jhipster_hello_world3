package org.launchcode.liftoff.repository;

import org.launchcode.liftoff.domain.ReportedEvents;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReportedEvents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportedEventsRepository extends JpaRepository<ReportedEvents, Long> {

}
