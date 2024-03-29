package com.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Friendship;
import com.instagram.entity.Room;
import com.instagram.entity.RoomUser;
import com.instagram.entity.User;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, Long>{


	List<RoomUser> findByUser(User user);

	List<RoomUser> findByRoom(Room room);

}
