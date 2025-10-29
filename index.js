const express = require("express");
const app = express();
const PORT = 3001;
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("server run in port");
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(3001, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.send(komik);
  } catch (error) {}
  res.send({ message: error.message });
});

app.get("/komik", async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.send(komik);
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik){
            res.status(404).send({ message: 'Komik not found' });
        }
        await komik.update(data)
        res.send({ message: 'Komik berhasil di update', komik });
    }
    catch (error){
        res.send({message: error.message});
    }
});

app.delete("/komik/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      res.status(404).send({ message: "Komik not found" });
    }
    await komik.destroy();
    res.send({ message: "Komik berhasil dihapus", });
  } catch (error) {
    res.status(500).send(err);
  }
});
