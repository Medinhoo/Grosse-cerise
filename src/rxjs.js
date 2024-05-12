import { useNavigate } from "react-router-dom";
import { BehaviorSubject } from "rxjs";

let logged = false
export const logged$ = new BehaviorSubject(logged); 

let user = null
export const user$ = new BehaviorSubject(user); 

export const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('https://api-learning-three.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Utilisateur non trouvé');
            } else if (response.status === 401) {
                throw new Error('Mot de passe incorrect');
            } else {
                throw new Error('Erreur de connexion');
            }
        }

        // Récupérer les données de l'utilisateur depuis la réponse
        user = await response.json()
        user$.next(user)

        logged = true;
        logged$.next(logged)

    } catch (error) {
        console.error('Erreur de connexion:', error.message);
    }
};



