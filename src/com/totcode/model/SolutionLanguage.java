package com.totcode.model;

public class SolutionLanguage {
	private String solution;
	private String lang;
	
	
	
	public SolutionLanguage(String solution, String lang) {
		super();
		this.solution = solution;
		this.lang = lang;
	}
	
	public String getSolution() {
		return solution;
	}
	public void setSolution(String solution) {
		this.solution = solution;
	}
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}
	
	
	
}
