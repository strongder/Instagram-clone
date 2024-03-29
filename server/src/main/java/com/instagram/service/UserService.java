package com.instagram.service;

import java.util.List;

import com.instagram.dto.UserDTO;
import com.instagram.entity.User;

public interface UserService extends BaseService<UserDTO , Long>{
	UserDTO addFriends(UserDTO user);


	List<UserDTO> getFriendByUserId(Long userId);


	UserDTO getByEmail(String email);
}
