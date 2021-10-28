package com.example.eClinic.model;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userid;
	@Basic
	private String username;
	@Basic
	private String password;
	@Basic
	private String name;
	@Basic
	private String surname;
	
	@Basic
	@Column(length = 13,unique=true)
	private String pid;

	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "patientid",referencedColumnName = "patientid")
	private Patient patient;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "doctorid",referencedColumnName = "doctorid")
	private Doctor doctor;

	@ManyToOne
	@JoinColumn(name = "roleid", nullable = false)
	private Role role;

	public long getUserID() {
		return userid;
	}

	public void setUserID(long userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPID() {
		return pid;
	}

	public void setPID(String pid) {
		this.pid = pid;
	}

	public User(String username, String password, String name, String surname, String pid) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.pid = pid;
	}

	
	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public User() {
	}

	@Override
	public String toString() {
		return "User {username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", PID=" + pid + "}";
	}

}
