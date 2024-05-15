import { useNavigate } from "react-router-dom";
import { BehaviorSubject } from "rxjs";

let logged = false;
export const logged$ = new BehaviorSubject(logged);

let user = {};
export const user$ = new BehaviorSubject(user);

export const signupSuccessMessage$ = new BehaviorSubject('')

export const darkMode$ = new BehaviorSubject(false)

let loading = false;
export const loading$ = new BehaviorSubject(loading);


export const handleSubmit = async (event) => {
  loading$.next(true)
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch(
      "https://api-learning-three.vercel.app/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Utilisateur non trouvé");
      } else if (response.status === 401) {
        throw new Error("Mot de passe incorrect");
      } else {
        throw new Error("Erreur de connexion");
      }
    }

    // Récupérer les données de l'utilisateur depuis la réponse
    user = await response.json();
    user$.next(user);

    logged = true;
    logged$.next(logged);
    localStorage.setItem("user", JSON.stringify(user));
    loading$.next(false)
  } catch (error) {
    console.error("Erreur de connexion:", error.message);
  }
};

export const fetchUsers = async () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userId = JSON.parse(storedUser)._id; // Récupérer l'ID de l'utilisateur depuis le localStorage

      const response = await fetch(
        `https://api-learning-three.vercel.app/users`
      );
      const usersData = await response.json();

      // Trouver l'utilisateur avec le même ID que celui stocké localement
      const currentUser = usersData.find((user) => user._id === userId);

      if (currentUser) {
        user$.next(currentUser); // Mettre à jour l'utilisateur dans user$
      } else {
        console.error("User not found");
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

};
