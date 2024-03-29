package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.RoomDTO;
import com.instagram.dto.UserDTO;
import com.instagram.service.RoomService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
	
	@Autowired
	private RoomService roomService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<List<RoomDTO>> getRoomByUser(@PathVariable Long  userId) {
	
		List<RoomDTO> rooms = roomService.getRoomByUser(userId);
		return new ResponseEntity<List<RoomDTO>>(rooms, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<RoomDTO> createRoom(@RequestBody List<UserDTO> list) {
		
		RoomDTO result = roomService.createRoom(list);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	

}
