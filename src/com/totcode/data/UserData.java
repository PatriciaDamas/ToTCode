package com.totcode.data;


import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.util.Arrays;
import com.mongodb.Block;

import com.mongodb.client.MongoCursor;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.result.DeleteResult;
import static com.mongodb.client.model.Updates.*;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import com.mongodb.client.result.UpdateResult;
import com.sun.org.apache.bcel.internal.generic.LNEG;

import java.util.ArrayList;
import java.util.List;

import javax.print.attribute.standard.PrinterLocation;

import com.totcode.model.User;

import sun.util.logging.resources.logging;



public class UserData {

	static UserData ud = null;
	static MongoCollection<User> colUser;
	
	public static UserData getInstance() {
		
		if(ud == null) {
			ud = new UserData();
			System.out.println("teste3");
			CodecRegistry pojoCodecRegistry = fromRegistries(MongoClient.getDefaultCodecRegistry(),
	                fromProviders(PojoCodecProvider.builder().automatic(true).build()));
			
			MongoClient mongoClient = new MongoClient("localhost", MongoClientOptions.builder().codecRegistry(pojoCodecRegistry).build());
			MongoDatabase databaseUser = mongoClient.getDatabase("TotCode");
			
			colUser = databaseUser.getCollection("users", User.class);
			
		}
		
		return ud;
		
	}
	
	//inserir user no mongo
	public void insertData(User user) {
		if(colUser.find(eq("name", user.getName())).first() == null) {			
			colUser.insertOne(user);
		}
		else {
			System.out.println("nome já existe");
		}
	}	
	
	
	//modificar user
	public void modifyData(String email_antigo,User novoUser) {
		colUser.deleteOne(eq("email", email_antigo));

		if(colUser.find(eq("email", novoUser.getEmail())).first() == null) {
			colUser.insertOne(novoUser);
		}
	}	
	
	//obter user do Mongo
	public List<User> getData() {
		final List<User> users = new ArrayList<User>();
		
		Block<User> printBlock = new Block<User>() {
		    public void apply(final User user) {
		    	users.add(user);
		    }
		};

		colUser.find().forEach(printBlock);
		System.out.println(users);
		return users;
		
	}
	
	//obter user de uma determinada linguagem
	public List<User> getData(String language) {
		final List<User> users = new ArrayList<User>();
		
		Block<User> printBlock = new Block<User>() {
		    public void apply(final User user) {
		    	users.add(user);
		    }
		};
		colUser.find(eq("language",language)).forEach(printBlock);
		return users;
	}
	
	//obter user de um determinado nome
	public List<User> getUserData(String name) {
		final List<User> users = new ArrayList<User>();
		
		Block<User> printBlock = new Block<User>() {
		    public void apply(final User user) {
		    	users.add(user);
		    }
		};
		colUser.find(eq("name",name)).forEach(printBlock);
		return users;
	}
	
	
	//remover user do Mongo
	
	public void removeData(String email) {
		colUser.deleteOne(eq("email", email));
	}
}
