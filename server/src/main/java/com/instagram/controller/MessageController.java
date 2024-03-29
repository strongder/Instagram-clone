package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.dto.MessageDTO;
import com.instagram.service.MessageService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
	
	@Autowired
	private MessageService messageService;

	
	@GetMapping("/room/{roomId}")
	public ResponseEntity<List<MessageDTO>> getMessageByRoom(@PathVariable Long  roomId) {
	
		List<MessageDTO> messages = messageService.getMessageByRoom(roomId);
		return new ResponseEntity<>(messages, HttpStatus.OK);
	}
	
	@MessageMapping("/messages/room/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public MessageDTO sendMessage(@Payload MessageDTO messageDTO, @DestinationVariable Long roomId)
	{
		System.out.println("tin nhắn"+ messageDTO);
		MessageDTO message = messageService.create(messageDTO);
		return message;
	}
}
