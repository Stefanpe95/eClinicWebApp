package com.example.eClinic.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.eClinic.dto.AppointmentAddDto;
import com.example.eClinic.model.Appointment;
import com.example.eClinic.model.Doctor;
import com.example.eClinic.model.Patient;
import com.example.eClinic.repository.AppointmentRepository;
import com.example.eClinic.repository.DoctorRepository;
import com.example.eClinic.repository.PatientRepository;
import com.example.eClinic.service.IAppointmentService;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	@Transactional
	public Appointment addAppointment(AppointmentAddDto appointment) {
		System.out.println(appointment.toString());
		Optional<Appointment> obj=appointmentRepository.findById(appointment.getAppointmentID());
		Optional<Doctor> usersDoctor=doctorRepository.findById(appointment.getDoctorid());
		Optional<Patient> usersPatient=patientRepository.findById(appointment.getPatientid());
		
		
		Appointment a1=new Appointment(appointment.getDate(),appointment.getAppointment_note());
		  	  
		if(usersDoctor.isPresent()) { a1.setDoctor(usersDoctor.get());} 
		 if(usersPatient.isPresent()) { a1.setPatient(usersPatient.get());}
		  
		  if(obj.isEmpty()){
			  usersPatient.get().getAppointments().add(a1);
			  patientRepository.save(usersPatient.get());
			  appointmentRepository.save(a1); 
			return a1;
		 }
		
		  
		  return a1;
		 
	}

	@Override
	@Transactional
	public Appointment deleteAppointment(long appointmentId) {
		Optional<Appointment> obj=appointmentRepository.findById(appointmentId);
		obj.get().setDoctor(null);
		obj.get().setPatient(null);
		appointmentRepository.delete(obj.get());
		return obj.get();
		}

	@Override
	public List<Appointment> getAllAppointments() {
		List<Appointment> list=appointmentRepository.findAll();
		return list;
	}

	@Override
	public Optional<Appointment> getAppointmentbyId(long appointmentId) {
		Optional<Appointment> obj=appointmentRepository.findById(appointmentId);
		return obj;
	}

	@Override
	@Transactional
	public Appointment updateAppointment(long appointmentID, AppointmentAddDto appointment) {
		Optional<Appointment> a1=appointmentRepository.findById(appointmentID);
		if(a1.isEmpty()) return null;
			
		Appointment appointment1=a1.get();
			
		appointment1.setAppointment_note(appointment.getAppointment_note());
		appointment1.setDate(appointment.getDate());

			
			if(appointment.getDoctorid() != null){
				
				Optional<Doctor> d1=doctorRepository.findById(appointment.getDoctorid());
				if(d1.isPresent()) { 
					appointment1.setDoctor(d1.get());
				} 
				
			}
			
			if(appointment.getPatientid() != null) {
				
				Optional<Patient> p1=patientRepository.findById(appointment.getPatientid());
				if(p1.isPresent()) { 
					appointment1.setPatient(p1.get());

				} 
					
			}
					
			appointmentRepository.saveAndFlush(appointment1);
			  return appointment1;
	}

	@Override
	public List<Appointment> getAppointmentsbyDoctorId(Long doctorid) {
		List<Appointment> appointments=appointmentRepository.findAppointmentsbyDoctorId(doctorid);
		return appointments;
	}

	@Override
	public List<Appointment> getAppointmentsbyPatientId(Long patientid) {
		List<Appointment> appointments=appointmentRepository.findAppointmentsbyPatientId(patientid);
		return appointments;
	}

}
