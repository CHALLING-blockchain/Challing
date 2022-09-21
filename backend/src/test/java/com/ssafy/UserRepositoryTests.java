package com.ssafy;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTests {

	@Autowired
	UserRepository userRepository;

	@Test
	void saveAndFindByEmail() {
		User user = new User();
		user.setEmail("email000");
		user.setNickname("nickname000");
		user.setPicURL("url000");
		userRepository.save(user);
		User userFound = userRepository.findByEmail("email000").get();
		assertEquals(user.getId(), userFound.getId(), "user id not equals");
	}

}
