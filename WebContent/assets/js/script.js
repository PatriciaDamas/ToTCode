$(document).ready(function () {


    //preencher os botões de filtro por autor
    $.getJSON("http://localhost:8080/TotCode/tot/exercise", function (result) {
        var txtHtml = "	";


        $.each(result, function (i, field) {

            txtHtml += "<option value='" + field.user + "'>" + field.user + "</option>";
            console.log(field.user)

        });

        $("#sltUser").append(txtHtml);

    });


    //variável que constroi um formulário de exercicios sempre que é chamada
    var forExercise = "<h3>Create Exercise</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtTitle'>Title:</label><input type='text' id='titletext' name='titletext' class='form-control' placeholder='Insert Title of the Exercise'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtStat'>Statement:</label>	<textarea class='form-control' rows='2' placeholder='Statement of the Exercise' id='statementtext' name='statementtext'></textarea></div></div><div class='row form-group'><div class='col-md-6'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input1' name='input1'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input2' name='input2'></div></div><div class='row form-group'><div class='col-md-6'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output1' name='output1'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output2' name='output2'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtTags'>Tags:</label><input type='text' id='tags' name='tags' class='form-control' placeholder='Enter Tags'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='lang1' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><label for='txtSol'>Solution:</label><input type='text' id='sol1' name='solution' class='form-control' placeholder='Insert Solution of the Exercise'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtSol'>Solution:</label><input type='text' id='sol2' name='solution' class='form-control' placeholder='Insert Solution of the Exercise'></div></div><div class='row form-group' > <div class='col-md-12'><label for='difficulty'>Difficulty:</label><select id='dif' name='difficulty' class='form-control'><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnInsertEx1'>Insert Exercise</button></div></div></form > "

    //função chamada para criar sempre um novo exercicio
    function createExercise() {
        $("#btnInsertEx1").click(function () {

            console.log("Criei um exercicio");

            var title = $("#titletext").val();
            var statement = $("#txtStat").val();
            var inputs = $("#input1").val();
            var inputs2 = $("#input2").val();
            var outputs = $("#output1").val();
            var outputs2 = $("#output2").val();
            var solutions = $("#sol1").val();
            var solutions2 = $("#sol2").val();
            var languages = $("#lang1").val();
            var tags = $("#tags").val();
            var difficulty = $("#dif").val();

            var myToken;
            if (localStorage.token == null) {
                myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
            } else {
                myToken = localStorage.token;
            }
            console.log(myToken)

            console.log(title + statement + inputs + outputs + solutions + languages + tags);
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/TotCode/tot/exercise",
                data: {
                    title: title,
                    statement: statement,
                    inputs: inputs + "#" + inputs2,
                    outputs: outputs + "#" + outputs2,
                    solutions: solutions + "#" + solutions2,
                    languages: languages,
                    tags: tags,
                    difficulty: difficulty,
                    token: myToken
                }
            })
                .done(function (msg) {
                    console.log(msg + "exercicio criado com sucesso");
                    alert("criei EXERCICIOOOO");
                    $("#divLog").empty();
                    $("#divLog").append('<div class="row form-group"><div class="col-md-12"><button type="button" class=2btn btn-default" id="exercise">Create a New Exercise</button></div></div> <div class="alert alert-success"> <strong>Exercise successfully!</strong> Thank you, your exercise has been created in Tot Code. </div>')
                    $("#exercise").click(function () {
                        $("#divLog").empty();
                        $("#divLog").append(forExercise);
                        createExercise();
                    });
                });

        });

    }

    console.log("entrei");
    $("#btnLogin").click(function () {
        $("#divLog").empty();
        $("#divLog").append("<h3>Click Here to Login</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='fullname'>Email address:</label><input type='text' id='fullname' class='form-control' placeholder='Enter email'></div></div><div class='row form-group'><div class='col-md-12'><label for='password'>Password:</label>	<input type='password' id='txtPasse' class='form-control' placeholder='Enter password'></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='login2'>LOGIN</button></div></div></form>	");
        console.log("cheguei");

        //login através do botão do menu
        $("#login2").click(function () {

            var user = $("#fullname").val();
            var passe = $("#txtPasse").val();

            console.log(user + " " + passe);

            if (user == "" || passe == "" || user == null || passe == null) {
                //Error Throw
                alert("Por favor, verifique se todos os campos estão preenchidos");
            }
            else {

                $.ajax({
                    method: "POST",
                    url: "http://localhost:8080/TotCode/tot/users/auth",
                    data: {
                        login: user,
                        pass: passe,
                    }
                }).done(function (msg) {

                    localStorage.setItem("token", msg);
                    alert("Your loggin was a success!!");
                    console.log("entrei no login2");
                    console.log("Abrir formulário para criar exercicios");

                    $("#divLog").empty();
                    $("#btnMenuuu").empty();
                    $("#btnMenuuu").append("<ul><li><button id='modifyAccount' type='button' class='btn btn-primary'>Modify Acount</button></li>");
                    $("#btnMenuuu").append("<li><button id='btnRemoveUser' type='button' class='btn btn-primary'>Remove Account</button></li>");
                    $("#btnMenuuu").append("<li><button id='btnLogout' type='button' class='btn btn-primary'>Logout</button></li></ul>");
                    $("#divExSelec").append("<button type='button' class='btn btn-default' id='btnRemoveExercise'>REMOVE</button>");
                    //remove exercicio
                    $("#btnRemoveExercise").click(function () {


                        $.ajax({
                            method: "DELETE",
                            url: "http://localhost:8080/TotCode/tot/exercise/" + idEx,
                            data: {
                            }
                        })
                            .done(function (msg) {
                                $("#divExSelec").empty();
                                $("#divExSelec").append("<div class='alert alert-success'> <strong>Delete Exercise!</strong> Thank you, your exercise has been deleted in Tot Code. </div>");
                                alert("Exercicio apagado")

                            });

                    });



                    //fazer o logout
                    $("#modifyAccount").click(function () {

                        $("#divLog").empty();
                        $("#divLog").append("<h3>Register Here</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtEmail'>Email address:</label><input type='text' id='txtEmail' class='form-control' placeholder='Enter email'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtPass'>Password:</label>	<input type='password' class='form-control' placeholder='Enter password' id='txtPass'></div></div><div class='row form-group'><div class='col-md-12'><label for='passwordConf'>Confirm the Password:</label><input type='password' class='form-control'placeholder='Confirm password' id='passwordConf'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtName'>Name:</label><input type='text' id='txtName' class='form-control' placeholder='Enter Name'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtProf'>Profession:</label><input type='text' id='txtProf' class='form-control' placeholder='Enter profession'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='txtLang' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnModifyAccount'>MODDIFY ACCOUNT</button></div></div></form > ");



                        $("#btnModifyAccount").click(function () {
                            console.log(user)

                            $.ajax({
                                method: "PUT",
                                url: "http://localhost:8080/TotCode/tot/users/" + user,
                                data: {
                                    name: $("#txtName").val(),
                                    email: $("#txtEmail").val(),
                                    profession: $("#txtProf").val(),
                                    language: $("#txtLang").val(),
                                    password: $("#txtPass").val()
                                }
                            })
                                .done(function (msg) {
                                	 $("#divLog").empty();
                                     $("#divLog").append("<div class='alert alert-success'> <strong>Modified Exercise!</strong> Thank you, your exercise has been modified in Tot Code. </div>");
                                    alert("Conta modificada!!");
                                });

                        });


                    });

                    //fazer o logout
                    $("#btnLogout").click(function () {
                        localStorage.removeItem("token");
                        window.location.reload();
                    });
                    //fazer o logout
                    $("#btnRemoveUser").click(function () {

                        //window.location.reload();


                        console.log(user)
                        $.ajax({
                            method: "DELETE",
                            url: "http://localhost:8080/TotCode/tot/users/" + user,
                            data: {

                            }
                        })
                            .done(function (msg) {
                                localStorage.removeItem("token");
                                window.location.reload();
                            });


                    });

                    $("#divLog").empty();
                    $("#divLog").append("<h3>Create Exercise</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtTitle'>Title:</label><input type='text' id='titletext' name='titletext' class='form-control' placeholder='Insert Title of the Exercise'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtStat'>Statement:</label>	<textarea class='form-control' rows='2' placeholder='Statement of the Exercise' id='statementtext' name='statementtext'></textarea></div></div><div class='row form-group'><div class='col-md-6'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input1' name='input1'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input2' name='input2'></div></div><div class='row form-group'><div class='col-md-6'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output1' name='output1'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output2' name='output2'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtTags'>Tags:</label><input type='text' id='tags' name='tags' class='form-control' placeholder='Enter Tags'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='lang1' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><label for='txtSol'>Solution:</label><input type='text' id='sol1' name='solution' class='form-control' placeholder='Insert Solution of the Exercise'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtSol'>Solution:</label><input type='text' id='sol2' name='solution' class='form-control' placeholder='Insert Solution of the Exercise'></div></div><div class='row form-group' > <div class='col-md-12'><label for='difficulty'>Difficulty:</label><select id='dif' name='difficulty' class='form-control'><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnInsertEx1'>Insert Exercise</button></div></div></form > ");

                    $("#btnInsertEx1").click(function () {

                        console.log("Criei um exercicio");

                        var title = $("#titletext").val();
                        var statement = $("#txtStat").val();
                        var inputs = $("#input1").val();
                        var inputs2 = $("#input2").val();
                        var outputs = $("#output1").val();
                        var outputs2 = $("#output2").val();
                        var solutions = $("#sol1").val();
                        var solutions2 = $("#sol2").val();
                        var languages = $("#lang1").val();
                        var tags = $("#tags").val();
                        var difficulty = $("#dif").val();


                        var myToken;
                        if (localStorage.token == null) {
                            myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
                        } else {
                            myToken = localStorage.token;
                        }
                        console.log(myToken)
                        console.log(title + statement + inputs + outputs + solutions + languages + tags);
                        $.ajax({
                            method: "POST",
                            url: "http://localhost:8080/TotCode/tot/exercise",
                            data: {
                                title: title,
                                statement: statement,
                                inputs: inputs + "#" + inputs2,
                                outputs: outputs + "#" + outputs2,
                                solutions: solutions + "#" + solutions2,
                                languages: languages,
                                tags: tags,
                                difficulty: difficulty,
                                token: myToken
                            }
                        })
                            .done(function (msg) {
                                console.log(msg + "exercicio criado com sucesso");
                                alert("criei EXERCICIOOOO");
                                $("#divLog").empty();
                                $("#divLog").append('<div class="row form-group"><div class="col-md-12"><button type="button" class=2btn btn-default" id="exercise">Create a New Exercise</button></div></div> <div class="alert alert-success"> <strong>Exercise successfully!</strong> Thank you, your exercise has been created in Tot Code. </div>')
                                $("#exercise").click(function () {
                                    console.log("exercicio novo");
                                    $("#divLog").empty();
                                    $("#divLog").append(forExercise);
                                    //chama a função para estar sempre a criar exercicios sempre que é clicado o botão create exercise
                                    createExercise();
                                });
                            });

                    });

                }).fail(function () {
                    alert("Dados de Login incorretos");
                });




            }//fim else

        });//fim do botão do login2

    });



    //login página principal
    $("#login").click(function () {

        var user = $("#txtname").val();
        var passe = $("#pwd").val();

        console.log(user + " " + passe);

        if (user == "" || passe == "" || user == null || passe == null) {
            //Error Throw
            alert("Por favor, verifique se todos os campos estão preenchidos");
        }
        else {

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/TotCode/tot/users/auth",
                data: {
                    login: user,
                    pass: passe,
                }
            }).done(function (msg) {
                localStorage.setItem("token", msg);
                alert("Your loggin was a success!!");
                

                $("#divLog").empty();
                $("#btnMenuuu").empty();
                $("#btnMenuuu").append("<ul><li><button id='modifyAccount' type='button' class='btn btn-primary'>Modify Acount</button></li>");
                $("#btnMenuuu").append("<li><button id='btnLogout' type='button' class='btn btn-primary'>Logout</button></li>");
                $("#btnMenuuu").append("<li><button id='btnRemoveUser' type='button' class='btn btn-primary'>Remove Acount</button></li></ul>");
                $("#divLog").append("<h3>Create Exercise</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtTitle'>Title:</label><input type='text' id='titletext' name='titletext' class='form-control' placeholder='Insert Title of the Exercise'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtStat'>Statement:</label>	<textarea class='form-control' rows='2' placeholder='Statement of the Exercise' id='txtStat' name='statementtext'></textarea></div></div><div class='row form-group'><div class='col-md-6'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input1' name='input1'><label for='input'>Input:</label><input type='text' class='form-control'placeholder='Input of the Exercise' id='input2' name='input2'></div></div><div class='row form-group'><div class='col-md-6'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output1' name='output1'><label for='output'>Output:</label><input type='text' class='form-control'placeholder='Output of the Exercise' id='output2' name='output2'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtTags'>Tags:</label><input type='text' id='tags' name='tags' class='form-control' placeholder='Enter Tags'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='lang1' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><label for='txtSol'>Solution:</label><input type='text' id='sol1' name='solution' class='form-control' placeholder='Insert Solution of the Exercise'></div></div><div class='row form-group' > <div class='col-md-12'><label for='difficulty'>Difficulty:</label><select id='dif' name='difficulty' class='form-control'><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnInsertEx1'>Insert Exercise</button></div></div></form > ");
                $("#divExSelec").append("<button type='button' class='btn btn-default' id='btnRemoveExercise'>REMOVE</button>");

                //remove exercicio
                $("#btnRemoveExercise").click(function () {


                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/TotCode/tot/exercise/" + idEx,
                        data: {
                        }
                    })
                        .done(function (msg) {
                            $("#divExSelec").empty();
                            $("#divExSelec").append("<div class='alert alert-success'> <strong>Delete Exercise!</strong> Thank you, your exercise has been deleted in Tot Code. </div>");
                            alert("Exercicio apagado")

                        });

                });


                //modificar conta
                $("#modifyAccount").click(function () {

                    $("#divLog").empty();
                    $("#divLog").append("<h3>Register Here</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtEmail'>Email address:</label><input type='text' id='txtEmail' class='form-control' placeholder='Enter email'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtPass'>Password:</label>	<input type='password' class='form-control' placeholder='Enter password' id='txtPass'></div></div><div class='row form-group'><div class='col-md-12'><label for='passwordConf'>Confirm the Password:</label><input type='password' class='form-control'placeholder='Confirm password' id='passwordConf'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtName'>Name:</label><input type='text' id='txtName' class='form-control' placeholder='Enter Name'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtProf'>Profession:</label><input type='text' id='txtProf' class='form-control' placeholder='Enter profession'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='txtLang' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnModifyAccount'>MODDIFY ACCOUNT</button></div></div></form > ");



                    $("#btnModifyAccount").click(function () {
                        console.log(user)

                        $.ajax({
                            method: "PUT",
                            url: "http://localhost:8080/TotCode/tot/users/" + user,
                            data: {
                                name: $("#txtName").val(),
                                email: $("#txtEmail").val(),
                                profession: $("#txtProf").val(),
                                language: $("#txtLang").val(),
                                password: $("#txtPass").val()
                            }
                        })
                            .done(function (msg) {
                                alert("Conta modificada!!");
                                $("#divLog").empty();
                
                                $("#divLog").append("<div class='alert alert-success'> <strong>Modified Exercise!</strong> Thank you, your exercise has been modified in Tot Code. </div>");
                            });

                    });


                });

                //fazer o logout
                $("#btnLogout").click(function () {
                    localStorage.removeItem("token");
                    window.location.reload();
                });
                //fazer o logout
                $("#btnRemoveUser").click(function () {

                    //window.location.reload();


                    console.log(user)
                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/TotCode/tot/users/" + user,
                        data: {

                        }
                    })
                        .done(function (msg) {
                            localStorage.removeItem("token");
                            window.location.reload();
                        });


                });
                $("#btnInsertEx1").click(function () {

                    console.log("Criei um exercicio");

                    var title = $("#titletext").val();
                    var statement = $("#txtStat").val();
                    var inputs = $("#input1").val();
                    var inputs2 = $("#input2").val();
                    var outputs = $("#output1").val();
                    var outputs2 = $("#output2").val();
                    var solutions = $("#sol1").val();
              
                    var languages = $("#lang1").val();
                    var tags = $("#tags").val();
                    var difficulty = $("#dif").val();

                    var myToken;
                    if (localStorage.token == null) {
                        myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
                    } else {
                        myToken = localStorage.token;
                    }
                    console.log(myToken)


                    console.log(title + statement + inputs + outputs + solutions + languages + tags);
                    $.ajax({
                        method: "POST",
                        url: "http://localhost:8080/TotCode/tot/exercise",
                        data: {
                            title: title,
                            statement: statement,
                            inputs: inputs + "#" + inputs2,
                            outputs: outputs + "#" + outputs2,
                            solutions: solutions + "#" + solutions2,
                            languages: languages,
                            tags: tags,
                            difficulty: difficulty,
                            token: myToken
                        }
                    })
                        .done(function (msg) {
                            console.log(msg + "exercicio criado com sucesso");
                            alert("criei EXERCICIOOOO");
                            $("#divLog").empty();
                            $("#divLog").append('<div class="row form-group"><div class="col-md-12"><button type="button" class=2btn btn-default" id="exercise">Create a New Exercise</button></div></div> <div class="alert alert-success"> <strong>Exercise successfully!</strong> Thank you, your exercise has been created in Tot Code. </div>')
                            $("#exercise").click(function () {
                                $("#divLog").empty();
                                $("#divLog").append(forExercise);
                                createExercise();
                            });
                        });

                });

            }).fail(function () {
                alert("Dados de Login incorretos");
            });




        }//fim else




    });//fim do botao login






    //Cria um novo utilizador
    $("#btnSignUp").click(function () {
        $("#divLog").empty();
        console.log("cheguei");
        $("#divLog").append("<h3>Register Here</h3><form action='#'><div class='row form-group'><div class='col-md-12'><label for='txtEmail'>Email address:</label><input type='text' id='txtEmail' class='form-control' placeholder='Enter email'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtPass'>Password:</label>	<input type='password' class='form-control' placeholder='Enter password' id='txtPass'></div></div><div class='row form-group'><div class='col-md-12'><label for='passwordConf'>Confirm the Password:</label><input type='password' class='form-control'placeholder='Confirm password' id='passwordConf'> </div></div><div class='row form-group' > <div class='col-md-12'><label for='txtName'>Name:</label><input type='text' id='txtName' class='form-control' placeholder='Enter Name'></div></div><div class='row form-group'><div class='col-md-12'><label for='txtProf'>Profession:</label><input type='text' id='txtProf' class='form-control' placeholder='Enter profession'></div></div><div class='row form-group' > <div class='col-md-12'><label for='name'>Language:</label><select id='txtLang' name='language' class='form-control'><option value='java'>Java</option><option value='php'>PHP</option><option value='javascript'>JavaScript</option><option value='html'>HTML</option><option value='css'>CSS</option><option value='sql'>SQL</option><option value='python'>Python</option><option value='ruby'>Ruby</option><option value='csharpe'>C#</option><option value='c'>C</option><option value='visualbasic'>Visual Basic .NET</option><option value='matlab'>MatLab</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option></select></div></div><div class='row form-group'><div class='col-md-12'><button type='button' class='btn btn-default' id='btnInsert'>REGISTER</button></div></div></form > ");


        //botão que regista o utilizador
        $("#btnInsert").click(function () {
            console.log("vamos criar um novo utilizador");
            var passe = $("#txtPass").val();
            var passeConf = $("#passwordConf").val();


            if (passe == passeConf) {
                $.ajax({
                    method: "POST",
                    url: "http://localhost:8080/TotCode/tot/users",
                    data: {
                        name: $("#txtName").val(),
                        email: $("#txtEmail").val(),
                        profession: $("#txtProf").val(),
                        language: $("#txtLang").val(),
                        password: $("#txtPass").val()
                    }
                })
                    .done(function (msg) {

                        $("#divLog").empty();
                        $("#divLog").append(' <div class="alert alert-success"> <strong>Register successfully!</strong> Thank you, your account has been created in Tot Code. Please login with your credentials. </div>')
                        //window.location.reload();
                        console.log("user inserido")

                        $("#exercise").click(function () {
                            $("#divLog").empty();
                            $("#divLog").append(forExercise);
                            createExercise();
                        });
                    });

            } else {
                console.log("passes diferentes")
                $("#divLog").append(' <div class="alert alert-danger"> <strong>Different password!</strong> Please check that the passwords are the same. </div>')
            }



        });


    });

    $("#btnFilter1").click(function () {
        console.log("Filtross");
        $("#divEx").empty();
        var language = $("#sltLang").val();
        var dif = $("#sltDifficulty").val();
        var user = $("#sltUser").val();

        console.log(language + " " + dif + " " + user)
        var url = "";



        if (language == null && dif == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?user=" + user;//filtrar por linguagem e user
        } else if (user == null && dif == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?lang=" + language;//filtrar por linguagem e user
        } else if (user == null && language == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?difficulty=" + dif;//filtrar por linguagem e user
        } else if (user == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?difficulty=" + dif + "&lang=" + language;//filtrar por dificuldade e linguagem
        } else if (dif == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?user=" + user + "&lang=" + language;//filtrar por linguagem e user
        } else if (language == null) {
            url = "http://localhost:8080/TotCode/tot/exercise?difficulty=" + dif + "&user=" + user;//filtrar por dificuldade e user
        } else {
            url = "http://localhost:8080/TotCode/tot/exercise?difficulty=" + dif + "&user=" + user + "&lang=" + language; //filtrar todos
        }


        var jqxhr = $.get(url, function () {

        })
            .done(function (data) {
                console.log("Entrei no Filtro");
                console.log(data.length);
                $("#divEx").empty();
                //tabela bootstrap
                var txtHtml2 = "<div class='table-responsive'>";
                txtHtml2 += "<table class='table' id='tableFilter'>"


                //definir cabeçalhos da tabela
                txtHtml2 += "<thead style='color:white;text-align:center;'>"
                txtHtml2 += "<tr>"
                txtHtml2 += "<th>Número</th>"
                txtHtml2 += "<th>Title</th>"
                txtHtml2 += "<th>User</th>"
                txtHtml2 += "<th>Difficulty</th>"
                txtHtml2 += "<th>Language</th>"
                txtHtml2 += "</tr></thead><tbody style='color:white;text-align:center;'>"

                // definir conteudo da tabela



                for (var j = 0; j < data.length; j++) {
                    console.log(data.length);

                    txtHtml2 += "<tr>"
                    txtHtml2 += "<td>" + data[j].id_exercise + "</td>"
                    txtHtml2 += "<td>" + data[j].title + "</td>"
                    txtHtml2 += "<td>" + data[j].user + "</td>"
                    txtHtml2 += "<td>" + data[j].difficulty + "</td>"

                    //definir a linguagem do exercicios na tabela
                    txtHtml2 += "<td>"
                    for (var i = 0; i < data[j].lang.length; i++) {
                        console.log(data[j].lang[i])
                        txtHtml2 += data[j].lang[i] + "<br>"
                    }

                    txtHtml2 += "</td>" //fecho da linha e coluna da linguagem
                    txtHtml2 += "</tr>"
                }



                txtHtml2 += "<tbody></table>";
                txtHtml2 += "</div>";
                $("#divEx").append(txtHtml2);


                //iniciar selecção de linha
                $("#tableFilter tr").click(function () {
                    console.log($(this).find("td").eq(0).html())
                    console.log("cliquei na tabela")
                    var idEx = $(this).find("td").eq(0).html();

                    var url = "http://localhost:8080/TotCode/tot/exercise/" + idEx;
                    $("#divExSelec").empty();


                    var jqxhr = $.get(url, function () {

                    })
                        .done(function (data) {

                            var txtHtml = "<div class='fh5co-text'>";



                            for (var j = 0; j < data.length; j++) {



                                txtHtml += " <h3 style='color:white'>Title: " + data[j].title + "</h3>"
                                txtHtml += " <p style='color:white;font-size:14px;'>Statement: " + data[j].statement + "</p>"
                                txtHtml += " <p style='color:white;font-size:14px;'>User: " + data[j].user + "</p>"
                                txtHtml += " <p style='color:white;font-size:14px;'>Difficulty: " + data[j].difficulty + "</p>"

                                txtHtml += " <p style='color:white;font-size:14px;'>Language: "

                                //definir a linguagem do exercicios no card

                                for (var i = 0; i < data[j].lang.length; i++) {
                                    txtHtml += data[j].lang[i] + "<br>"
                                }

                                txtHtml += "</p>" //fecho da linha das linguagens

                                //definir a solução dos exercicios no card
                                txtHtml += "<p style='color:white;font-size:14px;'>Solution: "
                                for (var i = 0; i < data[j].solutions.length; i++) {
                                    txtHtml += data[j].solutions[i] + "<br>"
                                }

                                txtHtml += "</p>" //fecho da linha das soluções

                                //definir a inputs dos exercicios no card
                                txtHtml += "<p style='color:white;font-size:14px;'>Inputs: "
                                for (var i = 0; i < data[j].inputs.length; i++) {
                                    txtHtml += data[j].inputs[i] + "<br>"
                                }

                                txtHtml += "</p>" //fecho da linha das soluções

                                //definir a outputs dos exercicios no card
                                txtHtml += "<p style='color:white; font-size:14px;'>Outputs: "
                                for (var i = 0; i < data[j].outputs.length; i++) {
                                    txtHtml2 += data[j].outputs[i] + "<br>"
                                }

                                txtHtml += "</p>" //fecho da linha dos outputs


                                //definir as tags dos exercicios no card
                                txtHtml += "<p style='color:white;font-size:14px;'>Tags: "
                                for (var i = 0; i < data[j].tags.length; i++) {
                                    txtHtml += data[j].tags[i] + "<br>"
                                }

                                txtHtml += "</p>" //fecho da linha das tags

                            }



                            txtHtml += " </div>"

                            $("#divExSelec").append(txtHtml);






                        })
                        .fail(function () {
                            alert("error");
                        });



                });//Fim do inicio da seleção


            })
            .fail(function () {
                alert("error");
            });
    });//Fim botão filtro



    //Procura todos os exercicios
    $("#btnSearchEx").click(function () {

        console.log("Vou listar os exercicios");


        var url = "http://localhost:8080/TotCode/tot/exercise";
        var jqxhr = $.get(url, function () {

        })
            .done(function (data) {
                $("#divEx").empty();
                console.log(data.length);

                //tabela bootstrap
                var txtHtml2 = "<div class='table-responsive'>";
                txtHtml2 += "<table class='table' id='tableEx'>"

                //definir cabeçalhos da tabela
                txtHtml2 += "<thead style='color:white;text-align:center;'>"
                txtHtml2 += "<tr>"
                txtHtml2 += "<th>Número</th>"
                txtHtml2 += "<th>Title</th>"
                txtHtml2 += "<th>User</th>"
                txtHtml2 += "<th>Difficulty</th>"
                txtHtml2 += "<th>Language</th>"
                txtHtml2 += "</tr></thead><tbody style='color:white;text-align:center;'>"

                // definir conteudo da tabela



                for (var j = 0; j < data.length; j++) {



                    txtHtml2 += "<tr>"
                    txtHtml2 += "<td>" + data[j].id_exercise + "</td>"
                    txtHtml2 += "<td>" + data[j].title + "</td>"
                    txtHtml2 += "<td>" + data[j].user + "</td>"
                    txtHtml2 += "<td>" + data[j].difficulty + "</td>"

                    //definir a linguagem do exercicios na tabela
                    txtHtml2 += "<td>"
                    for (var i = 0; i < data[j].lang.length; i++) {
                        console.log(data[j].lang[i])
                        txtHtml2 += data[j].lang[i] + "<br>"
                    }

                    txtHtml2 += "</td>" //fecho da linha e coluna da linguagem



                    //fecho de linha
                    txtHtml2 += "</tr>"
                }



                txtHtml2 += "<tbody></table>";
                txtHtml2 += "</div>";
                $("#divEx").append(txtHtml2);

                //mostrar apenas um exercicio
                $("#tableEx tr").click(function () {
                    console.log($(this).find("td").eq(0).html())


                    var idEx = $(this).find("td").eq(0).html();
                    var url = "http://localhost:8080/TotCode/tot/exercise/" + idEx;
                    $("#divExSelec").empty();


                    var jqxhr = $.get(url, function () {

                    })
                        .done(function (data) {

                            var txtHtml2 = "<div class='fh5co-text'>";



                            for (var j = 0; j < data.length; j++) {



                                txtHtml2 += " <h3 style='color:white'>Title: " + data[j].title + "</h3>"
                                txtHtml2 += " <p style='color:white;font-size:14px;'>Statement: " + data[j].statement + "</p>"
                                txtHtml2 += " <p style='color:white;font-size:14px;'>User: " + data[j].user + "</p>"
                                txtHtml2 += " <p style='color:white;font-size:14px;'>Difficulty: " + data[j].difficulty + "</p>"

                                txtHtml2 += " <p style='color:white;font-size:14px;'>Language: "

                                //definir a linguagem do exercicios no card

                                for (var i = 0; i < data[j].lang.length; i++) {
                                    txtHtml2 += data[j].lang[i] + "<br>"
                                }

                                txtHtml2 += "</p>" //fecho da linha das linguagens

                                //definir a solução dos exercicios no card
                                txtHtml2 += "<p style='color:white;font-size:14px;'>Solution: "
                                for (var i = 0; i < data[j].solutions.length; i++) {
                                    txtHtml2 += data[j].solutions[i] + "<br>"
                                }

                                txtHtml2 += "</p>" //fecho da linha das soluções

                                //definir a inputs dos exercicios no card
                                txtHtml2 += "<p style='color:white;font-size:14px;'>Inputs: "
                                for (var i = 0; i < data[j].inputs.length; i++) {
                                    txtHtml2 += data[j].inputs[i] + "<br>"
                                }

                                txtHtml2 += "</p>" //fecho da linha das soluções

                                //definir a outputs dos exercicios no card
                                txtHtml2 += "<p style='color:white; font-size:14px;'>Outputs: "
                                for (var i = 0; i < data[j].outputs.length; i++) {
                                    txtHtml2 += data[j].outputs[i] + "<br>"
                                }

                                txtHtml2 += "</p>" //fecho da linha dos outputs


                                //definir as tags dos exercicios no card
                                txtHtml2 += "<p style='color:white;font-size:14px;'>Tags: "
                                for (var i = 0; i < data[j].tags.length; i++) {
                                    txtHtml2 += data[j].tags[i] + "<br>"
                                }

                                txtHtml2 += "</p>" //fecho da linha das tags

                            }


                            txtHtml2 += " </div>"

                            $("#divExSelec").append(txtHtml2);




                        })
                        .fail(function () {
                            alert("error");
                        });



                });



            })
            .fail(function () {
                alert("error");
            });




    });




});//Fim script