package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.FriendshipDTO;
import com.instagram.entity.Friendship;
import com.instagram.service.FriendShipService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/follows")
public class FriendshipController {

	@Autowired
	private FriendShipService friendShipService;

	@PostMapping("/send")
	public ResponseEntity<FriendshipDTO> sendFriendRequest(@RequestBody FriendshipDTO friendshipDTO) {
		FriendshipDTO fs = friendShipService.addFriendship(friendshipDTO);
		return new ResponseEntity<FriendshipDTO>(fs, HttpStatus.CREATED);
	}

	@PutMapping("/accept/{id}")
	public ResponseEntity<FriendshipDTO> accept(@PathVariable Long id) {
		FriendshipDTO fs = friendShipService.acceptFriendship(id);
		return new ResponseEntity<FriendshipDTO>(fs, HttpStatus.OK);
	}

	@DeleteMapping("/decline/{id}")
	public ResponseEntity<FriendshipDTO> declineFriend(@PathVariable Long id) {
		FriendshipDTO fs = friendShipService.declineFriendship(id);
		return new ResponseEntity<FriendshipDTO>(fs, HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<FriendshipDTO>> getRequestFollow(@PathVariable Long userId) {
		List<FriendshipDTO> result = friendShipService.getRequestFollow(userId);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
