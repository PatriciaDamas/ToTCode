package com.totcode.model;

public class TestCase {
	private String input;
	private String output;
	
	public TestCase(String input, String output) {
		super();
		this.input = input;
		this.output = output;
	}
	public String getInput() {
		return input;
	}
	public void setInput(String input) {
		this.input = input;
	}
	public String getOutput() {
		return output;
	}
	public void setOutput(String output) {
		this.output = output;
	}
	
}
