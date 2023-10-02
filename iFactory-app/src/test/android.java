import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class LoginActivity extends Activity {

    private EditText emailEditText;
    private EditText passwordEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        Button loginButton = findViewById(R.id.loginButton);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = emailEditText.getText().toString();
                String password = passwordEditText.getText().toString();

                // Qui dovresti aggiungere la logica di autenticazione
                // Esempio: verifica email e password con un server o una simulazione
                if (email.equals("user@example.com") && password.equals("password")) {
                    // L'utente è autenticato con successo, puoi navigare a un'altra schermata
                    // es. startActivity(new Intent(LoginActivity.this, HomeActivity.class));
                } else {
                    // Mostra un messaggio di errore in caso di autenticazione fallita
                    new AlertDialog.Builder(LoginActivity.this)
                            .setTitle("Errore di autenticazione")
                            .setMessage("Email o password errate. Riprova.")
                            .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    // Chiudi il dialog
                                }
                            })
                            .show();
                }
            }
        });
    }
}
