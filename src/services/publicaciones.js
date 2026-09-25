import { supabase } from './supabaseClient';

export async function obtenerPublicaciones() {
  return supabase
    .from("publicaciones")
    .select("id, titulo, contenido, creado_en")
    .order("creado_en", { ascending: false });
}

export async function crearPublicacion({ titulo, contenido }) {
  return supabase
    .from("publicaciones")
    .insert({ titulo, contenido });
}

export async function actualizarPublicacion(id, cambios) {
  return supabase
    .from("publicaciones")
    .update(cambios)
    .eq("id", id);
}

export async function eliminarPublicacion(id) {
  return supabase
    .from("publicaciones")
    .delete()
    .eq("id", id);
}
