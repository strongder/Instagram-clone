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

import com.instagram.dto.PostDTO;
import com.instagram.service.PostService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("")
	public ResponseEntity<PostDTO> create(@RequestBody PostDTO postDTO) {
		PostDTO result = postService.create(postDTO);
		return new ResponseEntity<>(result, HttpStatus.CREATED);
	}

	@PutMapping("/update/{postId}")
	public ResponseEntity<PostDTO> update(@PathVariable Long postId, @RequestBody PostDTO postDTO) {
		PostDTO result = postService.update(postDTO);
		return new ResponseEntity<>(result, HttpStatus.CREATED);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<PostDTO>> getPostByUser(@PathVariable Long userId) {

		List<PostDTO> lists = postService.getAllByUser(userId);
		return new ResponseEntity<>(lists, HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<List<PostDTO>> getPostByUser() {

		List<PostDTO> lists = postService.getAll();
		return new ResponseEntity<>(lists, HttpStatus.OK);
	}
	
	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
		postService.deletePost(postId);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
}
