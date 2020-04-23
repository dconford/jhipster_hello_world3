package org.launchcode.liftoff.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NeighborhoodData.
 */
@Entity
@Table(name = "neighborhood_data")
public class NeighborhoodData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "neighborhood_name")
    private String neighborhoodName;

    @OneToMany(mappedBy = "neighborhoodData")
    private Set<ReportedEvents> reportedEvents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNeighborhoodName() {
        return neighborhoodName;
    }

    public NeighborhoodData neighborhoodName(String neighborhoodName) {
        this.neighborhoodName = neighborhoodName;
        return this;
    }

    public void setNeighborhoodName(String neighborhoodName) {
        this.neighborhoodName = neighborhoodName;
    }

    public Set<ReportedEvents> getReportedEvents() {
        return reportedEvents;
    }

    public NeighborhoodData reportedEvents(Set<ReportedEvents> reportedEvents) {
        this.reportedEvents = reportedEvents;
        return this;
    }

    public NeighborhoodData addReportedEvents(ReportedEvents reportedEvents) {
        this.reportedEvents.add(reportedEvents);
        reportedEvents.setNeighborhoodData(this);
        return this;
    }

    public NeighborhoodData removeReportedEvents(ReportedEvents reportedEvents) {
        this.reportedEvents.remove(reportedEvents);
        reportedEvents.setNeighborhoodData(null);
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
        if (!(o instanceof NeighborhoodData)) {
            return false;
        }
        return id != null && id.equals(((NeighborhoodData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NeighborhoodData{" +
            "id=" + getId() +
            ", neighborhoodName='" + getNeighborhoodName() + "'" +
            "}";
    }
}
