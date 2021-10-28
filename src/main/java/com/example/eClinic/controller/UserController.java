package com.example.eClinic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.eClinic.dto.UserAddDto;
import com.example.eClinic.dto.UserLoginDto;
//import com.example.eClinic.model.Doctor;
//import com.example.eClinic.model.Patient;
//import com.example.eClinic.model.Role;
import com.example.eClinic.model.User;
//import com.example.eClinic.service.IDoctorService;
//import com.example.eClinic.service.IPatientService;
//import com.example.eClinic.service.IRoleService;
import com.example.eClinic.service.IUserService;


@RestController
@RequestMapping("/api/v1")
public class UserController {

	
	  @Autowired 
	  private IUserService userService;
	  
	  
	  @PostMapping("/addUser") 
	  private @ResponseBody ResponseEntity<User> addUser(@RequestBody UserAddDto user) 
	  	  { 
		  	try {
				  return ResponseEntity.status(HttpStatus.OK).body(userService.addUser(user)); 
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}

		  }
	  
	  
		@GetMapping("/getAllUsers")
		public ResponseEntity<List<User>> getAllUsers() {
			List<User> list = userService.getAllUsers();
			return new ResponseEntity<List<User>>(list, HttpStatus.OK);
		}
		
		@GetMapping("/getUserById/{id}")
		public ResponseEntity<User> getUserbyId(@PathVariable("id") Integer id) {
			Optional<User> user = userService.getUserById(id);
			if(user.isEmpty()) return new ResponseEntity<User>(user.get(), HttpStatus.NOT_FOUND);
			else return new ResponseEntity<User>(user.get(), HttpStatus.OK);
		}
		
		@DeleteMapping("/deleteUser/{id}")
		public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id) {
	  		Optional<User> obj=userService.getUserById(id);
	  		System.out.println(obj.get().toString());
	  		if(obj.isEmpty()) return new ResponseEntity<User>(obj.get(),HttpStatus.NOT_FOUND);
	  		else {userService.deleteUser(id);
			return new ResponseEntity<User>(obj.get(),HttpStatus.OK);}
		}
		
		@PutMapping("/updateUser/{id}")
		public ResponseEntity<User> updateUser(@PathVariable Long id,@RequestBody UserAddDto userDetails){
			
			 try {
		            return ResponseEntity.status(HttpStatus.OK).body(
		                    userService.updateUser(id, userDetails));
		        } catch (Exception ex) {
		            ex.printStackTrace();
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		        }
			
			
		}
		
		@GetMapping("/getUsersByRoleName/{roleName}")
		public ResponseEntity<List<User>> getUsersbyRoleName(@PathVariable("roleName") String roleName) {
			List<User> users = userService.getUsersByRoleName(roleName);
			if(users.isEmpty()) return new ResponseEntity<List<User>>(users, HttpStatus.NOT_FOUND);
			else return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		}
		
		
		@PostMapping("/login")
		 private @ResponseBody ResponseEntity<Long> loginUser(@RequestBody UserLoginDto user) 
	  	  { 
		  	try {
				  return ResponseEntity.status(HttpStatus.OK).body(userService.login(user)); 
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}

		  }
		

}
