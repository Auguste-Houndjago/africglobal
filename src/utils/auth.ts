"use server";

import { createClient } from "./supabase/server";

import { redirect } from "next/navigation";

export async function signUp(email: string, password: string, fullName: string) {
    const supabase = await createClient();
    
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`|| 'http://localhost:3000/auth/callback';


    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        emailRedirectTo: redirectTo,
        data: {
          full_name: fullName,
          password: password,
        },
      },
    });
  
    if (error) {
      throw error;
    }
  
    return data;
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

export async function getUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getUser();
  
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
