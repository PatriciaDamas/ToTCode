package com.totcode.model;

import java.sql.Date;

public class Metadata {
	private String difficulty;
	private Date date;
	private String [] tags;
	private User u;
	
	public Metadata(String difficulty, Date date, String[] tags, User u) {
		super();
		this.difficulty = difficulty;
		this.date = date;
		this.tags = tags;
		this.u = u;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public User getU() {
		return u;
	}

	public void setU(User u) {
		this.u = u;
	}
	
	
}
