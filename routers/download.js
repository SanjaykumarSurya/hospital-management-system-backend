import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.download(filePath); // or res.sendFile(filePath);
});

export default router;
