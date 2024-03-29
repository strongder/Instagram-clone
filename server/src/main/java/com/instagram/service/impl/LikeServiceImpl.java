package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.LikeDTO;
import com.instagram.dto.PostDTO;
import com.instagram.entity.Like;
import com.instagram.entity.Post;
import com.instagram.entity.User;
import com.instagram.repository.LikeRepository;
import com.instagram.repository.PostRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.LikeService;
@Service
public class LikeServiceImpl implements LikeService{

	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	

	@Override
	public LikeDTO create(LikeDTO likeDTO) {
		Like like = modelMapper.map(likeDTO, Like.class);
		like.setCreateAt(LocalDateTime.now());
		Optional<User> user = userRepository.findById(likeDTO.getUserId());
		Optional<Post> post = postRepository.findById(likeDTO.getPostId());

		if(user.isEmpty())
		{
			throw new RuntimeException("user not found");
		}
		else
			like.setUser(user.get());
		
		if(post.isEmpty())
		{
			throw new RuntimeException("post not found");
		}
		else
			like.setPost(post.get());
		this.likeRepository.save(like);
		return likeDTO;
	}
	
	@Override
	public void delete(LikeDTO likeDTO)
	{
		
		Optional<Like> like = likeRepository.findById(likeDTO.getId());
		if(like.isEmpty())
		{
			throw new RuntimeException("Comment not found");
		}else {
			this.likeRepository.delete(like.get());
			
		}
	}
	
	@Override
	public Integer countLikeForPost (PostDTO postDTO)
	{
		Optional<Post> post = postRepository.findById(postDTO.getId());
		if(post.isPresent())
		{
			int count = likeRepository.findByPost(post).size();
			return count;
		}
		else 
			throw new RuntimeException("Post not found");
	}

}
