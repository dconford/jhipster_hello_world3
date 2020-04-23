package org.launchcode.liftoff.web.rest;

import org.launchcode.liftoff.JhipsterHelloWorld3App;
import org.launchcode.liftoff.domain.NeighborhoodData;
import org.launchcode.liftoff.repository.NeighborhoodDataRepository;
import org.launchcode.liftoff.service.NeighborhoodDataService;
import org.launchcode.liftoff.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static org.launchcode.liftoff.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NeighborhoodDataResource} REST controller.
 */
@SpringBootTest(classes = JhipsterHelloWorld3App.class)
public class NeighborhoodDataResourceIT {

    private static final String DEFAULT_NEIGHBORHOOD_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NEIGHBORHOOD_NAME = "BBBBBBBBBB";

    @Autowired
    private NeighborhoodDataRepository neighborhoodDataRepository;

    @Autowired
    private NeighborhoodDataService neighborhoodDataService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restNeighborhoodDataMockMvc;

    private NeighborhoodData neighborhoodData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NeighborhoodDataResource neighborhoodDataResource = new NeighborhoodDataResource(neighborhoodDataService);
        this.restNeighborhoodDataMockMvc = MockMvcBuilders.standaloneSetup(neighborhoodDataResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NeighborhoodData createEntity(EntityManager em) {
        NeighborhoodData neighborhoodData = new NeighborhoodData()
            .neighborhoodName(DEFAULT_NEIGHBORHOOD_NAME);
        return neighborhoodData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NeighborhoodData createUpdatedEntity(EntityManager em) {
        NeighborhoodData neighborhoodData = new NeighborhoodData()
            .neighborhoodName(UPDATED_NEIGHBORHOOD_NAME);
        return neighborhoodData;
    }

    @BeforeEach
    public void initTest() {
        neighborhoodData = createEntity(em);
    }

    @Test
    @Transactional
    public void createNeighborhoodData() throws Exception {
        int databaseSizeBeforeCreate = neighborhoodDataRepository.findAll().size();

        // Create the NeighborhoodData
        restNeighborhoodDataMockMvc.perform(post("/api/neighborhood-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neighborhoodData)))
            .andExpect(status().isCreated());

        // Validate the NeighborhoodData in the database
        List<NeighborhoodData> neighborhoodDataList = neighborhoodDataRepository.findAll();
        assertThat(neighborhoodDataList).hasSize(databaseSizeBeforeCreate + 1);
        NeighborhoodData testNeighborhoodData = neighborhoodDataList.get(neighborhoodDataList.size() - 1);
        assertThat(testNeighborhoodData.getNeighborhoodName()).isEqualTo(DEFAULT_NEIGHBORHOOD_NAME);
    }

    @Test
    @Transactional
    public void createNeighborhoodDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = neighborhoodDataRepository.findAll().size();

        // Create the NeighborhoodData with an existing ID
        neighborhoodData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNeighborhoodDataMockMvc.perform(post("/api/neighborhood-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neighborhoodData)))
            .andExpect(status().isBadRequest());

        // Validate the NeighborhoodData in the database
        List<NeighborhoodData> neighborhoodDataList = neighborhoodDataRepository.findAll();
        assertThat(neighborhoodDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNeighborhoodData() throws Exception {
        // Initialize the database
        neighborhoodDataRepository.saveAndFlush(neighborhoodData);

        // Get all the neighborhoodDataList
        restNeighborhoodDataMockMvc.perform(get("/api/neighborhood-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(neighborhoodData.getId().intValue())))
            .andExpect(jsonPath("$.[*].neighborhoodName").value(hasItem(DEFAULT_NEIGHBORHOOD_NAME)));
    }
    
    @Test
    @Transactional
    public void getNeighborhoodData() throws Exception {
        // Initialize the database
        neighborhoodDataRepository.saveAndFlush(neighborhoodData);

        // Get the neighborhoodData
        restNeighborhoodDataMockMvc.perform(get("/api/neighborhood-data/{id}", neighborhoodData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(neighborhoodData.getId().intValue()))
            .andExpect(jsonPath("$.neighborhoodName").value(DEFAULT_NEIGHBORHOOD_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingNeighborhoodData() throws Exception {
        // Get the neighborhoodData
        restNeighborhoodDataMockMvc.perform(get("/api/neighborhood-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNeighborhoodData() throws Exception {
        // Initialize the database
        neighborhoodDataService.save(neighborhoodData);

        int databaseSizeBeforeUpdate = neighborhoodDataRepository.findAll().size();

        // Update the neighborhoodData
        NeighborhoodData updatedNeighborhoodData = neighborhoodDataRepository.findById(neighborhoodData.getId()).get();
        // Disconnect from session so that the updates on updatedNeighborhoodData are not directly saved in db
        em.detach(updatedNeighborhoodData);
        updatedNeighborhoodData
            .neighborhoodName(UPDATED_NEIGHBORHOOD_NAME);

        restNeighborhoodDataMockMvc.perform(put("/api/neighborhood-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNeighborhoodData)))
            .andExpect(status().isOk());

        // Validate the NeighborhoodData in the database
        List<NeighborhoodData> neighborhoodDataList = neighborhoodDataRepository.findAll();
        assertThat(neighborhoodDataList).hasSize(databaseSizeBeforeUpdate);
        NeighborhoodData testNeighborhoodData = neighborhoodDataList.get(neighborhoodDataList.size() - 1);
        assertThat(testNeighborhoodData.getNeighborhoodName()).isEqualTo(UPDATED_NEIGHBORHOOD_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingNeighborhoodData() throws Exception {
        int databaseSizeBeforeUpdate = neighborhoodDataRepository.findAll().size();

        // Create the NeighborhoodData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNeighborhoodDataMockMvc.perform(put("/api/neighborhood-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neighborhoodData)))
            .andExpect(status().isBadRequest());

        // Validate the NeighborhoodData in the database
        List<NeighborhoodData> neighborhoodDataList = neighborhoodDataRepository.findAll();
        assertThat(neighborhoodDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNeighborhoodData() throws Exception {
        // Initialize the database
        neighborhoodDataService.save(neighborhoodData);

        int databaseSizeBeforeDelete = neighborhoodDataRepository.findAll().size();

        // Delete the neighborhoodData
        restNeighborhoodDataMockMvc.perform(delete("/api/neighborhood-data/{id}", neighborhoodData.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NeighborhoodData> neighborhoodDataList = neighborhoodDataRepository.findAll();
        assertThat(neighborhoodDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
