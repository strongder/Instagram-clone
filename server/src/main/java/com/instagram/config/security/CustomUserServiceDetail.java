//package com.instagram.config.security;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.instagram.entity.User;
//import com.instagram.repository.UserRepository;
//
//@Service
//public class CustomUserServiceDetail implements UserDetailsService {
//
//	@Autowired
//	private UserRepository userRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		Optional<User> user = userRepository.findByEmail(email);
//		if (user.isPresent()) {
//			return new CustomUserDetail(user.get());
//		} else {
//			throw new RuntimeException("User not found");
//		}
//	}
//}
