package org.launchcode.liftoff.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CodedDateData.
 */
@Entity
@Table(name = "coded_date_data")
public class CodedDateData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "coded_date_string")
    private String codedDateString;

    @OneToMany(mappedBy = "codedDateData")
    private Set<ReportedEvents> reportedEvents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodedDateString() {
        return codedDateString;
    }

    public CodedDateData codedDateString(String codedDateString) {
        this.codedDateString = codedDateString;
        return this;
    }

    public void setCodedDateString(String codedDateString) {
        this.codedDateString = codedDateString;
    }

    public Set<ReportedEvents> getReportedEvents() {
        return reportedEvents;
    }

    public CodedDateData reportedEvents(Set<ReportedEvents> reportedEvents) {
        this.reportedEvents = reportedEvents;
        return this;
    }

    public CodedDateData addReportedEvents(ReportedEvents reportedEvents) {
        this.reportedEvents.add(reportedEvents);
        reportedEvents.setCodedDateData(this);
        return this;
    }

    public CodedDateData removeReportedEvents(ReportedEvents reportedEvents) {
        this.reportedEvents.remove(reportedEvents);
        reportedEvents.setCodedDateData(null);
        return this;
    }

    public void setReportedEvents(Set<ReportedEvents> reportedEvents) {
        this.reportedEvents = reportedEvents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CodedDateData)) {
            return false;
        }
        return id != null && id.equals(((CodedDateData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CodedDateData{" +
            "id=" + getId() +
            ", codedDateString='" + getCodedDateString() + "'" +
            "}";
    }
}
