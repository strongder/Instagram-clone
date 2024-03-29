package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.PostDTO;
import com.instagram.dto.UserDTO;
import com.instagram.entity.Post;
import com.instagram.entity.User;
import com.instagram.repository.PostRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.PostService;

@Service
public class PostServiceImpl implements PostService{

	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired 
	private PostRepository postRepository;
	
	@Autowired 
	private UserRepository userRepository;
	@Override
	public PostDTO getById(Long key) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public void deletePost(Long postId)
	{
		Optional<Post> post = postRepository.findById(postId);
		if(post.isPresent())
		{
			this.postRepository.delete(post.get());
		}
		else {
			throw new RuntimeException("post not found");
		}
	}
	
	@Override
	public List<PostDTO> getAll() {
		List<Post> posts = this.postRepository.findAll();
		return posts.stream().map(post -> modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
	}

	@Override
	public PostDTO create(PostDTO postDTO) {
		
		Post post = this.modelMapper.map(postDTO, Post.class);
		post.setCreateAt(LocalDateTime.now());
		this.postRepository.save(post);
		
		return modelMapper.map(post, PostDTO.class);
	}

	@Override
	public PostDTO update(PostDTO postDTO) {
		Optional<Post> existPost = this.postRepository.findById(postDTO.getId());
		if(existPost.isPresent())
		{
			Post post = modelMapper.map(postDTO, Post.class);
			this.postRepository.save(post);
			return modelMapper.map(post, PostDTO.class);
		}else {
			throw new RuntimeException("Post not found");
		}
	}

	@Override
	public List<PostDTO> getAllByUser(Long userId) {
		Optional<User> existUser = this.userRepository.findById(userId);
		if(existUser.isPresent())
		{
			List<Post> posts = postRepository.findByUser(existUser.get());
			return posts.stream().map(post -> modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
		}
		else
			throw new RuntimeException("User not found");
	}

}
