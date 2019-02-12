package com.totcode.impl;

import java.security.Key;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import java.util.List;

import com.mongodb.client.result.DeleteResult;
import com.totcode.data.ExerciseData;
import com.totcode.model.Exercise;

import io.jsonwebtoken.impl.crypto.MacProvider;

public class ExerciseManager implements IExercise {
	
	static  List<Exercise> exercises  = new ArrayList<Exercise>();
	static Key key;
	
	static ExerciseManager em = null;
		
	public static ExerciseManager getInstance() {
		if(em == null) {
			em = new ExerciseManager();
			key = MacProvider.generateKey();
		}
		return em;
	}
	
	public Key getKey() {
		return key;
	}
	
	//Lista de todos os exercicios
	public List<Exercise> getExercises(){
		ExerciseData exerciseData = ExerciseData.getInstance();
		return exerciseData.getData();
	}
	
	//Lista de exercicios de uma determinada dificuldade e user
	public List<Exercise> getExercises(String difficulty, String user, String lang) {
		ExerciseData exerciseData = ExerciseData.getInstance();	
		return exerciseData.getData(difficulty,user,lang);
		
	}
	
	//Lista de exercicios de um determinado id
		public List<Exercise> getExercisesLang(int id_exercise) {
			ExerciseData exerciseData = ExerciseData.getInstance();	
			return exerciseData.getLangData(id_exercise);
			
		}
	
	//Lista de exercicios de uma determinada linguagem
		public List<Exercise> getExercisesL(String lang) {
			ExerciseData exerciseData = ExerciseData.getInstance();	
			return exerciseData.getLData(lang);
			
		}
	

	
	public void createExercise(String title,String statement, String input,String output,String solution,String lang,String difficulty,String tag,String user) {
		
		String pergunta = statement;
		// converter inputs
		String [] splitin = input.split("#");
		List<String> inputs = new ArrayList<String>();
		for(int i = 0; i< splitin.length;i++) {
			inputs.add(splitin[i]);
		}
		// converter outputs
		String [] splitout = output.split("#");
		List<String> outputs = new ArrayList<String>();
		for(int i = 0; i< splitout.length;i++) {
			outputs.add(splitout[i]);
		}
		// converter solution
		String [] splitsol = solution.split("#");
		List<String> solutions = new ArrayList<String>();
		for(int i = 0; i< splitsol.length;i++) {
			solutions.add(splitsol[i]);
		}
		// converter language
		String [] splitlan = lang.split("#");
		List<String> langs = new ArrayList<String>();
		for(int i = 0; i< splitlan.length;i++) {
			langs.add(splitlan[i]);
		}
		// data local 
		String date = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
		// converte tags
		String [] splittag = tag.split(",");
		List<String> tags = new ArrayList<String>();
		for(int i = 0; i< splittag.length;i++) {
			tags.add(splittag[i]);
		}
		
		
		ExerciseData exerciseData = ExerciseData.getInstance();
		int id_exercise =  exerciseData.getLengthExercise() + 1;
		
		/*while (exerciseData.check_id(id_exercise) == false) {
			id_exercise++;
		}
		*/
		exerciseData.insertData(new Exercise(id_exercise,title,pergunta,inputs,outputs,solutions,langs,difficulty,date,tags,user));
	}
	
	public void deleteExercise (String id_exercise) {
		ExerciseData exerciseData = ExerciseData.getInstance();
		exerciseData.deleteData(id_exercise);
	}
	
	/*public void modifyExercise(int id_exercise, String title,String statement, String input,String output,String solution,String lang,String difficulty,String tag,String user) {
		
		
		// converter inputs
				String [] splitin = input.split("#");
				List<String> inputs = new ArrayList<String>();
				for(int i = 0; i< splitin.length;i++) {
					inputs.add(splitin[i]);
				}
				// converter outputs
				String [] splitout = output.split("#");
				List<String> outputs = new ArrayList<String>();
				for(int i = 0; i< splitout.length;i++) {
					outputs.add(splitout[i]);
				}
				// converter solution
				String [] splitsol = solution.split("#");
				List<String> solutions = new ArrayList<String>();
				for(int i = 0; i< splitsol.length;i++) {
					solutions.add(splitsol[i]);
				}
				// converter language
				String [] splitlan = lang.split("#");
				List<String> langs = new ArrayList<String>();
				for(int i = 0; i< splitlan.length;i++) {
					langs.add(splitlan[i]);
				}
				
				// data local 
				String date = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
				// converte tags
				String [] splittag = tag.split(",");
				List<String> tags = new ArrayList<String>();
				for(int i = 0; i< splittag.length;i++) {
					tags.add(splittag[i]);
				}
				
				ExerciseData exerciseData = ExerciseData.getInstance();
				exerciseData.modifyData(new Exercise(id_exercise,title,statement,inputs,outputs,solutions,langs,difficulty,date,tags,user));
	}
	*/
}
