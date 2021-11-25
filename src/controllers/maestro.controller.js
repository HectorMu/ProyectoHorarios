const fetch = require("node-fetch");
class MaestroController {
  async List(req, res) {
    try {
      const API =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestroCompleto?nombre=";
      const response = await fetch(API);
      const maestros = await response.json();
      res.render("Maestros/maestros", { maestros });
    } catch (error) {
      console.log(error);
      res.render("Maestros/maestros");
    }
  }

  RenderInsert(req, res) {
    res.render("Maestros/add");
  }

  async Insert(req, res) {
    try {
      const { nombre, academia } = req.body;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/AlmacenarMaestro?Nombre=${nombre}&Academia=${academia}`;
      const response = await fetch(API);
      const maestro = await response;

      if (maestro.statusText === "OK") {
        req.flash("success", "Se agrego el maestro correctamente");
        res.redirect("/maestros");
      } else {
        req.flash("message", "Hubo un error al agregar el maestro");
        res.redirect("/maestros/add");
      }
    } catch (error) {
      console.log(error);
      req.flash("message", error);
      res.redirect("/maestros/add");
    }
  }

  async RenderEdit(req, res) {
    try {
      const { id } = req.params;
      const API =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestroCompleto?nombre=";
      const response = await fetch(API);
      const maestros = await response.json();
      const maestro = maestros.filter((m) => m.id == id);

      res.render("Maestros/editarM", { m: maestro[0] });
    } catch (error) {
      console.log(error);
      res.render("Maestros/editarM");
    }
  }
  
  //Metodo para editar
  async Edit(req, res) {
    try {
      const { id } = req.params;
      const { nombre, academia } = req.body;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/ActualizarMaestro?Id=${id}&Nombre=${nombre}&Academia=${academia}`;
      const response = await fetch(API);
      const data = await response;

      if (data.statusText == "OK") {
        req.flash(
          "success",
          "Los datos del maestro se actualizaron correctamente"
        );
        res.redirect("/maestros");
      } else {
        req.flash(
          "message",
          "Ocurrio un error al actualizar, intentalo de nuevo"
        );
        res.redirect("/maestros/editarM/" + id);
      }
    } catch (error) {
      req.flash("message", "Ocurrio un error, intentalo de nuevo");
      res.redirect("/maestros/editarM/" + id);
    }
  }

  //Buscar
  async Buscar(req, res) {
    try {
      const { txtBuscar } = req.body;

      const API =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestroCompleto?nombre=";
      const response = await fetch(API);
      const teacher = await response.json();

      const maestros = teacher.filter((m) =>
        m.nombre.toLowerCase().includes(txtBuscar.toLowerCase())
      );
      res.render("Maestros/maestros", { maestros });
    } catch (error) {
      console.log(error);
      res.render("Maestros/maestros");
    }
  }

  async Eliminar(req, res) {
    try {
      const { id } = req.params;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/EliminarMaestro?Id=${id}`;
      const response = await fetch(API);
      const data = await response;
      req.flash("success", "El maestro fue eliminado con exito");
      res.redirect("/maestros");
    } catch (error) {
      req.flash("message", "El maestro no fue eliminado, vuelva a intentarlo");
      res.redirect("/maestros");
    }
  }
}

module.exports = MaestroController;
