package com.instagram.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.dto.MessageDTO;
import com.instagram.dto.RoomDTO;
import com.instagram.entity.Message;
import com.instagram.entity.Room;
import com.instagram.repository.MessageRepository;
import com.instagram.repository.RoomRepository;
import com.instagram.repository.UserRepository;
import com.instagram.service.MessageService;
@Service
public class MessageServiceImpl implements MessageService{

	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<MessageDTO> getMessageByRoom(Long roomId) {

		Optional<Room> room = roomRepository.findById(roomId);
		
		if(room.isPresent())
		{
			List<Message> messages = messageRepository.findByRoom(room.get());
			return messages.stream().map(message -> convertToDTO(message)).collect(Collectors.toList());
		}
		else throw new RuntimeException("room not found");
	}
	
	@Override
	public MessageDTO create(MessageDTO mes) {
		
		Message message = convertToEntity(mes);
		message.setCreateAt(LocalDateTime.now());
		this.messageRepository.save(message);
		return convertToDTO(message);
	}
	
	// convert to dto
	public MessageDTO  convertToDTO(Message message)
	{
		MessageDTO mesDTO = modelMapper.map(message, MessageDTO.class);
		mesDTO.setRoomId(message.getRoom().getId());
		mesDTO.setUserId(message.getUser().getId());
		
		return mesDTO;
	}
	
	// convert to entity
	public Message convertToEntity(MessageDTO messageDTO)
	{
		Message mes = modelMapper.map(messageDTO, Message.class);
		mes.setRoom(roomRepository.findById(messageDTO.getRoomId()).orElse(null));
		mes.setUser(userRepository.findById(messageDTO.getUserId()).orElse(null));
		return mes;
	}
	
}
