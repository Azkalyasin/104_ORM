const express = require("express");
const app = express();
const PORT = 3001;
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`server run in port ${PORT}`);
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.komik.create(data);
    res.send(komik);
  } catch (error) {
    res.send({ message: error.message });
  }
});


app.get("/komik", async (req, res) => {
    try {
        const komik = await db.komik.findAll();
        res.send(komik)
    }catch(error){
        res.send({message: error.message})
    }
})

app.put('/komik/:id', async (req, res) => {
    const id = req.params;
    const data = req.body;

    try {
        const komik = await db.komik.findByPk(id);
        if(!komik) {
            res.status(404).send({message: "komik not found"})
        }
        await komik.update(data)
        res.send({message: "data berhasil di update", data})
    }catch(error){
        res.status(500).send(error)
    }
})
