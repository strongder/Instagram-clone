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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.CommentDTO;
import com.instagram.service.CommentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
    private  CommentService commentService;


    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable Long postId) {
        
        List<CommentDTO> comments = commentService.getByPost(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.create(commentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Long> deleteComment(@PathVariable Long commentId) {
        commentService.delete(commentId);
        return new ResponseEntity<Long>(commentId, HttpStatus.OK);
    }
}
