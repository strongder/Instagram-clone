package com.instagram.service;

import com.instagram.dto.LikeDTO;
import com.instagram.dto.PostDTO;

public interface LikeService {

	Integer countLikeForPost(PostDTO postDTO);

	LikeDTO create(LikeDTO likeDTO);

	void delete(LikeDTO likeDTO);

}
