package com.instagram.service;

import java.util.List;

import com.instagram.dto.PostDTO;
import com.instagram.dto.UserDTO;

public interface PostService extends BaseService<PostDTO, Long>{

	List<PostDTO> getAllByUser(Long userId);

	void deletePost(Long postId);
}
