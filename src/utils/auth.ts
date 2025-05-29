"use server";

import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function signUp(email: string, password: string, fullName: string) {
    try {
      const supabase = await createClient();
      
      const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`|| 'http://localhost:3000/auth/callback';

      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: fullName,
          },
        },
      });
    
      if (supabaseError) {
        console.error("[SUPABASE_SIGNUP_ERROR]", supabaseError);
        throw new Error(`Erreur d'inscription: ${supabaseError.message}`);
      }

      // Créer l'utilisateur dans Prisma
      if (data.user) {
        try {
          await prisma.user.create({
            data: {
              id: data.user.id,
              email: data.user.email!,
              fullName: fullName,
              role: "investor", // valeur par défaut
            },
          });
        } catch (prismaError: any) {
          console.error("[PRISMA_CREATE_ERROR]", prismaError);
          // Si l'erreur est due à un utilisateur existant, on continue
          if (prismaError.code !== 'P2002') {
            throw new Error(`Erreur de création du profil: ${prismaError.message}`);
          }
        }
      }
    
      return data;
    } catch (error: any) {
      console.error("[SIGNUP_ERROR]", error);
      throw new Error(error.message || "Une erreur est survenue lors de l'inscription");
    }
}
  

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }

  redirect("/login");
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}


export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    throw error;
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
