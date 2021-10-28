package com.example.eClinic.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eClinic.dto.DoctorDto;
import com.example.eClinic.model.Department;
import com.example.eClinic.model.Doctor;
import com.example.eClinic.repository.DepartmentRepository;
import com.example.eClinic.repository.DoctorRepository;
import com.example.eClinic.service.IDoctorService;

@Service
public class DoctorServiceImpl implements IDoctorService {

	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Override
	public synchronized boolean addDoctor(DoctorDto doctor) {
		Optional<Doctor> doctorObj=doctorRepository.findById(doctor.getDoctorid());
		Optional<Department> doctorDepartment=departmentRepository.findById(doctor.getDepartmentid());
		Doctor d1=new Doctor(doctor.getSpeciality());
		
		if(doctorDepartment.isPresent()) {
			d1.setDepartment(doctorDepartment.get());
			doctorRepository.save(d1); 
		}
		else return false;
		
		if(doctorObj.isEmpty()){
			  doctorRepository.save(d1); 
			return true;
		 }
		else return false;
	} 

	@Override
	public boolean deleteDoctor(long doctorId) {
		Optional<Doctor> obj=doctorRepository.findById(doctorId);
		if(obj.isEmpty()) return false;
		else {doctorRepository.delete(obj.get()); return true;}
	}

	@Override
	public List<Doctor> getAllDoctors() {
		List<Doctor> list=doctorRepository.findAll();
		if(list.isEmpty()) return null;
		return list;
	}

	@Override
	public Optional<Doctor> getDoctorbyId(long doctorId) {
		Optional<Doctor> obj=doctorRepository.findById(doctorId);
		return obj;
	}

}
