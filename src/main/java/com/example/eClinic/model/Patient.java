package com.example.eClinic.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties("appointments")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long patientID;
	
	@OneToMany(mappedBy = "patient")
	private List<User> users=new ArrayList<>();
	
	@Basic
	private int age;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private Gender gender;

	@Column(unique=true)
	private long patientPID;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private BloodType bloodtype;

	@Column(unique = false)
	@OneToMany(mappedBy = "patient")
	private List<Appointment> appointments = new ArrayList<>();

	public long getPatientID() {
		return patientID;
	}

	public void setPatientID(long patientID) {
		this.patientID = patientID;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Patient(int age) {
		this.age = age;
	}

	public Patient() {
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Patient(int age, Gender gender) {
		super();
		this.age = age;
		this.gender = gender;
	}

	public long getPatientPID() {
		return patientPID;
	}

	public void setPatientPID(long patientPID) {
		this.patientPID = patientPID;
	}

	public BloodType getBloodtype() {
		return bloodtype;
	}

	public void setBloodtype(BloodType bloodtype) {
		this.bloodtype = bloodtype;
	}
	
	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	@Override
	public String toString() {
		return "Patient [patientID=" + patientID + ", users=" + users + ", age=" + age + ", gender=" + gender
				+ ", appointments=" + appointments + "]";
	}

}
