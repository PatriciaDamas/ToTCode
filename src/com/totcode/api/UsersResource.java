package com.totcode.api;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.totcode.data.UserData;
import com.totcode.impl.UserManager;
import com.totcode.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;

@Path("/users")
public class UsersResource {

	// verificar autenticação
	public boolean getAuth(String email, String password) {

		UserData ud = UserData.getInstance();
		List<User> users = ud.getData();

		for (User user : users) {

			if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
				return true;
			}
			System.out.println(user.getEmail() + "email");
		}
		
		return false;
	}

	@Path("/auth")
	@POST
	public Response auth(@FormParam("login") String login, @FormParam("pass") String pass) {
		if (getAuth(login, pass)) {
			UserManager um = UserManager.getInstance();
			// Create user data
			Map<String, Object> user = new HashMap<String, Object>();
			user.put("login", login);
			System.out.println(user + "user/auth");

			String newToken = Jwts.builder().setClaims(user).setIssuer("TotCode")
					.signWith(SignatureAlgorithm.HS256, um.getKey()).compact();
			return Response.ok().entity(newToken).build();
		} else {
			return Response.serverError().status(401).type("text/plain").entity("Invalid User!").build();
		}
	}

	// obter todos os utilizadores
	// obter todos os utilizadores de uma determinada linguagem
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsers(@QueryParam("language") String language) {

		UserManager um = UserManager.getInstance();

		if (language != null) {
			return um.getUsers(language);
		}
		return um.getUsers();
	}

	// obter utilizador de uma determinada linguagem
	@Path("/{userId}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsersName(@PathParam("userId") String language) {

		UserManager um = UserManager.getInstance();
		return um.getUsersName(language);
	}

	// REMOVER um utilizador
	@Path("/{email}")
	@DELETE
	public Response removeUser(@PathParam("email") String email,@Context UriInfo uriInfo) {

		UserManager um = UserManager.getInstance();
		
		um.removeUser(email);
				
				return Response.ok().entity("User removed!").build();
		

		
	}

	// Adicionar um novo utilizador
	@POST
	@Consumes("application/x-www-form-urlencoded")
	public Response insertUser(@FormParam("name") String name, @FormParam("email") String email,
			@FormParam("profession") String profession, @FormParam("language") String language,
			@FormParam("password") String password, @Context UriInfo uriInfo) {

		// buscar a data local do user
		String timeStamp = new SimpleDateFormat("yyyy_MM_dd_HHmmss").format(Calendar.getInstance().getTime());
		System.out.println(timeStamp);
		System.out.println(timeStamp);

		UserManager um = UserManager.getInstance();

		
			

			um.createUser(name, timeStamp, email, profession, language, password);
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();
			builder.path(name);
			return Response.created(builder.build()).build();
	}
	
	
	@PUT
	@Path("/{email}")
	@Consumes("application/x-www-form-urlencoded")
	public Response modifyUser(@FormParam("name") String name, @FormParam("email") String email,
			@FormParam("profession") String profession, @FormParam("language") String language,
			@FormParam("password") String password, @Context UriInfo uriInfo,@PathParam("email") String email_antigo) {
		
		// buscar a data local do user
				String timeStamp = new SimpleDateFormat("yyyy_MM_dd_HHmmss").format(Calendar.getInstance().getTime());
				System.out.println(timeStamp);
				System.out.println(timeStamp);

				UserManager um = UserManager.getInstance();

				
					


					um.modifyUser(email_antigo,name, timeStamp, email, profession, language, password);

					UriBuilder builder = uriInfo.getAbsolutePathBuilder();
					builder.path(name);
					return Response.created(builder.build()).build();
		
	}

}
