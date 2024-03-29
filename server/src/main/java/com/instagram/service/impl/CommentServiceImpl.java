package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.CommentDTO;
import com.instagram.dto.PostDTO;
import com.instagram.entity.Comment;
import com.instagram.entity.Post;
import com.instagram.entity.User;
import com.instagram.repository.CommentRepository;
import com.instagram.repository.PostRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.CommentService;
@Service
public class CommentServiceImpl implements CommentService{

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Override
	public List<CommentDTO> getByPost(Long postId) {
		Optional<Post> post = postRepository.findById(postId);
		if(post.isPresent()) {
			List<Comment> comments = commentRepository.findByPost(post.get());
			return comments.stream().map(c -> convertToDTO(c)).collect(Collectors.toList());
		}else
			throw new RuntimeException("Post not found");
	}

	@Override
	public CommentDTO create(CommentDTO commentDTO) {
		Comment comment = modelMapper.map(commentDTO, Comment.class);
		comment.setCreateAt(LocalDateTime.now());
		Optional<User> user = userRepository.findById(commentDTO.getUserId());
		Optional<Post> post = postRepository.findById(commentDTO.getPostId());

		if(user.isEmpty())
		{
			throw new RuntimeException("user not found");
		}
		else
			comment.setUser(user.get());
		
		if(post.isEmpty())
		{
			throw new RuntimeException("post not found");
		}
		else
			comment.setPost(post.get());
		this.commentRepository.save(comment);
		return convertToDTO(comment);
	}
	
	@Override
	public Long delete(Long commentId )
	{
		Optional<Comment> comment = commentRepository.findById(commentId);
		if(comment.isEmpty())
		{
			throw new RuntimeException("Comment not found");
		}else {
			this.commentRepository.delete(comment.get());
			return commentId;
		}
	}
	private CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = modelMapper.map(comment, CommentDTO.class);
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setPostId(comment.getPost().getId());
        return commentDTO;
    }

}
