package com.instagram.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.instagram.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {

	private Long id;
	private String name;
	private List<Long> userIds;
	private LocalDateTime createAt;
}
