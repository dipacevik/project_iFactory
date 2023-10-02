import UIKit

class LoginViewController: UIViewController {
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func loginButtonTapped(_ sender: UIButton) {
        let email = emailTextField.text ?? ""
        let password = passwordTextField.text ?? ""

        // Qui dovresti aggiungere la logica di autenticazione
        // Esempio: verifica email e password con un server o una simulazione
        if email == "user@example.com" && password == "password" {
            // L'utente è autenticato con successo, puoi navigare a un'altra schermata
            // es. performSegue(withIdentifier: "segueToHome", sender: self)
        } else {
            // Mostra un messaggio di errore in caso di autenticazione fallita
            let alertController = UIAlertController(title: "Errore di autenticazione", message: "Email o password errate. Riprova.", preferredStyle: .alert)
            let okAction = UIAlertAction(title: "OK", style: .default, handler: nil)
            alertController.addAction(okAction)
            present(alertController, animated: true, completion: nil)
        }
    }
}
