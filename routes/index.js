const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', storeController.homePage);
router.get('/stores', 
	authController.isLoggedIn,
	catchErrors(storeController.getStores)
);


router.get('/add', storeController.addStore);

router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id/',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

router.post('/delete', catchErrors(storeController.deleteStore))

router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));



router.get('/register', userController.registerForm);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.post('/register', 
	userController.validateRegister,
	userController.register,
	authController.login
);
router.get('/logout', authController.logout)


router.get('/account', 
	authController.isLoggedIn,
	userController.account
)
router.post('/account', catchErrors(userController.updateAccount))
router.post('/account/forgot', catchErrors(authController.forgot))

router.get('/map', storeController.mapPage);


router.get('/api/search', catchErrors(storeController.searchStores))


module.exports = router;
