package org.launchcode.liftoff.web.rest;

import org.launchcode.liftoff.domain.NeighborhoodData;
import org.launchcode.liftoff.service.NeighborhoodDataService;
import org.launchcode.liftoff.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.launchcode.liftoff.domain.NeighborhoodData}.
 */
@RestController
@RequestMapping("/api")
public class NeighborhoodDataResource {

    private final Logger log = LoggerFactory.getLogger(NeighborhoodDataResource.class);

    private static final String ENTITY_NAME = "neighborhoodData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NeighborhoodDataService neighborhoodDataService;

    public NeighborhoodDataResource(NeighborhoodDataService neighborhoodDataService) {
        this.neighborhoodDataService = neighborhoodDataService;
    }

    /**
     * {@code POST  /neighborhood-data} : Create a new neighborhoodData.
     *
     * @param neighborhoodData the neighborhoodData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new neighborhoodData, or with status {@code 400 (Bad Request)} if the neighborhoodData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/neighborhood-data")
    public ResponseEntity<NeighborhoodData> createNeighborhoodData(@RequestBody NeighborhoodData neighborhoodData) throws URISyntaxException {
        log.debug("REST request to save NeighborhoodData : {}", neighborhoodData);
        if (neighborhoodData.getId() != null) {
            throw new BadRequestAlertException("A new neighborhoodData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NeighborhoodData result = neighborhoodDataService.save(neighborhoodData);
        return ResponseEntity.created(new URI("/api/neighborhood-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /neighborhood-data} : Updates an existing neighborhoodData.
     *
     * @param neighborhoodData the neighborhoodData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated neighborhoodData,
     * or with status {@code 400 (Bad Request)} if the neighborhoodData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the neighborhoodData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/neighborhood-data")
    public ResponseEntity<NeighborhoodData> updateNeighborhoodData(@RequestBody NeighborhoodData neighborhoodData) throws URISyntaxException {
        log.debug("REST request to update NeighborhoodData : {}", neighborhoodData);
        if (neighborhoodData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NeighborhoodData result = neighborhoodDataService.save(neighborhoodData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, neighborhoodData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /neighborhood-data} : get all the neighborhoodData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of neighborhoodData in body.
     */
    @GetMapping("/neighborhood-data")
    public List<NeighborhoodData> getAllNeighborhoodData() {
        log.debug("REST request to get all NeighborhoodData");
        return neighborhoodDataService.findAll();
    }

    /**
     * {@code GET  /neighborhood-data/:id} : get the "id" neighborhoodData.
     *
     * @param id the id of the neighborhoodData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the neighborhoodData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/neighborhood-data/{id}")
    public ResponseEntity<NeighborhoodData> getNeighborhoodData(@PathVariable Long id) {
        log.debug("REST request to get NeighborhoodData : {}", id);
        Optional<NeighborhoodData> neighborhoodData = neighborhoodDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(neighborhoodData);
    }

    /**
     * {@code DELETE  /neighborhood-data/:id} : delete the "id" neighborhoodData.
     *
     * @param id the id of the neighborhoodData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/neighborhood-data/{id}")
    public ResponseEntity<Void> deleteNeighborhoodData(@PathVariable Long id) {
        log.debug("REST request to delete NeighborhoodData : {}", id);
        neighborhoodDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
