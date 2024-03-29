package com.instagram.service;

import java.util.List;

import com.instagram.dto.FriendshipDTO;
import com.instagram.entity.Friendship;
import com.instagram.entity.User;

public interface FriendShipService {
	
		FriendshipDTO addFriendship(FriendshipDTO friendship);
	    FriendshipDTO acceptFriendship(Long friendshipId);
	    FriendshipDTO declineFriendship(Long friendshipId);
		List<FriendshipDTO> getRequestFollow(Long userId);
}
