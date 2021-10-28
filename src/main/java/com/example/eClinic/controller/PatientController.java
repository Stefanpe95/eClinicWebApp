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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.eClinic.dto.PatientDto;
import com.example.eClinic.model.Patient;
import com.example.eClinic.service.IPatientService;

@RestController
@RequestMapping("/api/v1")
public class PatientController {

	@Autowired
	private IPatientService patientService;
	

	  @PostMapping("/addPatient") 
	  private @ResponseBody ResponseEntity<Boolean> addPatient(@RequestBody PatientDto patient) 
	  	  { 

		  try {
			  System.out.println(patient.toString());
			  return ResponseEntity.status(HttpStatus.CREATED).body(patientService.addPatient(patient)); 
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		  
		  }
	  

	  @GetMapping("/getAllPatients")
	  public ResponseEntity<List<Patient>> getAllPatients() {
			List<Patient> list = patientService.getAllPatients();
			if(list.isEmpty()) return new ResponseEntity<List<Patient>>(list, HttpStatus.NOT_FOUND);
			return new ResponseEntity<List<Patient>>(list, HttpStatus.OK);
		}
	  	

		@GetMapping("/getPatientbyId/{id}")
		public ResponseEntity<Patient> getDoctorbyId(@PathVariable("id") Integer id) {
	  		Optional<Patient> patient = patientService.getPatientbyId(id);
			if(patient.isEmpty()) return new ResponseEntity<Patient>(patient.get(), HttpStatus.NOT_FOUND);
			else return new ResponseEntity<Patient>(patient.get(), HttpStatus.OK);
		}
	  	

		@DeleteMapping("/deletePatient/{id}")
		public ResponseEntity<Patient> deletePatient(@PathVariable("id") Integer id) {
	  		Optional<Patient> obj=patientService.getPatientbyId(id);
	  		if(obj.isEmpty()) return new ResponseEntity<Patient>(obj.get(),HttpStatus.NOT_FOUND);
	  		else {patientService.deletePatient(id);
			return new ResponseEntity<Patient>(obj.get(),HttpStatus.OK);}
		}
}
