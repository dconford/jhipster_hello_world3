package org.launchcode.liftoff.web.rest;

import org.launchcode.liftoff.JhipsterHelloWorld3App;
import org.launchcode.liftoff.domain.CodedDateData;
import org.launchcode.liftoff.repository.CodedDateDataRepository;
import org.launchcode.liftoff.service.CodedDateDataService;
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
 * Integration tests for the {@link CodedDateDataResource} REST controller.
 */
@SpringBootTest(classes = JhipsterHelloWorld3App.class)
public class CodedDateDataResourceIT {

    private static final String DEFAULT_CODED_DATE_STRING = "AAAAAAAAAA";
    private static final String UPDATED_CODED_DATE_STRING = "BBBBBBBBBB";

    @Autowired
    private CodedDateDataRepository codedDateDataRepository;

    @Autowired
    private CodedDateDataService codedDateDataService;

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

    private MockMvc restCodedDateDataMockMvc;

    private CodedDateData codedDateData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CodedDateDataResource codedDateDataResource = new CodedDateDataResource(codedDateDataService);
        this.restCodedDateDataMockMvc = MockMvcBuilders.standaloneSetup(codedDateDataResource)
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
    public static CodedDateData createEntity(EntityManager em) {
        CodedDateData codedDateData = new CodedDateData()
            .codedDateString(DEFAULT_CODED_DATE_STRING);
        return codedDateData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CodedDateData createUpdatedEntity(EntityManager em) {
        CodedDateData codedDateData = new CodedDateData()
            .codedDateString(UPDATED_CODED_DATE_STRING);
        return codedDateData;
    }

    @BeforeEach
    public void initTest() {
        codedDateData = createEntity(em);
    }

    @Test
    @Transactional
    public void createCodedDateData() throws Exception {
        int databaseSizeBeforeCreate = codedDateDataRepository.findAll().size();

        // Create the CodedDateData
        restCodedDateDataMockMvc.perform(post("/api/coded-date-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(codedDateData)))
            .andExpect(status().isCreated());

        // Validate the CodedDateData in the database
        List<CodedDateData> codedDateDataList = codedDateDataRepository.findAll();
        assertThat(codedDateDataList).hasSize(databaseSizeBeforeCreate + 1);
        CodedDateData testCodedDateData = codedDateDataList.get(codedDateDataList.size() - 1);
        assertThat(testCodedDateData.getCodedDateString()).isEqualTo(DEFAULT_CODED_DATE_STRING);
    }

    @Test
    @Transactional
    public void createCodedDateDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = codedDateDataRepository.findAll().size();

        // Create the CodedDateData with an existing ID
        codedDateData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCodedDateDataMockMvc.perform(post("/api/coded-date-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(codedDateData)))
            .andExpect(status().isBadRequest());

        // Validate the CodedDateData in the database
        List<CodedDateData> codedDateDataList = codedDateDataRepository.findAll();
        assertThat(codedDateDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCodedDateData() throws Exception {
        // Initialize the database
        codedDateDataRepository.saveAndFlush(codedDateData);

        // Get all the codedDateDataList
        restCodedDateDataMockMvc.perform(get("/api/coded-date-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(codedDateData.getId().intValue())))
            .andExpect(jsonPath("$.[*].codedDateString").value(hasItem(DEFAULT_CODED_DATE_STRING)));
    }
    
    @Test
    @Transactional
    public void getCodedDateData() throws Exception {
        // Initialize the database
        codedDateDataRepository.saveAndFlush(codedDateData);

        // Get the codedDateData
        restCodedDateDataMockMvc.perform(get("/api/coded-date-data/{id}", codedDateData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(codedDateData.getId().intValue()))
            .andExpect(jsonPath("$.codedDateString").value(DEFAULT_CODED_DATE_STRING));
    }

    @Test
    @Transactional
    public void getNonExistingCodedDateData() throws Exception {
        // Get the codedDateData
        restCodedDateDataMockMvc.perform(get("/api/coded-date-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCodedDateData() throws Exception {
        // Initialize the database
        codedDateDataService.save(codedDateData);

        int databaseSizeBeforeUpdate = codedDateDataRepository.findAll().size();

        // Update the codedDateData
        CodedDateData updatedCodedDateData = codedDateDataRepository.findById(codedDateData.getId()).get();
        // Disconnect from session so that the updates on updatedCodedDateData are not directly saved in db
        em.detach(updatedCodedDateData);
        updatedCodedDateData
            .codedDateString(UPDATED_CODED_DATE_STRING);

        restCodedDateDataMockMvc.perform(put("/api/coded-date-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCodedDateData)))
            .andExpect(status().isOk());

        // Validate the CodedDateData in the database
        List<CodedDateData> codedDateDataList = codedDateDataRepository.findAll();
        assertThat(codedDateDataList).hasSize(databaseSizeBeforeUpdate);
        CodedDateData testCodedDateData = codedDateDataList.get(codedDateDataList.size() - 1);
        assertThat(testCodedDateData.getCodedDateString()).isEqualTo(UPDATED_CODED_DATE_STRING);
    }

    @Test
    @Transactional
    public void updateNonExistingCodedDateData() throws Exception {
        int databaseSizeBeforeUpdate = codedDateDataRepository.findAll().size();

        // Create the CodedDateData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCodedDateDataMockMvc.perform(put("/api/coded-date-data")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(codedDateData)))
            .andExpect(status().isBadRequest());

        // Validate the CodedDateData in the database
        List<CodedDateData> codedDateDataList = codedDateDataRepository.findAll();
        assertThat(codedDateDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCodedDateData() throws Exception {
        // Initialize the database
        codedDateDataService.save(codedDateData);

        int databaseSizeBeforeDelete = codedDateDataRepository.findAll().size();

        // Delete the codedDateData
        restCodedDateDataMockMvc.perform(delete("/api/coded-date-data/{id}", codedDateData.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CodedDateData> codedDateDataList = codedDateDataRepository.findAll();
        assertThat(codedDateDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
