package com.instagram.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	
	private Long id;
	private String username;
	private String password;
	private String email;
	private String avatar;
	private boolean status;
	private LocalDateTime createAt;
}
