package com.example.eClinic.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long roleID;
	@Basic
	private String roleName;
	
	@OneToMany(mappedBy = "role")
	private List<User> users=new ArrayList<>();
	
	public long getRoleID() {
		return roleID;
	}
	public void setRoleID(long roleid) {
		roleID = roleid;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String rolename) {
		roleName = rolename;
	}
	public Role(String rolename) {
		roleName = rolename;
	}

	public Role() {
		
	}
	@Override
	public String toString() {
		return "Role [RoleName=" + roleName + "]";
	}
	
	
}
