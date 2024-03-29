package com.instagram.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.NamingConventions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.instagram.dto.FriendshipDTO;
import com.instagram.entity.Friendship;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
       ModelMapper modelMapper = new ModelMapper();
       modelMapper.getConfiguration()
       .setSourceNamingConvention(NamingConventions.NONE)
       .setDestinationNamingConvention(NamingConventions.NONE);
       
       return modelMapper;
    }
}