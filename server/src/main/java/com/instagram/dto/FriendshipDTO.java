package com.instagram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendshipDTO {
	private Long id;
    private Long userId;
    private Long friendId;
    private String status;

}

