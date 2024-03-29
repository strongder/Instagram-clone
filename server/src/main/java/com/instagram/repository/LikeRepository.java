package com.instagram.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Like;
import com.instagram.entity.Post;
import com.instagram.entity.User;


@Repository
public interface LikeRepository extends JpaRepository<Like, Long>{

	List<Like> findByPost(Optional<Post> post);
	
	Like findByPostAndUser(Post post, User user);

}
