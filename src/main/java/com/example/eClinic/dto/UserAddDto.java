package com.example.eClinic.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class UserAddDto {
	private long userid;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String pid;
	
	@JsonInclude(Include.NON_NULL)
	private Long roleid;
	
	private Long doctorid;
	private Long patientid;
	
	@Override
	public String toString() {
		return "UserAddDto [userid=" + userid + ", username=" + username + ", password=" + password + ", name=" + name
				+ ", surname=" + surname + ", pid=" + pid + ", roleid=" + roleid + ", doctorid=" + doctorid
				+ ", patientid=" + patientid + "]";
	}
	
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
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
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public Long getRoleid() {
		return roleid;
	}
	public void setRoleid(Long roleid) {
		this.roleid = roleid;
	}
	public Long getDoctorid() {
		return doctorid;
	}
	public void setDoctorid(Long doctorid) {
		this.doctorid = doctorid;
	}
	public Long getPatientid() {
		return patientid;
	}
	public void setPatientid(Long patientid) {
		this.patientid = patientid;
	}
}
