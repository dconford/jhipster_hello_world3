package org.launchcode.liftoff.repository;

import org.launchcode.liftoff.domain.CrimeCategoryData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CrimeCategoryData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrimeCategoryDataRepository extends JpaRepository<CrimeCategoryData, Long> {

}
