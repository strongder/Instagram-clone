package com.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Message;
import com.instagram.entity.Room;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

	
	List<Message> findByRoom(Room room);
}
