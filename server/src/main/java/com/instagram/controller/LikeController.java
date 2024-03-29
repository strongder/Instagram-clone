package com.instagram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.LikeDTO;
import com.instagram.dto.PostDTO;
import com.instagram.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

	@Autowired
	private LikeService likeService;
	
	@PostMapping("/{id}")
	public ResponseEntity<LikeDTO> create(@RequestBody LikeDTO likeDTO, @PathVariable Long id)
	
	{
		LikeDTO result = likeService.create(likeDTO);
		return new  ResponseEntity<LikeDTO>(result, HttpStatus.CREATED);
	}
//	@DeleteMapping("/id")
//	public ResponseEntity<LikeDTO> delete(@RequestBody LikeDTO likeDTO, @PathVariable Long id)
//	
//	{
//		LikeDTO result = likeService.
//		return new  ResponseEntity<LikeDTO>(result, HttpStatus.CREATED);
//	}
	
	@GetMapping ("/count/{id}")
	public ResponseEntity<Integer> countLike(@RequestBody PostDTO postDTO, @PathVariable Long id)
	
	{
		int result = likeService.countLikeForPost(postDTO);
		return new  ResponseEntity<>(result, HttpStatus.CREATED);
	}
	
}
