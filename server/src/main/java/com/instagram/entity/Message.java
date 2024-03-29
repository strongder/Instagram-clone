package com.instagram.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "messages")
public class Message{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name ="content")
	private String content;
	
	@Column(name = "create_at")
	private LocalDateTime createAt;
	
	@Column(name = "image", columnDefinition = "text")
	private String image;
	
	@ManyToOne 
	@JoinColumn(name = "room_id")
	private Room room;
	
	@ManyToOne 
	@JoinColumn(name = "user_id")
	private User user;
}
