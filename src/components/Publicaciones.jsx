import React, { useState, useEffect } from 'react';
import { 
  obtenerPublicaciones, 
  crearPublicacion, 
  actualizarPublicacion, 
  eliminarPublicacion 
} from '../services/publicaciones';

export default function Publicaciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [publicacionEditando, setPublicacionEditando] = useState(null);

  useEffect(() => {
    refrescarLista();
  }, []);

  async function refrescarLista() {
    setCargando(true);
    const { data, error } = await obtenerPublicaciones();
    if (error) {
      alert("Error: " + error.message);
    } else {
      setLista(data || []);
    }
    setCargando(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) {
      return alert("Por favor complete todos los campos");
    }

    if (publicacionEditando) {
      const { error } = await actualizarPublicacion(publicacionEditando.id, { titulo, contenido });
      if (error) return alert(error.message);
    } else {
      const { error } = await crearPublicacion({ titulo, contenido });
      if (error) return alert(error.message);
    }

    setTitulo('');
    setContenido('');
    setPublicacionEditando(null);
    await refrescarLista();
  }

  function handleIniciarEdicion(pub) {
    setPublicacionEditando(pub);
    setTitulo(pub.titulo);
    setContenido(pub.contenido);
  }

  async function handleBorrar(id) {
    const confirmar = window.confirm("¿Seguro que desea eliminar esta publicación?");
    if (!confirmar) return;

    const { error } = await eliminarPublicacion(id);
    if (error) return alert(error.message);

    setLista(lista.filter(pub => pub.id !== id));
  }

  function handleCancelarEdicion() {
    setTitulo('');
    setContenido('');
    setPublicacionEditando(null);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Mis Publicaciones</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>{publicacionEditando ? 'Editar Publicación' : 'Nueva Publicación'}</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contenido</label>
          <textarea 
            value={contenido} 
            onChange={(e) => setContenido(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', height: '100px', resize: 'vertical' }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {publicacionEditando ? 'Guardar Cambios' : 'Publicar'}
        </button>

        {publicacionEditando && (
          <button type="button" onClick={handleCancelarEdicion} style={{ marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Listado</h2>
      
      {cargando ? (
        <p>Cargando datos...</p>
      ) : lista.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Todavía no hay publicaciones.</p>
      ) : (
        lista.map((pub) => (
          <div key={pub.id} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px', marginBottom: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#222' }}>{pub.titulo}</h4>
            <p style={{ margin: '0 0 15px 0', color: '#444', lineHeight: '1.5' }}>{pub.contenido}</p>
            <small style={{ color: '#aaa', display: 'block', marginBottom: '15px' }}>{new Date(pub.creado_en).toLocaleString()}</small>
            
            <div>
              <button onClick={() => handleIniciarEdicion(pub)} style={{ marginRight: '10px', backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Editar
              </button>
              <button onClick={() => handleBorrar(pub.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Borrar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
