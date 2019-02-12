package com.totcode.model;

import java.util.ArrayList;
import java.util.List;


public class Exercise {
	 
	private int id_exercise;
	private String title;
	private String statement;
	private List<String> inputs = new ArrayList<String>();
	private List<String> outputs = new ArrayList<String>();
	private List<String> solutions = new ArrayList<String>();
	private List<String> lang = new ArrayList<String>();
	private String difficulty;
	private String date;
	private List<String> tags;
	private String user;
	
	
	
	public Exercise() {
		super();
	}


	public Exercise(int id_exercise, String title, String statement, List<String> inputs, List<String> outputs,
			List<String> solutions, List<String> lang, String difficulty, String date, List<String> tags, String user) {
		super();
		this.id_exercise = id_exercise;
		this.title = title;
		this.statement = statement;
		this.inputs = inputs;
		this.outputs = outputs;
		this.solutions = solutions;
		this.lang = lang;
		this.difficulty = difficulty;
		this.date = date;
		this.tags = tags;
		this.user = user;
	}
	
	
	public int getId_exercise() {
		return id_exercise;
	}

	public void setId_exercise(int id_exercise) {
		this.id_exercise = id_exercise;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStatement() {
		return statement;
	}

	public void setStatement(String statement) {
		this.statement = statement;
	}

	public List<String> getInputs() {
		return inputs;
	}

	public void setInputs(List<String> inputs) {
		this.inputs = inputs;
	}

	public List<String> getOutputs() {
		return outputs;
	}

	public void setOutputs(List<String> outputs) {
		this.outputs = outputs;
	}

	public List<String> getSolutions() {
		return solutions;
	}

	public void setSolutions(List<String> solutions) {
		this.solutions = solutions;
	}

	public List<String> getLang() {
		return lang;
	}

	public void setLang(List<String> lang) {
		this.lang = lang;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	
	
	
	
	
	
	
	
	

}
