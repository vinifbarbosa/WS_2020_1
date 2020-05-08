const express = require ("express");

const dowloadCtrl = require ("../controller/DownloadController");

const router= express.Router();

router.get("/listar", dowloadCtrl.listarTodosArquivos);
router.get("/:id", dowloadCtrl.realizarDownload);

module.exports = router;