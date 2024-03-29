package com.instagram.service;

import java.util.List;

import com.instagram.dto.RoomDTO;
import com.instagram.dto.UserDTO;
import com.instagram.entity.Room;

public interface RoomService {

	List<RoomDTO> getRoomByUser(Long userId);

	RoomDTO update(RoomDTO roomDTO);

	RoomDTO createRoom(List<UserDTO> list);

	RoomDTO convertToDTO(Room room);


}
