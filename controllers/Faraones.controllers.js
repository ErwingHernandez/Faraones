const Faraon = require('../models/Faraones.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getToken = async (req, res) => {

  const { username, password } = req.body;

  const usuarioFicticio = {
    username: 'admin',
    password: await bcrypt.hash('contraseña123', 10)
  };


  const passwordValido = await bcrypt.compare(password, usuarioFicticio.password);
  if (username !== usuarioFicticio.username || !passwordValido) {
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }


  const token = jwt.sign({ id: usuarioFicticio.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({ token });
}


const getFaraones = async (req, res) => {
  try {
    const faraon = await Faraon.find({})
    res.status(200).json(faraon)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getFaraon = async (req, res) => {
  try {
    const { id } = req.params
    const faraon = await Faraon.findById(id)
    res.status(200).json(faraon)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createFaraon = async (req, res, io) => {
  try {
    const faraon = await Faraon.create(req.body)

    io.emit('notificacion', { mensaje: 'Nuevo faraón creado', faraon });

    res.status(200).json(faraon)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateFaraon = async (req, res, io) => {
  try {
    const { id } = req.params;

    const faraon = await Faraon.findByIdAndUpdate(id, req.body);

    if (!faraon) {
      return res.status(404).json({ message: 'Fauna no encontrada' });
    }

    io.emit('notificacion', { mensaje: 'Faraón actualizado', faraon });
    const updateFaraon = await Faraon.findById(id);

    res.status(200).json(updateFaraon);



  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

// Eliminar un animal
const deleteFaraon = async (req, res, io) => {
  try {
    const { id } = req.params;
    const faraon = await Faraon.findByIdAndDelete(id);

    if (!faraon) {
      return res.status(404).json({ message: 'Faraon no encontrada' });
    }

    io.emit('notificacion', { mensaje: 'Faraón eliminado', faraon });

    res.status(200).json({ message: "Faraon borrado con exito" })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getToken,
  getFaraones,
  getFaraon,
  createFaraon,
  updateFaraon,
  deleteFaraon
};