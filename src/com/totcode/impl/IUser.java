package com.totcode.impl;

import java.util.Date;
import java.util.List;

import com.totcode.model.User;





public interface IUser {

	public List<User> getUsers();
	public List<User> getUsers(String language);
	public List<User> getUsersName(String name);
	public void createUser(String name, String date, String email, String profession, String language, String password);
	public void removeUser(String name);

}
