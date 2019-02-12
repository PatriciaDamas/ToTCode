package com.totcode.impl;

import java.util.List;

import com.totcode.model.Exercise;

public interface IExercise {
	
	public List<Exercise> getExercisesLang(int id_exercise);
	public List<Exercise> getExercises(String difficulty, String user, String lang);
	public List<Exercise> getExercises();

}
