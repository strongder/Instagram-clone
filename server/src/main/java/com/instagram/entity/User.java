package com.instagram.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Entity
public class User {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name ="username")
	private String username;
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	@Column(name = "avatar", columnDefinition = "text")
	private String avatar;
	
	@Column(name = "create_at")
	private LocalDateTime createAt;
	
	@Column(name = "status")
	private boolean status;

	@OneToMany(mappedBy = "user")
	private List<Post> posts;
		
	@OneToMany(mappedBy = "user")
	private List<Comment> comments;
	
	@OneToMany(mappedBy = "user")
	private List<Like> likes; 
	
	@OneToMany(mappedBy = "user")
	private List<Message> messages;
}
