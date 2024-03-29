package com.instagram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomUserDTO {

	private Long id;
	private Long roomId;
	private Long userId;
}
