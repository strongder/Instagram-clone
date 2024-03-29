package com.instagram.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeDTO {

	private Long id;
	private Long userId;
	private Long postId;
	private LocalDateTime createAt;
}
