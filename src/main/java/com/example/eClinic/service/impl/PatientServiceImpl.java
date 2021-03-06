package com.example.eClinic.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eClinic.dto.PatientDto;
import com.example.eClinic.model.Patient;
import com.example.eClinic.repository.PatientRepository;
import com.example.eClinic.service.IPatientService;

@Service
public class PatientServiceImpl implements IPatientService {

	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	public boolean addPatient(PatientDto patient) {
		Optional<Patient> patientObj=patientRepository.findById(patient.getPatientid());
		Patient p1=new Patient(patient.getAge(),patient.getGender());
		
		if(patientObj.isEmpty()) {
			patientRepository.save(p1);
			return true;
		}
		else return false;
	}

	@Override
	public boolean deletePatient(long patientId) {
		Optional<Patient> obj=patientRepository.findById(patientId);
		if(obj.isEmpty()) return false;
		else {patientRepository.delete(obj.get()); return true;}
	}

	@Override
	public List<Patient> getAllPatients() {
		List<Patient> list=patientRepository.findAll();
		return list;
	}

	@Override
	public Optional<Patient> getPatientbyId(long patientId) {
		Optional<Patient> obj=patientRepository.findById(patientId);
		return obj;
	}

}
