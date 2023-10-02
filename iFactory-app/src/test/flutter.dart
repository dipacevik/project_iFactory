import 'package:flutter/material.dart';

void main() => runApp(LoginApp());

class LoginApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login App',
      home: LoginScreen(),
    );
  }
}

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _handleLogin() {
    // Qui dovresti aggiungere la logica di autenticazione
    // Esempio: verifica email e password con un server o una simulazione
    String email = emailController.text;
    String password = passwordController.text;

    // Esegui la tua logica di autenticazione qui
    if (email == 'user@example.com' && password == 'password') {
      // L'utente è autenticato con successo, puoi navigare a un'altra schermata
      // es. Navigator.push(context, MaterialPageRoute(builder: (context) => HomeScreen()));
    } else {
      // Mostra un messaggio di errore in caso di autenticazione fallita
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Errore di autenticazione'),
            content: Text('Email o password errate. Riprova.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _handleLogin,
              child: Text('Accedi'),
            ),
          ],
        ),
      ),
    );
  }
}
