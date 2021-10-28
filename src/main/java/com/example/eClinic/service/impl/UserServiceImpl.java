package com.example.eClinic.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.eClinic.dto.UserAddDto;
import com.example.eClinic.dto.UserLoginDto;
import com.example.eClinic.model.Doctor;
import com.example.eClinic.model.Patient;
import com.example.eClinic.model.Role;
import com.example.eClinic.model.User;
import com.example.eClinic.repository.DoctorRepository;
import com.example.eClinic.repository.PatientRepository;
import com.example.eClinic.repository.RoleRepository;
import com.example.eClinic.repository.UserRepository;
import com.example.eClinic.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

	
	  @Autowired 
	  private UserRepository userRepository;
	  @Autowired
	  private RoleRepository roleRepository;
	  @Autowired
	  private DoctorRepository doctorRepository;
	  @Autowired
	  private PatientRepository patientRepository;
	  
	  @Override 
	  @Transactional
	  public User addUser(UserAddDto user) { 
		  Optional<User> usersObj=userRepository.findById(user.getUserid());
		  Optional<Role> usersRole=roleRepository.findById(user.getRoleid());
		  
		  User u1=new User(user.getUsername(),user.getPassword(),user.getName(),user.getSurname(),user.getPid());
		  
		  if(usersRole.isPresent()) {u1.setRole(usersRole.get());}
		  
		  if(user.getDoctorid() != null){
			  Optional<Doctor> usersDoctor=doctorRepository.findById(user.getDoctorid());
				if(usersDoctor.isPresent()) { 
					u1.setDoctor(usersDoctor.get());
					u1.setPatient(null);
				} 
				
			}
		  
		  if(user.getPatientid() != null) {
			  Optional<Patient> usersPatient=patientRepository.findById(user.getPatientid());
				if(usersPatient.isPresent()) { 
					u1.setPatient(usersPatient.get());
					u1.setDoctor(null);
				} 
		  }
		  
		  if(usersObj.isEmpty()){
			userRepository.saveAndFlush(u1); 
			return u1;
		 }
		  
		  return u1;
	  }
	  
		@Override
		public List<User> getAllUsers() {
			List<User> list=userRepository.findAll();
			 return list;
		}

		@Override
		public Optional<User> getUserById(long userID) {
				Optional<User> obj=userRepository.findById(userID);
				return obj;
		}

		@Override
		@Transactional
		public User updateUser(long UserID, UserAddDto user) {
			Optional<User> u1=userRepository.findById(UserID);
			if(u1.isEmpty()) return null;
			Optional<Role> r1=roleRepository.findById(user.getRoleid());

			
			User user1=u1.get();
			user1.setUsername(user.getUsername());
		  	user1.setPassword(user.getPassword());
		  	user1.setName(user.getName());
		  	user1.setSurname(user.getSurname());
		  	user1.setPID(user.getPid());
		  	user1.setRole(r1.get());

		  	
			if(user.getDoctorid() != null){
				
				Optional<Doctor> d1=doctorRepository.findById(user.getDoctorid());
				if(d1.isPresent()) { 
					user1.setDoctor(d1.get());
					user1.setPatient(null);
				} 
				
			}
			
			if(user.getPatientid() != null) {
				
				Optional<Patient> p1=patientRepository.findById(user.getPatientid());
				if(p1.isPresent()) { 
					user1.setDoctor(null);
					user1.setPatient(p1.get());

				} 
				
				
			}
				 
				userRepository.saveAndFlush(user1);
				return user1;


		}

		@Override
		@Transactional
		public User deleteUser(long userID) {
			Optional<User> obj=userRepository.findById(userID);
				obj.get().setDoctor(null);
				obj.get().setPatient(null);
				userRepository.delete(obj.get());
				return obj.get();
			
		}

		@Override
		public Long login(UserLoginDto user) {
			Optional<User> u=userRepository.findUserByUsernameEquals(user.getUsername());
			if(u.get().getPassword().equals(user.getPassword())) return  u.get().getUserID();
			else return 0L;
			
		}

		@Override
		public List<User> getUsersByRoleName(String roleName) {
			List<User> users=userRepository.findUsersByRole(roleName);
			return users;
		}


		
		

	 

}
