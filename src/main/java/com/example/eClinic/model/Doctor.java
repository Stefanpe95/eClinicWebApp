package com.example.eClinic.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Doctor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long doctorID;
	
	@OneToMany(mappedBy = "doctor")
	private List<User> users=new ArrayList<>();
	
	@Basic
	private String speciality;
	
	@Column(unique=true)
	private long doctorPID;
	
	@OneToMany(mappedBy = "doctor")
	private List<Appointment> appointments=new ArrayList<>();
	
    @ManyToOne
    @JoinColumn(name="departmentid",nullable = false)
    private Department department;
	
	  public long getDoctorPID() {
		return doctorPID;
	}

	public void setDoctorPID(long doctorPID) {
		this.doctorPID = doctorPID;
	}

	public long getDoctorID() { return doctorID; }
	  
	  public void setDoctorID(long doctorID) { this.doctorID = doctorID; }
	 

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public Doctor(String speciality) {
		this.speciality = speciality;
	}
	
	public Doctor() {
		
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Override
	public String toString() {
		return "Doctor [doctorID=" + doctorID + ", users=" + users + ", speciality=" + speciality + ", appointments="
				+ appointments + ", department=" + department + "]";
	}





	
	
	
	
	
}
