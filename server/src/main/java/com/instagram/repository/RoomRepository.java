package com.instagram.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{


}
