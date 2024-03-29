package com.instagram.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Friendship;
import com.instagram.entity.User;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long>{

	List<Friendship> findByUser(User user);

	List<Friendship> findByFriend(User user);

	Optional<Friendship> findByUserAndFriend(User friend, User user);
}
