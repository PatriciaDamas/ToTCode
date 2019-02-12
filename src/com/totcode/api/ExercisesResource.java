package com.totcode.api;


import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.mongodb.client.result.DeleteResult;
import com.totcode.data.UserData;
import com.totcode.impl.ExerciseManager;
import com.totcode.impl.UserManager;
import com.totcode.model.Exercise;
import com.totcode.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

@Path("/exercise")
public class ExercisesResource {
	
	// GET all exercises
	//Obter exercicios de um determinado grau de dificuldade
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		public List<Exercise>getExercises(@QueryParam("difficulty") String difficulty,
				@QueryParam("user") String user,@QueryParam("lang") String lang){
			ExerciseManager em = ExerciseManager.getInstance();
			
			if (difficulty!=null || user!=null || lang!= null) {
				return em.getExercises(difficulty,user,lang);
			} 

			return em.getExercises();
		}
		
		//obter exercicios de uma determinada linguagem
		@Path("/{id_exercise}")
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		public List<Exercise>getExercisesLang(@PathParam("id_exercise") int id_exercise) {
			ExerciseManager em = ExerciseManager.getInstance();
			return em. getExercisesLang(id_exercise);
		}
		
		public boolean getLoggedUser(String username)
		{
			UserData userData = UserData.getInstance();
			List<User> users = userData.getData();
			for (User user:users) {
		
				if(user.getName().equalsIgnoreCase(username))
				{
					return true;
				}
			}
			return false;
		}
		
		@Path("/{id_exercise}")
		@DELETE
		public Response deleteExercise (@PathParam("id_exercise") String id_exercise) {
			ExerciseManager em = ExerciseManager.getInstance();

				em.deleteExercise(id_exercise);
				return Response.ok().entity("Exercise removed!").build();

		}

		@POST
		@Consumes("application/x-www-form-urlencoded") // Caso for um form
		public Response insertExercise(
					@FormParam("title") String title,
					@FormParam("statement") String statement,
					@FormParam("inputs") String inputs,
					@FormParam("outputs") String outputs,
					@FormParam("solutions") String solutions,
					@FormParam("languages") String lang,
					@FormParam("difficulty") String difficulty,
					@FormParam("token") String token,
					@FormParam("tags") String tag,
					@Context UriInfo uriInfo
					// ARRANJAR SOLU��O PORQUE INPUTS SAO LIST DE STRINGS E FORMS NAO FUNCIONA BEM AQUI
				) {
					UserManager um = UserManager.getInstance();
					ExerciseManager em = ExerciseManager.getInstance();
					
					try {
					Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token);
					
					String user = (String)Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token).getBody().get("login");
					em.createExercise(title,statement, inputs, outputs, solutions, lang, difficulty, tag,user);
					UriBuilder builder = uriInfo.getAbsolutePathBuilder();	
					builder.path(title);
					return Response.created(builder.build()).build();
					
					}
					catch(SignatureException e){
						return Response.serverError().status(401).type("text/plain").entity("Invalid token!").build();
					}
				}
		
		/*@PUT
		@Consumes("application/x-www-form-urlencoded") // Caso for um form
		public Response modifyExercise(
					@FormParam("id_exercise") int id_exercise,
					@FormParam("title") String title,
					@FormParam("statement") String statement,
					@FormParam("inputs") String inputs,
					@FormParam("outputs") String outputs,
					@FormParam("solutions") String solutions,
					@FormParam("languages") String lang,
					@FormParam("difficulty") String difficulty,
					@FormParam("token") String token,
					@FormParam("tags") String tag,
					@Context UriInfo uriInfo
					// ARRANJAR SOLU��O PORQUE INPUTS SAO LIST DE STRINGS E FORMS NAO FUNCIONA BEM AQUI
				) {
					UserManager um = UserManager.getInstance();
					ExerciseManager em = ExerciseManager.getInstance();
					
					try {
					Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token);
					
					String user = (String)Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token).getBody().get("login");
					em.modifyExercise(id_exercise,title,statement, inputs, outputs, solutions, lang, difficulty, tag,user);
					UriBuilder builder = uriInfo.getAbsolutePathBuilder();	
					builder.path(title);
					return Response.created(builder.build()).build();
					
					}
					catch(SignatureException e){
						return Response.serverError().status(401).type("text/plain").entity("Invalid token!").build();
					}
				}
		*/
		
		
}
