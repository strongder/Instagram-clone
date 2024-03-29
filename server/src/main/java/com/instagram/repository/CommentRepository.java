package com.instagram.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Comment;
import com.instagram.entity.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{

	List<Comment> findByPost(Post post);

}
