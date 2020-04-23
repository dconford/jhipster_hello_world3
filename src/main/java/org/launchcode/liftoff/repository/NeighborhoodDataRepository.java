package org.launchcode.liftoff.repository;

import org.launchcode.liftoff.domain.NeighborhoodData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NeighborhoodData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NeighborhoodDataRepository extends JpaRepository<NeighborhoodData, Long> {

}
