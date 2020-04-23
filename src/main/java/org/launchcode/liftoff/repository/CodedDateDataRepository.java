package org.launchcode.liftoff.repository;

import org.launchcode.liftoff.domain.CodedDateData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CodedDateData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CodedDateDataRepository extends JpaRepository<CodedDateData, Long> {

}
