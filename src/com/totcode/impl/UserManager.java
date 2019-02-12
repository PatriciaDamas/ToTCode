package com.totcode.impl;


import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import com.totcode.data.UserData;
import com.totcode.model.User;

import io.jsonwebtoken.impl.crypto.MacProvider;



public class UserManager implements IUser{
	static  List<User> users  = new ArrayList<User>();
	
	static Key key;
	
	static UserManager um = null;
	
	public static UserManager getInstance() {
		if(um == null) {
			um = new UserManager();
			key = MacProvider.generateKey();
			System.out.println("teste");

		}
		return um;
	}
	
	public Key getKey() {
		return key;
	}
	
	//listar todos os utilizadores
	public List<User> getUsers() {
		
		UserData userData = UserData.getInstance();
		return userData.getData();
	}
	
	//utilizadores de uma determinada linguagem
	public List<User> getUsers(String language) {
		UserData userData = UserData.getInstance();
		return userData.getData(language);
	}
	
	//utilizadores de um determinado id
	public List<User> getUsersName(String name) {
		UserData userData = UserData.getInstance();
		return userData.getUserData(name);
	}
	
	
	
	//adicionar utilizadores
	public void createUser(String name, String creation_date, String email, String profession, String language, String password) {
		
		UserData userData = UserData.getInstance();
		
		userData.insertData(new User(name,creation_date, email, profession, language, password));
				
	}
	
	//remover utilizadores
	public void removeUser(String email) {
		UserData userData = UserData.getInstance();
		userData.removeData(email);
	}
	
	
	
	//alterar utilizadores
	public void modifyUser(String email_antigo,String name, String creation_date, String email, String profession, String language, String password){
		UserData userData = UserData.getInstance();
		
		userData.modifyData(email_antigo,new User(name,creation_date, email, profession, language, password));
	}


	
	
	
	
}
