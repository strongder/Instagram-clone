package com.instagram.service;

import java.util.List;

import com.instagram.dto.MessageDTO;
import com.instagram.dto.RoomDTO;

public interface MessageService {

	List<MessageDTO> getMessageByRoom(Long roomId);

	MessageDTO create(MessageDTO mes);
}
