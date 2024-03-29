package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.FriendshipDTO;
import com.instagram.entity.Friendship;
import com.instagram.entity.Room;
import com.instagram.entity.RoomUser;
import com.instagram.entity.User;
import com.instagram.repository.FriendshipRepository;
import com.instagram.repository.RoomRepository;
import com.instagram.repository.RoomUserRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.FriendShipService;

@Service
public class FriendshipServiceImpl implements FriendShipService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FriendshipRepository friendshipRepository;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private RoomUserRepository roomUserRepository;

	@Override
	public FriendshipDTO addFriendship(FriendshipDTO friendship) {

		Friendship fs = ConverToEntity(friendship);
		Optional<Friendship> existFs = friendshipRepository.findByUserAndFriend(fs.getFriend(), fs.getUser());
		Optional<Friendship> existFs1 = friendshipRepository.findByUserAndFriend(fs.getUser(), fs.getFriend());

		if (existFs.isPresent() || existFs1.isPresent()) {
			throw new RuntimeException("friendship is exist");
		} else {

			fs.setStatus("pending");
			this.friendshipRepository.save(fs);
			return ConvertToDTO(fs);
		}
	}

	@Override
	public List<FriendshipDTO> getRequestFollow(Long userId) {

		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			List<Friendship> friendships = friendshipRepository.findByFriend(user.get());
			List<FriendshipDTO> list = friendships.stream().map(fs -> ConvertToDTO(fs)).collect(Collectors.toList());
			
			return list;

		} else {
			throw new RuntimeException("User not found");
		}
	}

	@Override
	public FriendshipDTO acceptFriendship(Long friendshipId) {
		Optional<Friendship> fs = friendshipRepository.findById(friendshipId);
		if (fs.isPresent()) {
			fs.get().setStatus("accept");
			generateRoom(fs.get());
			this.friendshipRepository.save(fs.get());
			return ConvertToDTO(fs.get());
		} else {
			throw new RuntimeException("Friendship not found");
		}

	}

	@Override
	public FriendshipDTO declineFriendship(Long friendshipId) {
		Optional<Friendship> fs = friendshipRepository.findById(friendshipId);
		if (fs.isPresent()) {
			this.friendshipRepository.delete(fs.get());
			return ConvertToDTO(fs.get());
		} else {
			throw new RuntimeException("Friendship not found");
		}
	}

	// convert to entity
	public Friendship ConverToEntity(FriendshipDTO fsDTO) {
		Friendship friendship = modelMapper.map(fsDTO, Friendship.class);
		friendship.setUser(userRepository.getById(fsDTO.getUserId()));
		friendship.setFriend(userRepository.getById(fsDTO.getFriendId()));

		return friendship;
	}

	// convert entity to DTO
	public FriendshipDTO ConvertToDTO(Friendship friendship) {
		FriendshipDTO friendshipDTO = modelMapper.map(friendship, FriendshipDTO.class);
		friendshipDTO.setUserId(friendship.getUser().getId());
		friendshipDTO.setFriendId(friendship.getFriend().getId());
		return friendshipDTO;
	}

	public void generateRoom(Friendship friendship) {
		Room room = new Room();
		room.setCreateAt(LocalDateTime.now());
		this.roomRepository.save(room);
		RoomUser roomUser1 = new RoomUser();
		RoomUser roomUser2 = new RoomUser();

		roomUser1.setRoom(room);
		roomUser1.setUser(friendship.getUser());

		roomUser2.setRoom(room);
		roomUser2.setUser(friendship.getFriend());

		this.roomUserRepository.save(roomUser1);
		this.roomUserRepository.save(roomUser2);
	}
}
