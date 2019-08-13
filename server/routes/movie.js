import { Router } from 'express';

import MovieController from '../controllers/movie';

const router = Router()

router.post('/movie', (req, res) => { MovieController.createMovie(req, res) })
router.put('/movie/:id', (req, res) => { MovieController.updateMovie(req, res) })
router.delete('/movie/:id', (req, res) => { MovieController.deleteMovie(req, res) })
router.get('/movie/:id', (req, res) => { MovieController.getMovieById(req, res) })
router.get('/movies', (req, res) => { MovieController.getMovies(req, res) })

export default router