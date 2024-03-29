package com.instagram.service;

import java.util.List;

import com.instagram.dto.CommentDTO;
import com.instagram.dto.PostDTO;

public interface CommentService{

	List<CommentDTO> getByPost(Long postId);

	Long delete(Long commentId);

	CommentDTO create(CommentDTO commentDTO);

}
