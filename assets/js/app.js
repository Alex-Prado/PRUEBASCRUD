import { APIurl } from "../../module/js/Api.js";
import { DomElem, DomId } from "../../module/js/Dom.js";

const url = "./controller/Contacto.controller.php";
// ------------------------------------------------------------------
// ---------------------CARGAR DATOS EN EL FORMULARIO----------------------
// ------------------------------------------------------------------
const load = (data) => {
  if (data) {
    DomElem(".modal").classList.add("active");
    DomId("id").value = data.idcontacto;
    DomId("nombre").value = data.nombre;
    DomId("apellido").value = data.apellido;
    DomId("telefono").value = data.telefono;
  } else {
    DomElem(".modal").classList.remove("active");
    clear();
  }
};
// ------------------------------------------------------------------
// ------------------LIMPIAR FORMULARIO-------------------------------------
// ------------------------------------------------------------------
const clear = () => {
  DomId("id").value = null;
  DomId("nombre").value = null;
  DomId("apellido").value = null;
  DomId("telefono").value = null;
};
// ------------------------------------------------------------------
// --------------------CERRAR MODAL--------------------------------------
// ------------------------------------------------------------------
DomElem(".close").addEventListener("click", () => {
  load();
});
// ------------------------------------------------------------------
// --------------------ABRIR MODAL---------------------------------------
// ------------------------------------------------------------------
DomElem(".add").addEventListener("click", () => {
  DomElem(".modal").classList.add("active");
});
// ------------------------------------------------------------------
// -------------------------LISTAR CONTACTOS--------------------------------
// ------------------------------------------------------------------
const List = () => {
  APIurl(url, "list").then((data) => {
    DomId("content").innerHTML = "";
    data.forEach((element) => {
      const template = DomId("template").content.cloneNode(true);
      const btnDelete = template.querySelector(".delete");
      const btnEdit = template.querySelector(".edit");
      template.querySelector(".nombre").innerHTML = element.nombre;
      template.querySelector(".apellido").innerHTML = element.apellido;
      template.querySelector(".telefono").innerHTML = element.telefono;

      btnDelete.addEventListener("click", () => {
        APIurl(url, "delete", false, false, {
          key: "id",
          value: element.idcontacto,
        }).then((data) => {
          List();
        });
      });
      btnEdit.addEventListener("click", () => {
        load(element);
      });
      DomId("content").append(template);
    });
  });
};

List();
// ------------------------------------------------------------------
// ---------------------AGREGAR O EDITAR CONTACTO---------------------------------
// ------------------------------------------------------------------
const Add = (data) => {
  let action = null;
  if (DomId("id").value == "") {
    action = "create";
  } else {
    action = "update";
  }
  APIurl(url, action, false, data).then((data) => {
    console.log(data);
    clear();
    List();
    DomElem(".modal").classList.remove("active");
  });
};
// ------------------------------------------------------------------
// -----------------------EVENTO DEL FORM-----------------------------
// ------------------------------------------------------------------
DomElem(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  Add(e.target);
});
