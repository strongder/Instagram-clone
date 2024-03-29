package com.instagram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.AuthRequest;
import com.instagram.dto.UserDTO;
import com.instagram.repository.UserRepository;
import com.instagram.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("")
public class LoginController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Autowired
//	private AuthenticationManager authenticationManager;
//	
	
//	@PostMapping("/api/auth")
//	public ResponseEntity<AuthResponse> Login(@RequestBody AuthRequest authRequest) {
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
//		
//		if (authentication.isAuthenticated()) {
//			String token = JwtUtils.generateToken(authRequest.getEmail());
//			Long id = userService.getByEmail(authRequest.getEmail()).getId();
//			
//			AuthResponse authRes = new AuthResponse(token, id);
//			return new ResponseEntity<>(authRes, HttpStatus.OK);
//		}
//		return null;
//	}
	
	@PostMapping("/api/auth")
	public ResponseEntity<UserDTO> Login (@RequestBody AuthRequest authRequest){
		UserDTO  user = userService.getByEmail(authRequest.getEmail());
		if(user!=null)
		{
			if(user.getPassword().equals(authRequest.getPassword()))
			{
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
		}
		return null;
		
	}
	
	
	
	@PostMapping("/api/register")
	public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
		UserDTO result = userService.create(userDTO);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
}