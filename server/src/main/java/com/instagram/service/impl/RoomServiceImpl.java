package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.RoomDTO;
import com.instagram.dto.UserDTO;
import com.instagram.entity.Room;
import com.instagram.entity.RoomUser;
import com.instagram.entity.User;
import com.instagram.repository.RoomRepository;
import com.instagram.repository.RoomUserRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private RoomUserRepository roomUserRepository;

	@Override
	public List<RoomDTO> getRoomByUser(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		List<RoomUser> roomUsers = roomUserRepository.findByUser(user);
		List<Room> rooms = roomUsers.stream().map(rU -> roomRepository.findById(rU.getRoom().getId()).orElse(null))
				.collect(Collectors.toList());
		return rooms.stream().map(r ->convertToDTO(r)).collect(Collectors.toList());
	}

	@Override
	public RoomDTO convertToDTO(Room room) {
		RoomDTO roomDTO = modelMapper.map(room, RoomDTO.class);
		List<RoomUser> roomUsers = roomUserRepository.findByRoom(room);
		List<Long> userIds = roomUsers.stream().map(rU -> userRepository.findById(rU.getUser().getId()).orElse(null).getId())
				.collect(Collectors.toList());
		roomDTO.setUserIds(userIds);
		return roomDTO;
	}

	@Override
	public RoomDTO update(RoomDTO roomDTO) {
		Room room = modelMapper.map(roomDTO, Room.class);
		this.roomRepository.save(room);
		return modelMapper.map(room, RoomDTO.class);
	}

	@Override
	public RoomDTO createRoom(List<UserDTO> list) {
		Room room = new Room();
		room.setCreateAt(LocalDateTime.now());
		this.roomRepository.save(room);
		for (UserDTO u : list) {
			User user = modelMapper.map(u, User.class);
			RoomUser roomUser = new RoomUser();
			roomUser.setRoom(room);
			roomUser.setUser(user);

			this.roomUserRepository.save(roomUser);
		}
		return modelMapper.map(room, RoomDTO.class);

	}


}
