import { Router } from 'express';

import MovieController from '../controllers/movie';
import { authenticate } from '../middleware/authenticate';

const router = Router()

router.post('/movie', authenticate, async (req, res) => { 
  MovieController.createMovie(req, res) 
})
router.put('/movie/:id', authenticate, async (req, res) => { 
  MovieController.updateMovieReview(req, res) 
})
router.delete('/movie/:id',  authenticate, async (req, res) => { 
  MovieController.deleteMovieReviews(req, res) 
})
router.get('/movie/:id', authenticate, async (req, res) => { 
  MovieController.getMovieById(req, res) 
})
router.get('/movies', authenticate, async (req, res) => {
  MovieController.getMovies(req, res); 
})

export default router