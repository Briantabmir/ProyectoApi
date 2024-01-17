const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require("pg"); //pg con postgres

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Mid Festival',
    password: 'Monlau2022',
    port: 5432,
});

// Configura la conexión a la base de datos MySQL
// const db = pg.createConnection({

//     host: 'localhost',
//     user: 'postgres',
//     password: 'Monlau2022',
//     database: 'Mid Festival'
// });

app.use(express.json());

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
})


// GETS

// Ruta para obtener todos los usuarios
app.get('/ProyectoAPI/usuarios/', (req, res) => {
    pool.query('SELECT * FROM ususarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json({ usuarios: results });
        }
    });
});

// Ruta para obtener un usuario por su ID
app.get('/ProyectoAPI/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM usuarios WHERE id_usuarios = $1', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json({ user: results.rows[0] });
            }
        }
    });
});
// Ruta para obtener datos por su ID

// app.get('/ProyectoAPI/events/:id', (req, res) => {
//     const eventId = req.params.id;
//     pool.query('SELECT * FROM events WHERE eventid = $1', [eventId], (err, results) => {
//         if (err) {
//             console.error('Error al obtener el evento:', err);
//             res.status(500).json({ error: 'Error al obtener el evento' });
//         } else {
//             if (results.length === 0) {
//                 res.status(404).json({ message: 'Evento no encontrado' });
//             } else {
//                 res.json({ user: results.rows[0] });
//             }
//         }
//     });
// });


//Ruta para obtener ticket type
app.get('/ProyectoAPI/ticket_types/:id', (req, res) => {
    const ticket_typeId = req.params.id;
    pool.query('SELECT * FROM ticket_types WHERE id_ticket_types = $1', [ticket_typeId], (err, results) => {
        if (err) {
            console.error('Error al obtener el ticket type:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Ticket type no encontrado' });
            } else {
                res.json({ ticket_typeId: results.rows[0] });
            }
        }
    });
});

//Ruta para obtener nombre de contacto
app.get('/ProyectoAPI/contacto/:id', (req, res) => {
    const contactoId = req.params.id;
    pool.query('SELECT nombre FROM contacto WHERE id_contacto = $1', [contactoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el ticket type:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Ticket type no encontrado' });
            } else {
                res.json({ contacto: results.rows[0] });
            }
        }
    });
});

// POST

// Ruta para crear un nuevo usuario
app.post('/ProyectoAPI/usuarios', (req, res) => {
    const newUser = req.body;
    pool.query('INSERT INTO usuarios (id_usuarios, nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4, $5)', [newUser.id_usuarios, newUser.nombre, newUser.apellido, newUser.email, newUser.contraseña], (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.json({ message: 'Usuario creado con Ã©xito', user: newUser });
        }
    });
});

// Ruta para crear un nuevo artista
app.post('/ProyectoAPI/artistas', (req, res) => {
    const newartista = req.body;
    pool.query('INSERT INTO artistas (name, dayid, eventid, artistaid) VALUES ($1, $2, $3, $4)', [newartista.name, newartista.dayid, newartista.eventid, newartista.artistaid], (err, results) => {
        if (err) {
            console.error('Error al crear el artista:', err);
            res.status(500).json({ error: 'Error al crear el artista' });
        } else {
            res.json({ message: 'Artista creado con Ã©xito', artista: newartista });
        }
    });
});


app.post('/ProyectoAPI/events', (req, res) => {
    const newlocalicacion = req.body;
    pool.query('INSERT INTO events (eventid, localicacion) VALUES ($1, $2)', [newlocalicacion.eventid, newlocalicacion.localicacion], (err, results) => {
        if (err) {
            console.error('Error al crear el artista:', err);
            res.status(500).json({ error: 'Error al crear el artista' });
        } else {
            res.json({ message: 'Artista creado con Ã©xito', artista: newartista });
        }
    });
});




// Ruta para crear un nuevo usuario
// app.post('/ProyectoAPI/usuarios', (req, res) => {
//     const newUser = req.body;
//     pool.query('INSERT INTO usuarios (id_usuarios, nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4, $5)', [newUser.id_usuarios, newUser.nombre, newUser.apellido, newUser.email, newUser.contraseña], (err, results) => {
//         if (err) {
//             console.error('Error al crear el usuario:', err);
//             res.status(500).json({ error: 'Error al crear el usuario' });
//         } else {
//             res.json({ message: 'Usuario creado con Ã©xito', user: newUser });
//         }
//     });
// });

app.post('/ProyectoAPI/artistas', (req, res) => {
    const newArtista = req.body;
    pool.query('INSERT INTO artistas (name, dayid, eventid, artistaid) VALUES ($1, $2, $3, $4)', [newArtista.name, newArtista.dayid, newArtista.eventid, newArtista.artistaid], (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.json({ message: 'Artista creado con Ã©xito', artista: newArtista });
        }
    });
});

// Ruta para actualizar un usuario por su ID
// app.put('/ProyectoAPI/usuarios/:id', (req, res) => {
//     const userId = req.params.id;
//     const updatedUser = req.body;
//     pool.query('UPDATE usuarios SET nombre = $1, email = $2 WHERE id_usuarios = $3', [updatedUser.nombre, updatedUser.email, userId], (err, results) => {
//         if (err) {
//             console.error('Error al actualizar el usuario:', err);
//             res.status(500).json({ error: 'Error al actualizar el usuario' });
//         } else {
//             res.json({ message: 'Usuario actualizado con Ã©xito', user: updatedUser });
//         }
//     });
// });


// Ruta para actualizar un dato por su ID
app.put('/ProyectoAPI/events/:id', (req, res) => {
    const eventsId = req.params.id;
    const updatedlocalicacion = req.body;
    pool.query('UPDATE events SET localicacion = $1 WHERE eventid = $2', [updatedlocalicacion.localicacion, eventsId], (err, results) => {
        if (err) {
            console.error('Error al actualizar  la localización:', err);
            res.status(500).json({ error: 'Error al actualizar la localización' });
        } else {
            res.json({ message: 'Localización actualizado con Ã©xito', events: updatedlocalicacion });
        }
    });
});

// Ruta para eliminar un usuario por su ID
app.delete('/ProyectoAPI/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('DELETE FROM usuarios WHERE id_usuarios = $1', [userId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json({ message: 'Usuario eliminado con Ã©xito' });
        }
    });
});

