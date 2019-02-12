package com.totcode.model;


public class User {
	private String name;
	private String email;
	private String creation_date;
	private String profession;
	private String language;
	private String password;
	
	public User() {}
	
	public User( String name,String creation_date, String email, String profession, String language, String password) {
		super();
		//this.id_user = id_user;
		this.name = name;
		this.email = email;
		this.creation_date = creation_date;
		this.profession = profession;
		this.language = language;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(String creation_date) {
		this.creation_date = creation_date;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	
	
	
}
