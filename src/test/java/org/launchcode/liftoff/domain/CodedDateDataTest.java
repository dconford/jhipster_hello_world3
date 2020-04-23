package org.launchcode.liftoff.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.launchcode.liftoff.web.rest.TestUtil;

public class CodedDateDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CodedDateData.class);
        CodedDateData codedDateData1 = new CodedDateData();
        codedDateData1.setId(1L);
        CodedDateData codedDateData2 = new CodedDateData();
        codedDateData2.setId(codedDateData1.getId());
        assertThat(codedDateData1).isEqualTo(codedDateData2);
        codedDateData2.setId(2L);
        assertThat(codedDateData1).isNotEqualTo(codedDateData2);
        codedDateData1.setId(null);
        assertThat(codedDateData1).isNotEqualTo(codedDateData2);
    }
}
