import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton} from '@ionic/react';
import React, {useState} from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand="full" onClick={handleLogin}>
          Accedi
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
