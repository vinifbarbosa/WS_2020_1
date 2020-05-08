const express = require ('express');

const dowloadCtrl = require ('../controller/DownloadController');

const router= express.Router();

router.get('/listar', dowloadCtrl.listarTodosArquivos);
router.get('/normal/:id', dowloadCtrl.realizarDownload);
router.get('/thumb/:id', dowloadCtrl.realizarDownloadThumb);

module.exports = router;