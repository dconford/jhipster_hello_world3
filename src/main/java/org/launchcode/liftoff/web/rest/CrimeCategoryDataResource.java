package org.launchcode.liftoff.web.rest;

import org.launchcode.liftoff.domain.CrimeCategoryData;
import org.launchcode.liftoff.service.CrimeCategoryDataService;
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
 * REST controller for managing {@link org.launchcode.liftoff.domain.CrimeCategoryData}.
 */
@RestController
@RequestMapping("/api")
public class CrimeCategoryDataResource {

    private final Logger log = LoggerFactory.getLogger(CrimeCategoryDataResource.class);

    private static final String ENTITY_NAME = "crimeCategoryData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrimeCategoryDataService crimeCategoryDataService;

    public CrimeCategoryDataResource(CrimeCategoryDataService crimeCategoryDataService) {
        this.crimeCategoryDataService = crimeCategoryDataService;
    }

    /**
     * {@code POST  /crime-category-data} : Create a new crimeCategoryData.
     *
     * @param crimeCategoryData the crimeCategoryData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crimeCategoryData, or with status {@code 400 (Bad Request)} if the crimeCategoryData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crime-category-data")
    public ResponseEntity<CrimeCategoryData> createCrimeCategoryData(@RequestBody CrimeCategoryData crimeCategoryData) throws URISyntaxException {
        log.debug("REST request to save CrimeCategoryData : {}", crimeCategoryData);
        if (crimeCategoryData.getId() != null) {
            throw new BadRequestAlertException("A new crimeCategoryData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrimeCategoryData result = crimeCategoryDataService.save(crimeCategoryData);
        return ResponseEntity.created(new URI("/api/crime-category-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crime-category-data} : Updates an existing crimeCategoryData.
     *
     * @param crimeCategoryData the crimeCategoryData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crimeCategoryData,
     * or with status {@code 400 (Bad Request)} if the crimeCategoryData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crimeCategoryData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crime-category-data")
    public ResponseEntity<CrimeCategoryData> updateCrimeCategoryData(@RequestBody CrimeCategoryData crimeCategoryData) throws URISyntaxException {
        log.debug("REST request to update CrimeCategoryData : {}", crimeCategoryData);
        if (crimeCategoryData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CrimeCategoryData result = crimeCategoryDataService.save(crimeCategoryData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crimeCategoryData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /crime-category-data} : get all the crimeCategoryData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crimeCategoryData in body.
     */
    @GetMapping("/crime-category-data")
    public List<CrimeCategoryData> getAllCrimeCategoryData() {
        log.debug("REST request to get all CrimeCategoryData");
        return crimeCategoryDataService.findAll();
    }

    /**
     * {@code GET  /crime-category-data/:id} : get the "id" crimeCategoryData.
     *
     * @param id the id of the crimeCategoryData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crimeCategoryData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crime-category-data/{id}")
    public ResponseEntity<CrimeCategoryData> getCrimeCategoryData(@PathVariable Long id) {
        log.debug("REST request to get CrimeCategoryData : {}", id);
        Optional<CrimeCategoryData> crimeCategoryData = crimeCategoryDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(crimeCategoryData);
    }

    /**
     * {@code DELETE  /crime-category-data/:id} : delete the "id" crimeCategoryData.
     *
     * @param id the id of the crimeCategoryData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crime-category-data/{id}")
    public ResponseEntity<Void> deleteCrimeCategoryData(@PathVariable Long id) {
        log.debug("REST request to delete CrimeCategoryData : {}", id);
        crimeCategoryDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
