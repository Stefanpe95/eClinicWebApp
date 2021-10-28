package com.example.eClinic.service;

import java.util.List;
import java.util.Optional;

import com.example.eClinic.dto.UserAddDto;
import com.example.eClinic.dto.UserLoginDto;
import com.example.eClinic.model.User;

public interface IUserService{

	 User addUser(UserAddDto user);
	 
	 User updateUser(long UserID,UserAddDto user);
	 
	 List<User> getAllUsers();
	 
	 Optional<User> getUserById(long userID);
	 
	User deleteUser(long userID);
	
	Long login(UserLoginDto user);
	
	List<User> getUsersByRoleName(String roleName);
	
}
