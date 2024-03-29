package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.UserDTO;
import com.instagram.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/{userId}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {

		UserDTO result = userService.getById(userId);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<List<UserDTO>> getAll() {

		List<UserDTO> result = userService.getAll();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/friends/{userId}")
	public ResponseEntity<List<UserDTO>> getFriendByUser(@PathVariable Long userId) {

		List<UserDTO> result = userService.getFriendByUserId(userId);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
