package com.totcode.data;

import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.DeleteResult;
import com.totcode.model.Exercise;

public class ExerciseData {
	static ExerciseData ed = null;
	static MongoCollection<Exercise> colExercise;
	
	public static ExerciseData getInstance() {
			
		if(ed==null) {
			ed= new ExerciseData();
			
			CodecRegistry pojoCodecRegistry = fromRegistries(MongoClient.getDefaultCodecRegistry(), fromProviders(PojoCodecProvider.builder().automatic(true).build()));
			MongoClient mongoClient = new MongoClient("localhost", MongoClientOptions.builder().codecRegistry(pojoCodecRegistry).build());
			MongoDatabase dbExercise = mongoClient.getDatabase("TotCode");
			colExercise = dbExercise.getCollection("Exercises", Exercise.class);
			
		}
		return ed;
	}
	
	
	
	//Obter todos os exercicios
	public List<Exercise>getData(){
		final List<Exercise> exercises = new ArrayList<Exercise>();
		
		Block<Exercise> printblock = new Block<Exercise>() {
			public void apply(final Exercise exercise) {
				exercises.add(exercise);
			}
		};
		
		colExercise.find().forEach(printblock);
		System.out.println("tentei ir buscar qualquer coisa ao mongo");
		return exercises;
		
	}
	
	
	
	//obter exercicios de uma determinada dificuldade
	public List<Exercise> getData(String difficulty, String user, String lang){
		final List<Exercise> exercises = new ArrayList<Exercise>();
		Block<Exercise> printblock = new Block<Exercise>() {
			public void apply(final Exercise exercise) {
				exercises.add(exercise);
			}
		};
		
		Bson filterExercise;
		if(difficulty!=null && user!=null && lang!= null) {
			filterExercise = Filters.and(Filters.eq("difficulty",difficulty),Filters.eq("user",user),Filters.eq("lang",lang));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com 3 parametros");
		}else if(lang != null && difficulty==null && user==null) {
			filterExercise = Filters.and(Filters.eq("lang",lang));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com linguagem");
		}else if(lang == null && difficulty!=null && user==null) {
			filterExercise = Filters.and(Filters.eq("difficulty",difficulty));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com dificuldade");
		}else if(lang == null && difficulty==null && user!=null) {
			filterExercise = Filters.and(Filters.eq("user",user));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com user");
		}else if(lang != null && difficulty==null && user!=null) {
			filterExercise = Filters.and(Filters.eq("user",user),Filters.eq("lang",lang));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com user e linguagem");
		}else if(lang == null && difficulty!=null && user!=null) {
			filterExercise = Filters.and(Filters.eq("user",user),Filters.eq("difficulty",difficulty));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com user e dificuldade");
		}else if(lang != null && difficulty!=null && user==null) {
			filterExercise = Filters.and(Filters.eq("lang",lang),Filters.eq("difficulty",difficulty));
			colExercise.find(filterExercise).forEach(printblock);
			System.out.println("filtro com linguagem e dificuldade");
		}
		
		

		return exercises;
		
	}
	//Obter exercicios de uma determinada linguagem
	public List<Exercise> getLData(String lang){
		final List<Exercise> exercises = new ArrayList<Exercise>();
		Block<Exercise> printblock = new Block<Exercise>() {
			public void apply(final Exercise exercise) {
				exercises.add(exercise);
			}
		};
		
		colExercise.find(eq("lang",lang)).forEach(printblock);
		return exercises;
		
	}

	
	//obter exercicios de um determinado id
	public List<Exercise> getLangData(int id_exercise){
		final List<Exercise> exercises = new ArrayList<Exercise>();
		Block<Exercise> printblock = new Block<Exercise>() {
			public void apply(final Exercise exercise) {
				exercises.add(exercise);
			}
		};
		
		colExercise.find(eq("id_exercise",id_exercise)).forEach(printblock);
		return exercises;
	}

	
	public void insertData(Exercise exercise) {
			colExercise.insertOne(exercise);	
	}
	
	
	public int getLengthExercise() {
		int count = (int)colExercise.count();
		return count;
	}
	
	/*public void modifyData(Exercise exercise) {
		colExercise.deleteOne(eq("id_exercise",exercise));
		if(colExercise.deleteOne(eq("id_exercise",exercise.getId_exercise()))== null) {
			colExercise.insertOne(exercise);	
		}
	}
	*/
	
	public void deleteData (String id_exercise) {
		

			colExercise.deleteOne(eq("id_exercise",id_exercise));

		
	}
	

}
