package org.launchcode.liftoff.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.launchcode.liftoff.web.rest.TestUtil;

public class CrimeCategoryDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrimeCategoryData.class);
        CrimeCategoryData crimeCategoryData1 = new CrimeCategoryData();
        crimeCategoryData1.setId(1L);
        CrimeCategoryData crimeCategoryData2 = new CrimeCategoryData();
        crimeCategoryData2.setId(crimeCategoryData1.getId());
        assertThat(crimeCategoryData1).isEqualTo(crimeCategoryData2);
        crimeCategoryData2.setId(2L);
        assertThat(crimeCategoryData1).isNotEqualTo(crimeCategoryData2);
        crimeCategoryData1.setId(null);
        assertThat(crimeCategoryData1).isNotEqualTo(crimeCategoryData2);
    }
}
