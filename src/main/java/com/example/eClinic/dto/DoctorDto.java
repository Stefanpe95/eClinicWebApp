package com.example.eClinic.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class DoctorDto {
	
	private long doctorid;
	private String speciality;
	
	private long departmentid;

	public long getDoctorid() {
		return doctorid;
	}

	public void setDoctorid(long doctorid) {
		this.doctorid = doctorid;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public long getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(long departmentid) {
		this.departmentid = departmentid;
	}


}
