"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// config/database.js
var require_database = __commonJS({
  "config/database.js"(exports2, module2) {
    "use strict";
    var { Sequelize } = require("sequelize");
    var sequelize2 = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
          //Necessário por conta da nuvem
        }
      }
    });
    module2.exports = sequelize2;
  }
});

// models/aluno.js
var require_aluno = __commonJS({
  "models/aluno.js"(exports2, module2) {
    "use strict";
    var { DataTypes } = require("sequelize");
    var sequelize2 = require_database();
    var Aluno = sequelize2.define("Aluno", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nota_primeiro_semestre: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      nota_segundo_semestre: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      nome_professor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numero_sala: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    module2.exports = Aluno;
  }
});

// controllers/alunoController.js
var require_alunoController = __commonJS({
  "controllers/alunoController.js"(exports2) {
    "use strict";
    var Aluno = require_aluno();
    exports2.getAll = async (req, res) => {
      try {
        const alunos = await Aluno.findAll();
        res.json(alunos);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    exports2.create = async (req, res) => {
      try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json(aluno);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    exports2.getById = async (req, res) => {
      try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (aluno) {
          res.json(aluno);
        } else {
          res.status(404).json({ error: "Aluno n\xE3o encontrado" });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    exports2.update = async (req, res) => {
      try {
        const [updated] = await Aluno.update(req.body, {
          where: { id: req.params.id }
        });
        if (updated) {
          const updatedAluno = await Aluno.findByPk(req.params.id);
          res.json(updatedAluno);
        } else {
          res.status(404).json({ error: "Aluno n\xE3o encontrado" });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    exports2.delete = async (req, res) => {
      try {
        const deleted = await Aluno.destroy({
          where: { id: req.params.id }
        });
        if (deleted) {
          res.status(204).json();
        } else {
          res.status(404).json({ error: "Aluno n\xE3o encontrado" });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
  }
});

// routes/alunos.js
var require_alunos = __commonJS({
  "routes/alunos.js"(exports2, module2) {
    "use strict";
    var express2 = require("express");
    var router = express2.Router();
    var alunoController = require_alunoController();
    router.get("/", alunoController.getAll);
    router.post("/", alunoController.create);
    router.get("/:id", alunoController.getById);
    router.put("/:id", alunoController.update);
    router.delete("/:id", alunoController.delete);
    module2.exports = router;
  }
});

// swagger.js
var require_swagger = __commonJS({
  "swagger.js"(exports2, module2) {
    "use strict";
    var swaggerJsDoc = require("swagger-jsdoc");
    var swaggerUi = require("swagger-ui-express");
    var options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "API de Alunos",
          version: "1.0.0",
          description: "API para gerenciar alunos de uma escola"
        },
        servers: [
          {
            url: "http://localhost:3000"
          }
        ]
      },
      apis: ["./routes/*.js"]
    };
    var swaggerSpec = swaggerJsDoc(options);
    var setupSwagger2 = (app2) => {
      app2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    };
    module2.exports = setupSwagger2;
  }
});

// app.js
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var sequelize = require_database();
var alunosRouter = require_alunos();
var setupSwagger = require_swagger();
var app = express();
app.use(bodyParser.json());
app.use("/alunos", alunosRouter);
setupSwagger(app);
sequelize.sync().then(() => {
  console.log("Banco de dados conectado");
  const port = process.env.PORT || 3e3;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch((err) => {
  console.error("Erro ao conectar com o banco de dados:", err);
});
